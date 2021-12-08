set -e
# Deploying contract on development environment
clear
echo
echo "Deploying..."
echo
npm run build:contract:debug
npm run dev:deploy:contract
echo
echo "Contrato desplegado en modo desarrollo."
echo