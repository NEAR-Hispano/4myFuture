clear
echo TESTING FUNCTIONS 👽
echo
contract=$(cat ./neardev/dev-account)
account=$(cat ./neardev/dev-user-account)
scripts/test1.sh $contract $account
