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


    setProposal(proposal: Proposal): boolean{
        this.proposal = proposal;
        return true
    }

    


   



}


export default User;
