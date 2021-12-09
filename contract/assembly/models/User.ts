import { u128 } from "near-sdk-as";
import { context, logging, PersistentVector } from "near-sdk-core";
import Proposal from "./Proposal";

@nearBindgen

class User {
    userId: string;
    proposalActive: Proposal;
    contributions: Array<number>;
    rank: string;
   
    //ranks: ['Patrocinador básico', 'Patrocinador constante', 'Patrocinador VIP']

    constructor(){
    this.contributions = [];
    this.rank = 'Básico';
    this.userId = context.sender;
    }

    // getProposalActive(){

    // }

    updateContributions(userId: string,amount: number): boolean{
    
    for(let i = 0; i < userList.length; i++) {
        if(userList[i].userId == userId){
            logging.log("Exite el usuario")
            userList[i].contributions.push(amount); 
        }
      
    }
    
    return true;
    }

}

export default User;
export const userList = new PersistentVector<User>("u");