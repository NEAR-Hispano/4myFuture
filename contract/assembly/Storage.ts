import { PersistentUnorderedMap, context, u128 } from "near-sdk-core";
import Contribution from "./models/Contribution";
import Payment from "./models/Payment";
import Proposal from './models/Proposal';
import User from './models/User';


export const proposals = new PersistentUnorderedMap<number,Proposal>("proposals");
export const userList = new PersistentUnorderedMap<string, User>("users");
export const contributions = new PersistentUnorderedMap<number, Contribution>("contributions");
export const payments = new PersistentUnorderedMap<number, Payment>("payments");
export const value = new PersistentUnorderedMap<number, u128>("value");