import { context } from "near-sdk-core";
import User from "./User";

@nearBindgen
class Proposal {
    user: User;
    amountNeeded: number;
    title: string;
    description: string;
    initDate: string;
    finishDate: string;
    photos: Array<string>;
    status: number;
    index: number;

    constructor(
        user: User,
        title: string,
        description: string,
        amountNeeded: number,
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
    }

    setPhotos(photos: Array<string>): void {
        this.photos = photos
    }
}

export default Proposal;