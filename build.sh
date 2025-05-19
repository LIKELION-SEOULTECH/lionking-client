#!/bin/sh
cd ../
rm -rf output
mkdir output
cp -R ./lionking-client/* ./output
cp -R ./output ./lionking-client/
