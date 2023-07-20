const { src, dest, parallel, series } = require('gulp');
const fs = require('fs');
const template = require('gulp-template');
const zip = require('gulp-zip');
const clean = require('gulp-clean');
const argv = require('yargs').argv;
const path = require('path');

const DIST = path.join(process.cwd(), '..', 'dist');
const TMP = path.join(process.cwd(), '..', 'tmp');

const version = fs.readFileSync(path.join(process.cwd(), '..', 'VERSION.txt'), {
    encoding: 'utf-8'
});

const target = argv.target.toString();

const configs = {
    "2.5": {
        manifest: path.join(process.cwd(), 'templates', '2.5/manifest.webapp'),
        out: path.join(TMP, '2.5')
    },
    "3": {
        manifest: path.join(process.cwd(), 'templates', '3.0/manifest.webmanifest'),
        out: path.join(TMP, '3.0')
    }
}

if(!Object.keys(configs).includes(target)) {
    throw new Error('Invalid target');
}

const config = configs[target];

function copyBuild() {
    return src(path.join(DIST, '**/*'))
        .pipe(dest(config.out));
}

function copyManifest() {
    return src(config.manifest)
        .pipe(template({
            version: version
        }))
        .pipe(dest(config.out));
}

function createZip() {
    return src(path.join(config.out, '**'))
        .pipe(zip(`${target}-${version}.zip`))
        .pipe(dest(TMP));
}

function cleanup() {
    return src(DIST, { read: false, allowEmpty: true })
        .pipe(clean({ force: true }));
}

exports.default = series(copyBuild, copyManifest, createZip, cleanup);