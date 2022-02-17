import { datetime, u128 } from "near-sdk-as";
import Proposal from "./Proposal";



@nearBindgen

class Contribution {
    idContribution: number;
    proposalId: number;
    proposalPic: string;
    amount: u128;
    userRefound: string;
    userPic: string;
    date: string;
    comments: string;


    
    constructor(idContribution: number, proposalId: number, proposalPic: string, amount: u128, userRefound: string, userPic:string, date: string, comments: string ){

        this.idContribution = idContribution;
        this.proposalId = proposalId;
        this.proposalPic = proposalPic;
        this.amount = amount;
        this.userRefound = userRefound;
        this.userPic = userPic;
        this.date = date;
        this.comments = comments;
    
        }

      
}


export default Contribution;