import { context } from "near-sdk-core";
import Proposal from "./Proposal";

@nearBindgen

class User {
    id: string;
    contributions: Array<number>;
    rank: string;
   
    //ranks: ['Patrocinador básico', 'Patrocinador constante', 'Patrocinador VIP']

    constructor(){
    this.contributions = [0];
    this.rank = '';
    this.id = context.sender;
    }

    // getProposalActive(){

    // }

    updateContributions(userId: string,amount: number): boolean{
    
    // for(let i = 0; i < userList.length; i++) {
    //     if(userList[i].userId == userId){
    //         logging.log("Exite el usuario")
    //         userList[i].contributions.push(amount); 
    //     }
      
    // }
    
    return true;
    }

}

export default User;