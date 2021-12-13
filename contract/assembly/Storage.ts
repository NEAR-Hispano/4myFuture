import { PersistentUnorderedMap, context } from "near-sdk-core";
import Contribution from "./models/Contribution";
import Proposal from './models/Proposal';
import User from './models/User';


export const proposals = new PersistentUnorderedMap<string,Proposal>("proposals");
export const userList = new PersistentUnorderedMap<string, User>("users");
export const contributions = new PersistentUnorderedMap<string, Contribution>("contributions");

