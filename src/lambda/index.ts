import { GetParameterCommand, SSMClient } from '@aws-sdk/client-ssm';
import * as Sentry from '@sentry/aws-serverless';
import type { Context, S3Event } from 'aws-lambda';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const forwarder = require('aws-lambda-ses-forwarder');

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});


const ssm = new SSMClient({});
const ssmKey = process.env.EMAIL_MAPPING_SSM_KEY as string;
const fromEmail = process.env.FROM_EMAIL;
const bucketName = process.env.BUCKET_NAME;
const bucketPrefix = process.env.BUCKET_PREFIX;
const isLoggingEnabled = process.env.ENABLE_LOGGING === 'true';

// store the email mapping outside of the handler function to not load it every time the Lambda function is invoked
let emailMapping: any = null;

function log(message: string, ...obj: any): void {
  if (isLoggingEnabled) {
    console.log(message, ...obj);
  }
}

async function loadEmailMappingFromSsm() {
  if (!emailMapping) {
    const ssmValue = await ssm
      .send(new GetParameterCommand({
        Name: ssmKey,
      }));

    if (ssmValue.Parameter?.Value) {
      emailMapping = JSON.parse(ssmValue.Parameter.Value);
    }
  }
}


export const handler = Sentry.wrapHandler(async (event: S3Event, context: Context): Promise<void> => {
  log('Received SES event : ', JSON.stringify(event));

  // Trigger test exception for Sentry integration
  if ((event as any).testSentry) {
    throw new Error('Test exception to verify Sentry integration');
  }

  if (!ssmKey || !fromEmail || !bucketName) {
    const message = 'Missing required environment variables. Either EMAIL_MAPPING_SSM_KEY, FROM_EMAIL or BUCKET_NAME is not set.';
    console.error(message);
    return Promise.reject(message);
  }

  await loadEmailMappingFromSsm();

  if (emailMapping) {
    const config = {
      fromEmail: fromEmail,
      emailBucket: bucketName,
      emailKeyPrefix: bucketPrefix,
      forwardMapping: emailMapping,
    };

    log('Forwarding email with config: ', JSON.stringify(config));

    return new Promise((resolve, reject) => {
      forwarder.handler(
        event,
        context,
        (err: any) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        },
        { config },
      );
    });
  } else {
    log('Not forwarding mail. Reason: No email mapping found in SSM parameter ' + ssmKey);
  }

  return Promise.resolve();
});
