#!/bin/bash

META_DATA_DIR=../src
ZIP_DIR=../archive
FILE_NAME=master.zip
ZIP=$ZIP_DIR/$FILE_NAME
CURRENT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

echo creating zip archive of the metatdata source: $ZIP
rm -rf $ZIP
cd $META_DATA_DIR
zip -r $ZIP ./*
echo zip file created: $ZIP
cd $CURRENT_DIR