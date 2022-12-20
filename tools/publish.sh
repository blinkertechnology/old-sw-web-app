#!/bin/bash 

rm -rf dist

yarn build

VERSION="$(node ./tools/version.js)"

echo "Publishing $VERSION"

cd dist && zip -r $VERSION.zip *