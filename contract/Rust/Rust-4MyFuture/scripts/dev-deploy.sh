#!/bin/bash


# BUILD COMMAND FOR GETTING THE CONTRACT BINARY
set -e

cd contract
echo
echo Building contract...
echo 
cargo build --all --target wasm32-unknown-unknown --release

mkdir -p ./out

cp target/wasm32-unknown-unknown/release/*.wasm ./out/
echo
echo Deploying contract...
echo 
near dev-deploy ./out/greeter.wasm