import { PersistentUnorderedMap } from "near-sdk-core";
import Proposal from './models/Proposal';
import User from './models/User';
import { accountId } from "./utils";


export const proposals = new PersistentUnorderedMap<string,Proposal>("proposals")
export const userList = new PersistentUnorderedMap<string, User>("users");