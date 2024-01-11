import {ConfigProvider} from '@portkey/did-ui-react';

ConfigProvider.setGlobalConfig({
    graphQLUrl: 'https://dapp-portkey-test.portkey.finance/Portkey_DID/PortKeyIndexerCASchema/graphql',
    requestDefaults: {
        baseUrl: '/portkey'
    },
});