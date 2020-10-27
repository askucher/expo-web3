rsync -av --exclude=".*" --exclude="node_modules" --exclude="package.json" ../web3t/ web3t/
find . -type f -iname '*.js' -exec sed -i '' -e 's/\.ls/\.js/g' {} \;
