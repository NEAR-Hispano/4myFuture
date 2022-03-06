import { context } from "near-sdk-core";
import { userList } from "../Storage";
import { accountId } from "../utils";
import Contribution from "./Contribution";
import Proposal from "./Proposal";

@nearBindgen

class User {
    id: string;
    contributions: Array<Contribution>;
    withActiveProposal: bool;
    rank: number;
    picture: string;

    constructor(accountId: string){

    this.rank = 0;
    this.id = accountId;
    this.contributions = new Array<Contribution>();
    this.withActiveProposal = false;
    this.picture = "https://ipfs.infura.io/ipfs/QmPcGmi195SxtGeM7U6TzhAMqq8Xd1hwaYn9iBArbQEiyA";
    }

    setProposal(isActive: bool): void{
        this.withActiveProposal = isActive;
    }

    changePicture(picture: string): void{
        this.picture = picture;
    }
 

    


   



}


export default User;
