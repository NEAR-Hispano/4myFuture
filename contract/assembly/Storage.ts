import { PersistentUnorderedMap, u128 } from "near-sdk-core";
import Contribution from "./models/Contribution";
import Payment from "./models/Payment";
import Proposal from './models/Proposal';
import User from './models/User';

//Proposals saved on the system
export const proposals = new PersistentUnorderedMap<number,Proposal>("proposals");

//Users registered 
export const userList = new PersistentUnorderedMap<string, User>("users");

//Contributions made it
export const contributions = new PersistentUnorderedMap<number, Contribution>("contributions");

//Project payments
export const payments = new PersistentUnorderedMap<number, Payment>("payments");

//Project total tip amounts
export const value = new PersistentUnorderedMap<number, u128>("value");