import { context } from "near-sdk-core";
import { userList } from "../Storage";
import { accountId } from "../utils";
import Contribution from "./Contribution";
import Proposal from "./Proposal";

@nearBindgen

class User {
    id: string;
    contributions: Array<Contribution>;
    proposal: Proposal;
    rank: number;

    constructor(accountId: string){

    this.rank = 0;
    this.id = accountId;
    this.contributions = new Array<Contribution>();

    }

    // getProposalActive(){

    // }

    // getContributions(userid: string): Array<number> {
    // userList.get(userid)
    
    // }

    updateContributions(amount: number): boolean{
  
    //this.contributions!.push()
        
    
    return true
    }


    changeRank(): boolean{

       this.rank = 1
        return true
    }



}


export default User;
