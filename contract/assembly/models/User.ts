import { context } from "near-sdk-core";
import Proposal from "./Proposal";

@nearBindgen

class User {
    id: string;
    proposal: Proposal | null;
    contributions: Array<number>;
    rank: string;

    constructor(){
    this.contributions = [0];
    this.rank = '';
    this.id = context.sender;
    }

    // getProposalActive(){

    // }

}

export default User;