import { context, u128 } from "near-sdk-core";
import { userList } from "../Storage";
import User from "./User";

@nearBindgen
class Proposal {
    user: string;
    amountNeeded: u128;
    founds: u128;
    title: string;
    description: string;
    initDate: string; //while development
    finishDate: string;
    photos: Array<string>;
    status: i32;
    index: number;

    constructor(
        user: string,
        title: string,
        description: string,
        amountNeeded: u128,
        initDate: string,
        finishDate: string,
        photos: Array<string>,
        index: number
    ){
        this.user = user;
        this.title = title;
        this.description = description;
        this.amountNeeded = amountNeeded;
        this.initDate = initDate;
        this.finishDate = finishDate;
        this.photos = photos;
        this.status = 0;
        this.index = index;
        this.founds = u128.Zero;
    }

    setStatus(newStatus: i32): void {
        this.status = newStatus
    }

    setAmountAchieved(amount: u128): void {
        this.founds= u128.add(this.founds, amount);
    }

    //get user contributions
    getUserContributions(): User {
        let user = userList.getSome(this.user);
        return user;
    }
    
}
export default Proposal;