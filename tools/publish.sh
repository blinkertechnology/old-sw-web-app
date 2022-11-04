#!/bin/bash 

rm -rf dist

yarn build

VERSION="$(node ./tools/version.js)"
cd dist && zip -r $VERSION.zip *