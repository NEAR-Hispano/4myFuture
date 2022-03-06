clear
echo
echo GETTING READY TO START 👽
echo FASTEN YOUR SEAT BELTS PLEASE 🚀
echo ENJOY YOUR TRIP...
echo
scripts/clean.sh
scripts/dev-deploy.sh
echo
echo -n "PLEASE ENTER YOUR DEV ACCOUNT: " 
read account
contract=$(cat ./neardev/dev-account)
scripts/test1.sh $contract $account
echo
echo --------------------- 
echo TESTS COMPLETED 🚀👽
echo