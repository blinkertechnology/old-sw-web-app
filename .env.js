const fs = require('fs');

const manifest = fs.readFileSync('./public/manifest.webapp', {
    encoding: 'utf-8'
});
const parsed = JSON.parse(manifest);

module.exports = {
    'VUE_APP_ENV': 'development',
    'VUE_APP_VERSION': parsed['version'],

    'VUE_APP_TITLE': 'Sorted Wallet',
    'VUE_APP_URL': 'http://localhost:8000/',

    'VUE_APP_KAI_AD_PUBLISHER_ID': 'bc1327d6-abc0-427e-be35-c1e9f5c4ec57',
    'VUE_APP_KAI_AD_APP': 'sorted-wallet',
    'VUE_APP_KAI_AD_SLOT': 'sorted-wallet',
    'VUE_APP_KAI_AD_TEST': 1,
}