import { context, u128 } from "near-sdk-core";
import User from "./User";

@nearBindgen
class Proposal {
    user: string;
    amountNeeded: u128;
    founds: u128;
    title: string;
    description: string;
    initDate: number; //while development
    finishDate: string;
    photos: Array<string>;
    status: i8;
    index: number;

    constructor(
        user: string,
        title: string,
        description: string,
        amountNeeded: u128,
        initDate: number,
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

    setStatus(newStatus: i8): void {
        this.status = newStatus
    }

    setAmountAchieved(amount: u128): void {
        this.founds= u128.add(this.founds, amount);
    }
    
}
export default Proposal;