import { context } from "near-sdk-core";
import User from "./User";

@nearBindgen
class Proposal {
    user: string;
    amountNeeded: number;
    amountAchieved: number;
    title: string;
    description: string;
    initDate: number; //while development
    finishDate: string;
    photos: Array<string>;
    status: i8;
    index: i64;

    constructor(
        user: string,
        title: string,
        description: string,
        amountNeeded: number,
        initDate: number,
        finishDate: string,
        photos: Array<string>,
        index: i64
    ){
        this.user = user;
        this.title = title;
        this.description = description;
        this.amountNeeded = amountNeeded;
        this.amountAchieved = 0;
        this.initDate = initDate;
        this.finishDate = finishDate;
        this.photos = photos;
        this.status = 0;
        this.index = index;
    }

    setStatus(newStatus: i8): void {
        this.status = newStatus
    }

    setAmountAchieved(amount: i64): void {
        this.amountAchieved += amount;
    }
    
}
export default Proposal;