import * as cdk from 'aws-cdk-lib';
import { ReceiptRuleSet } from 'aws-cdk-lib/aws-ses';
import { Construct } from 'constructs';
import { EmailForwardingRuleSet } from '../src';
import { djuliusEmailForwarding } from './domains/djulius';
import { provoizeEmailForwarding } from './domains/provoize';

class EmailForwardingStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const fwRuleSet = ReceiptRuleSet.fromReceiptRuleSetName(this, 'ExistingFwRuleSet', 'fw');

    new EmailForwardingRuleSet(this, 'EmailForwarding', {
      ruleSet: fwRuleSet,
      enableRuleSet: false,
      emailForwardingProps: [
        provoizeEmailForwarding,
        djuliusEmailForwarding,
      ],
    });
  }
}

const app = new cdk.App();

new EmailForwardingStack(app, 'EmailForwardingStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
