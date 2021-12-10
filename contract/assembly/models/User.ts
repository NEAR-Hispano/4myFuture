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
    this.rank = 'Básico';
    this.id = accountId;
    this.contributions = new Array<number>();
    }

    // getProposalActive(){

    // }

    // getContributions(userid: string): Array<number> {
    // userList.get(userid)
    
    // }

    updateContributions(amount: number): boolean{
    
    this.contributions.push(amount)
        
    
    return true
    }

    createProposal(): boolean{
    
    return true
    }

    addContribution(): boolean{

        return true
    }

    changeRank(): boolean{

       this.rank = 'Medio'
        return true
    }



}

export default User;