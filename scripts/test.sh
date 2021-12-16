clear
echo TESTING FUNCTIONS 👽
echo
echo Contract: $1
echo Account: $2

echo
echo test1: USER VALIDATION ----------------------------
echo
near call $1 createNewProposal '{"title": "hxdello", "description": "xdd", "finishDate": "xasdffd", "photos":["nasdasf"], "amountNeeded": 2344.3}' --account-id $2
echo 
echo test1 COMPLETED ✔

echo
echo test2: USER CREATION ----------------------------
echo
near call $1 createUser --account-id $2
echo
echo test2 COMPLETED ✔

echo
echo test3: CREATING PROPOSAL ----------------------------
echo
near call $1 createNewProposal '{"title": "hxdello", "description": "xdd", "finishDate": "xasdffd", "photos":["nasdasf"], "amountNeeded": 2344.3}' --account-id $2
echo
echo test3 COMPLETED ✔

echo
echo test4: TRYING TO CREATE ANOTHER PROPOSAL WITH SAME USER ----------------------------
echo
near call $1 createNewProposal '{"title": "hxdello", "description": "xdd", "finishDate": "xasdffd", "photos":["nasdasf"], "amountNeeded": 2344.3}' --account-id $2
echo
echo test4 COMPLETED ✔

echo
echo test5: TRYING TO SET NEW PROPOSAL STATUS WITH NO PROPOSAL OWNER ----------------------------
echo
near call $1 inactiveProposal '{"userId": ''"'$2'"'', "index": 1}' --account-id 4myfuture2.$2
echo
echo test5 COMPLETED ✔

echo
echo test6: SETTING PROPOSAL STATUS ----------------------------
echo
near call $1 inactiveProposal '{"userId": ''"'$2'"'', "index": 1}' --account-id $2
echo
echo test6 COMPLETED ✔

echo
echo test7: GET ALL PROPOSALS ----------------------------
echo
near call $1 getAllProposals --account-id $2
echo
echo test7 COMPLETED ✔

echo
echo test8: SENDING CONTRIBUTION ----------------------------
near call $1 createContribution '{"proposalId": 1, "amount": 1, "userRefound": ''"'$2'"''}' --account-id $2 --deposit 1
echo 
echo test8 COMPLETED ✔

echo
echo test9: GET USER ----------------------------
near call $1 getUser '{"userId": ''"'$2'"''}' --account-id $2
echo 
echo test8 COMPLETED ✔
echo
