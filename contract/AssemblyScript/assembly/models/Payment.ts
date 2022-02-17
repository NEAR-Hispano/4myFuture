import { context, u128 } from "near-sdk-core";
import { userList } from "../Storage";
import User from "./User";

@nearBindgen
class Payment{
    to: string;
    by: string;
    amount: u128;
    date: string;
    type: string;

    constructor(to: string, by:string, amount: u128, date: string, type: string){
        this.to = to;
        this.by = by;
        this.amount = amount;
        this.date = date;
        this.type = type;
    }
}
export default Payment;