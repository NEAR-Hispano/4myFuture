
clear
echo
echo STARTING CALLS ...
echo
echo CREATING USERS...
echo
echo
near call $1 createUser --account-id $2
echo
near call $1 createUser --account-id 4myfuture2.lexdev.testnet
echo
near call $1 createUser --account-id 4myfuture3.lexdev.testnet
echo
echo 
echo GETTING REGISTERED USERS...
echo
near call $1 getAllUsers --account-id $2
echo
echo
echo CREATING STUDENTS PROPOSALS
echo
near call $1 createNewProposal '{"title": "Fondos para hacer...", "description": "xd", "finishDate": "a", "photos":["a"], "amountNeeded": 10.1}' --account-id 4myfuture2.lexdev.testnet
echo
near call $1 createNewProposal '{"title": "Fondos para hacer...", "description": "xd", "finishDate": "a", "photos":["a"], "amountNeeded": 5.1}' --account-id 4myfuture3.lexdev.testnet
echo
echo
echo GETTING PROPOSALS...
echo
near call $1 getAllProposals --account-id $2
echo
echo
echo CREATING PROPOSAL OBJECTIVE AMOUNT CONTRIBUTION...
echo
near call $1 createContribution '{"proposalId": 1, "amount": 10.1, "userRefound": "4myfuture2.lexdev.testnet"}' --account-id $2 --deposit 10.1
echo
echo
echo GETTING PROPOSALS TO CHECK THE AMOUNT RECEIVED
echo 
near call $1 getAllProposals --account-id $2
echo
echo
echo PAYING THE STUDENT THE SUCCESSFULL PROPOSAL
echo
near call $1 proposalSuccess '{"proposalId": 1 }' --account-id 4myfuture2.lexdev.testnet
echo
echo
echo CHECKING THE NEW PROPOSAL STATUS
echo
near call $1 getAllProposals --account-id $2
echo
echo
echo CREATING AN UNCOMPLETED CONTRIBUTION
near call $1 createContribution '{"proposalId": 2, "amount": 3.1, "userRefound": "4myfuture3.lexdev.testnet"}' --account-id $2 --deposit 3.1
echo
echo
echo CHECKING IF THE STUDENT CAN RECEIVE THE UNCOMPLETED CONTRIBUTION
echo
near call $1 proposalSuccess '{"proposalId": 2}' --account-id 4myfuture3.lexdev.testnet
echo
echo
echo REFOUNDING THE NEARS TO CONTRIBUTORS
echo
near call $1 refound '{"proposalId": 2}' --account-id $2
echo
echo ENDED


