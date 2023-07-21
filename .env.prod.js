const fs = require('fs');

const version = fs.readFileSync('./VERSION.txt', {
    encoding: 'utf-8'
});


module.exports = {
    'VUE_APP_ENV': 'production',
    'VUE_APP_VERSION': version,

    'VUE_APP_TITLE': 'Sorted Wallet',
    'VUE_APP_URL': 'https://api.sorted.finance',

    'VUE_APP_KAI_AD_PUBLISHER_ID': 'bc1327d6-abc0-427e-be35-c1e9f5c4ec57',
    'VUE_APP_KAI_AD_APP': 'sorted-wallet',
    'VUE_APP_KAI_AD_SLOT': 'sorted-wallet',
    'VUE_APP_KAI_AD_TEST': 0,
}