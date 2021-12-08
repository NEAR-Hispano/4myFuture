import { context, PersistentVector } from "near-sdk-core";
import Proposal from "./Proposal";

@nearBindgen

class User {
    userId: string;
    proposalActive: Proposal;
    contributions: Array<number>;
    rank: string;

    constructor(){
    this.contributions = [0];
    this.rank = '';
    this.userId = context.sender;
    }

    // getProposalActive(){

    // }

}

export default User;
export const userList = new PersistentVector<User>("u");