import { context } from "near-sdk-core";
import { userList } from "../Storage";
import { accountId } from "../utils";
import Proposal from "./Proposal";

@nearBindgen

class User {
    id: string;
    contributions: Array<number>;
    proposal: Proposal | null;
    rank: string;

    constructor(accountId: string){
    this.contributions = [];
    this.rank = 'Básico';
    this.id = accountId;
    this.contributions = new Array();
    }

    // getProposalActive(){

    // }

    // getContributions(userid: string): Array<number> {
    // userList.get(userid)
    
    // }

    updateContributions(userId: string,amount: number): boolean{
    userList.get(userId)!.contributions.push(amount)
    return true
    }

    createProposal(): boolean{
    
    return true
    }

    addContribution(): boolean{

        return true
    }

    changeRank(): boolean{
        return true
    }



}

export default User;