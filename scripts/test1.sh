
clear
near call $1 createUser --account-id $2
echo
near call $1 createNewProposal '{"title": "Fondos para hacer...", "description": "xd", "finishDate": "a", "photos":["a"], "amountNeeded": 10.1}' --account-id $2
echo
near call $1 createContribution '{"proposalId": 1, "amount": 1, "userRefound": ''"'$2'"''}' --account-id $2 --deposit 1
echo
near call $1 getAllProposals --account-id $2
echo
near call $1 inactiveProposal '{"userId":''"'$2'"'', "index": 1 }' --account-id $2
echo
near call $1 getAllUsers --account-id $2
echo
near call $1 getAllProposals --account-id $2
echo
near call $1 getAllUsers --acount-id $2
echo


