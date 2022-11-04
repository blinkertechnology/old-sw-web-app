const fs = require('fs');

const manifest = fs.readFileSync('./public/manifest.webapp', {
    encoding: 'utf-8'
});
const parsed = JSON.parse(manifest);

console.log(parsed['version']);