import { datetime, u128 } from "near-sdk-as";
import Proposal from "./Proposal";



@nearBindgen

class Contribution {
    idContribution: number;
    proposalId: number;
    amount: u128;
    userRefound: string;
    date: string;

    
    constructor(idContribution: number, proposalId: number, amount: u128, userRefound: string, date: string ){

        this.idContribution = idContribution;
        this.proposalId = proposalId;
        this.amount = amount;
        this.userRefound = userRefound;
        this.date = date;
    
        }

      
}


export default Contribution;