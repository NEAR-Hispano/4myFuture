import { datetime, u128 } from "near-sdk-as";
import Proposal from "./Proposal";



@nearBindgen

class Contribution {
    idContribution: number;
    proposalId: number;
    amount: u128;
    userRefound: string;

    
    constructor(idContribution: number, proposalId: number, amount: u128, userRefound: string ){

        this.idContribution = idContribution;
        this.proposalId = proposalId;
        this.amount = amount;
        this.userRefound = userRefound;
    
        }

      
}


export default Contribution;