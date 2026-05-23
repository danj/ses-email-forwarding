import { EmailForwardingProps } from '../../src';

export const provoizeEmailForwarding: EmailForwardingProps = {
  domainName: 'provoize.com',
  verifyDomain: false,
  fromPrefix: 'noreply',
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
  ],
};
