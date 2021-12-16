set -e
# Deploying contract on development environment
echo
echo "Deploying contract..."
echo
npm run build:contract:debug
npm run dev:deploy:contract
echo
echo