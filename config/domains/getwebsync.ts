import { EmailForwardingProps } from '../../src';

export const getwebsyncEmailForwarding: EmailForwardingProps = {
  domainName: 'getwebsync.com',
  verifyDomain: false,
  fromPrefix: 'noreply',
  sentryDsn: process.env.TEST_SENTRY_DSN,
  emailMappings: [
    {
      receivePrefix: 'support',
      targetEmails: [
        'dan.julius+support.getwebsync@gmail.com',
      ],
    },
    {
      receivePrefix: 'info',
      targetEmails: [
        'dan.julius+info.getwebsync@gmail.com',
      ],
    },
    {
      receivePrefix: 'dan',
      targetEmails: [
        'dan.julius+dan.getwebsync@gmail.com',
      ],
    },
    {
      receiveEmail: '@getwebsync.com',
      targetEmails: [
        'dan.julius+all.getwebsync@gmail.com',
      ],
    },
  ],
};
