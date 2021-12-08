import { PersistentUnorderedMap } from "near-sdk-core";
import Proposal from './models/Proposal';


const proposals = new PersistentUnorderedMap<any,Proposal>("proposals")