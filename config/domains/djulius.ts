import { EmailForwardingProps } from '../../src';

export const djuliusEmailForwarding: EmailForwardingProps = {
  domainName: 'djulius.com',
  verifyDomain: false,
  fromPrefix: 'noreply',
  emailMappings: [
    {
      receivePrefix: 'me',
      targetEmails: [
        'dan.julius+me.djulius@gmail.com',
      ],
    },
    {
      receiveEmail: '@djulius.com',
      targetEmails: [
        'dan.julius+catch-all@gmail.com',
      ],
    },
  ],
};
