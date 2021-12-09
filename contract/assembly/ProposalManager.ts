import { context, PersistentUnorderedMap } from "near-sdk-core";
import Proposal from './models/Proposal';
import User from './models/User';
import { proposals } from "./Storage";

const index = proposals.length; // counter based on the proposals length created 
const initDate = context.blockTimestamp;

/**
 * function implemented for create proposals
 * it make sure that the user introduced is a registered user
 * and he/she it's the function sender and he/she don't
 * already have a proposal created or active
 * @param user The contract caller.
 * @param title The title of the proposal.
 * @param description description of the proposal.
 * @param finishDate finish of the proposal period.
 * @param photos photos that support the description provided.
 * @param amountNeeded the amount in USD needed to fund the user education.
 * @returns Proposal Object created.
 */ 
export function createProposal(
    user: User,
    title: string,
    description: string,
    finishDate: string,
    photos: Array<string>,
    amountNeeded: number,
): Proposal {
    assert(user.id === context.sender, "User not registered");
    assert(user.proposal === null, "User already have a proposal created");
    assert(amountNeeded > 0, "Invalid proposal amount");
    assert(title.length > 3, "Invalid title");
    const newProposal = new Proposal(
        user,
        title,
        description,
        amountNeeded,
        initDate,
        finishDate,
        photos,
        index);

    return newProposal;
}

export function getProposals(): PersistentUnorderedMap<any,Proposal> {
    return proposals;
}

