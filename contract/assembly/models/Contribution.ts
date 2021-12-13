import Proposal from "./Proposal";



@nearBindgen

class Contribution {
    amount: number;
    proposal: Proposal;
    user: string;

    
    constructor(accountId: string,amount: number, proposal: Proposal){

        this.user = accountId;
        this.proposal = proposal;
        this.amount = amount;
    
        }

      
}


export default Contribution;