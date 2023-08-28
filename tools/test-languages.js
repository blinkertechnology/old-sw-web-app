const { join, extname} = require('path');
const { readdirSync, readFileSync } = require('fs');
const core = require('@actions/core');

/**
 * Run through all the language files and validate that they're correct JSON
 */
const langDir = join(process.cwd(), 'src', 'lang');
const langFiles = readdirSync(langDir).filter(function(file) {
    return extname(file) === '.json';
})

langFiles.forEach(function(file) {
    const data = readFileSync(join(langDir, file), 'utf-8');

    try {
        JSON.parse(data);

        console.log(`${file} OK`)
    } catch(err) {
        core.setFailed(`Failed to parse ${file}`);
    }    
})