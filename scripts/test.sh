clear
echo TESTING FUNCTIONS 👽
echo
scripts/clean.sh
scripts/dev-deploy.sh
echo
contract=$(cat ./neardev/dev-account)
account="lexdev.testnet"
scripts/test1.sh $contract $account
