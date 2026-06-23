const { AwsCdkConstructLibrary } = require('projen/lib/awscdk');
const { NodePackageManager } = require('projen/lib/javascript');

const project = new AwsCdkConstructLibrary({
  author: 'Sebastian Hesse',
  authorAddress: 'info@sebastianhesse.de',
  cdkVersion: '2.257.0',
  cdkVersionPinning: false,
  defaultReleaseBranch: 'main',
  jsiiFqn: 'projen.AwsCdkConstructLibrary',
  name: 'ses-email-forwarding',
  packageManager: NodePackageManager.NPM,
  repositoryUrl: 'git@github.com:seeebiii/ses-email-forwarding.git',
  github: false,

  /* ConstructLibraryOptions */
  catalog: {
    twitter: '@seeebiii',
    announce: true,
  },

  /* JsiiProjectOptions */
  publishToMaven: {
    javaPackage: 'de.sebastianhesse.cdk.ses.email.forwarding',
    mavenGroupId: 'de.sebastianhesse.cdk-constructs',
    mavenArtifactId: 'ses-email-forwarding',
  },
  publishToNuget: {
    dotNetNamespace: 'SebastianHesse.CdkConstructs',
    packageId: 'Ses.Email.Forwarding',
  },
  publishToPypi: {
    distName: 'ses-email-forwarding',
    module: 'ses_email_forwarding',
  },

  /* NodePackageOptions */
  devDeps: [
    '@types/aws-lambda',
    '@types/jest@^29.5.8',
    '@typescript-eslint/eslint-plugin@^8.59.4',
    '@typescript-eslint/parser@^8.59.4',
    'constructs@10.6.0',
    'esbuild@^0.28.0',
    'eslint@^8.57.1',
    'eslint-import-resolver-typescript@^4.4.4',
    'eslint-plugin-import@^2.32.0',
    'jest@^29.7.0',
    'jest-junit@^17.0.0',
    'jsii@^5.9.41',
    'jsii-diff@^1.132.0',
    'jsii-pacmak@^1.132.0',
    'jsii-rosetta@^5.9.46',
    'projen@^0.99.64',
    'ts-jest@^29.1.1',
    'typescript@^5.9.3',
    'aws-cdk@2.1124.1',
    'dotenv',
  ],
  bundledDeps: ['aws-lambda-ses-forwarder@^6.0.0', '@aws-sdk/client-ssm', '@seeebiii/ses-verify-identities@4.2.3', '@sentry/aws-serverless'],
  homepage: 'https://github.com/seeebiii/ses-email-forwarding',
  keywords: ['aws',
    'aws-cdk',
    'aws ses',
    'cdk-construct',
    'email',
    'email forwarding',
    'gmail',
    'cdk'],
  license: 'MIT',
  licensed: true,
  packageName: '@seeebiii/ses-email-forwarding',
  repository: 'https://github.com/seeebiii/ses-email-forwarding',

  /* NodeProjectOptions */
  antitamper: false,
  copyrightOwner: 'Sebastian Hesse',
  gitignore: ['.idea', '.env', 'cdk.out/'],
  tsconfigDev: {
    compilerOptions: {
      esModuleInterop: true,
      allowJs: true,
      outDir: 'lib',
      noEmit: false,
      noEmitOnError: false,
    },
  },
  npmignore: ['.github'],
  projenUpgradeAutoMerge: undefined,
  releaseToNpm: true,
  releaseWorkflow: true,

  typescriptVersion: '^5.2.2',
});

project.compileTask.exec('esbuild src/lambda/index.ts --bundle --platform=node --target=node18 --outfile=lib/lambda/index.js');

project.tasks.addEnvironment('PATH', '$(printf "%s/node_modules/.bin:%s" "$(pwd)" "$PATH")');

const deployTask = project.addTask('deploy', {
  description: 'Compiles the Lambda function and deploys the CDK stack',
});
deployTask.exec('esbuild src/lambda/index.ts --bundle --platform=node --target=node22 --outfile=lib/lambda/index.js');
deployTask.exec('npx cdk deploy --app "npx ts-node config/email-forwarding.ts"');

project.synth();
