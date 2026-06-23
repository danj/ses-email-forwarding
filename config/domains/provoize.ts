import { EmailForwardingProps } from '../../src';

export const provoizeEmailForwarding: EmailForwardingProps = {
  domainName: 'provoize.com',
  verifyDomain: false,
  fromPrefix: 'noreply',
  sentryDsn: process.env.TEST_SENTRY_DSN,
  emailMappings: [
    {
      receivePrefix: 'support',
      targetEmails: [
        'dan.julius+support.provoize@gmail.com',
        'ibenyeh+support.provoize@gmail.com',
      ],
    },
    {
      receivePrefix: 'abuse',
      targetEmails: [
        'dan.julius+abuse.provoize@gmail.com',
      ],
    },
    {
      receivePrefix: 'info',
      targetEmails: [
        'dan.julius+info.provoize@gmail.com',
        'ibenyeh+info.provoize@gmail.com',
      ],
    },
    {
      receivePrefix: 'privacy',
      targetEmails: [
        'dan.julius+privacy.provoize@gmail.com',
        'ibenyeh+privacy.provoize@gmail.com',
      ],
    },
    {
      receivePrefix: 'legal',
      targetEmails: [
        'dan.julius+legal.provoize@gmail.com',
        'ibenyeh+legal.provoize@gmail.com',
      ],
    },
    {
      receivePrefix: 'dpo',
      targetEmails: [
        'dan.julius+dpo.provoize@gmail.com',
        'ibenyeh+dpo.provoize@gmail.com',
      ],
    },
    {
      receivePrefix: 'dan',
      targetEmails: [
        'dan.julius+provoize@gmail.com',
      ],
    },
    {
      receivePrefix: 'itzik',
      targetEmails: [
        'ibenyeh+provoize@gmail.com',
      ],
    },
  ],
};
