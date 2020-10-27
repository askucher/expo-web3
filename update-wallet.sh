rsync -av --exclude=".git*" --exclude="node_modules" --exclude="package.json" ../JsWallet/ wallet/
find wallet -type f -iname '*.ls' -exec lsc -c {} \;
cd wallet
find . -type f -iname '*.js' -exec sed -i '' -e 's/\.ls/\.js/g' {} \;
find . -type f -iname '*.js' -exec sed -i '' -e 's/\.\/package\.json/\..\/package\.json/g' {} \;
rm pages.js
touch pages.js
cd ..
