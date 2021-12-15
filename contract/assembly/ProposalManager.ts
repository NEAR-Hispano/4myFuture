import { Context, PersistentUnorderedMap } from "near-sdk-core";
import Proposal from './models/Proposal';
import User from './models/User';
import { proposals, userList } from "./Storage";

const index = i64(proposals.length); // counter based on the proposals length created 
//const initDate = String(context.blockTimestamp);
const initDate = 9

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

    title: string,
    description: string,
    finishDate: string,
    photos: Array<string>,
    amountNeeded: number,
): Proposal {
    assert(userList.contains(Context.sender), "User not registered");
    assert(getUser(Context.sender).proposal == null, "User has one proposal active" ) //Check if user have one proposal in account
    assert(amountNeeded > 0, "Invalid proposal amount");
    assert(title.length > 3, "Invalid title");
    const newProposal = new Proposal(
        Context.sender,
        title,
        description,
        amountNeeded,
        initDate,
        finishDate,
        photos,
        index);
    proposals.set(Context.sender, newProposal);
    const userTemp = userList.getSome(Context.sender);
    userTemp.proposal = newProposal;
    userList.set(userTemp.id, userTemp);
    return newProposal;
}

export function pushProposal(user: string , proposal: Proposal): Proposal {
    proposals.set(user, proposal);
    return proposal;
}

export function pushUpdatedUser(user: User | null): bool {
    if(user){
        userList.set( user.id ,user);
        return true;
    }
    return false;
}

export function deleteUser(user: string): bool {
    userList.delete(user);
    return true;
}

/**
 * function that remove form the storage one proposal (only for development purposes)
 * @param userId The proposal owner.
 * @returns boolean.
 */ 
export function deleteProposal(
    userId: string
): boolean {
    proposals.delete(userId);
    return true;
}

/**
 * Get one proposal 
 * @param userId user ID.
 * @returns Proposal | Null.
 */ 
export function getProposal(userId: string): Proposal {
    return proposals.getSome(userId);
}

export function getUser(userId: string): User {
    return userList.getSome(userId);
}

/**
 * Set the proposal status to the user or admin election
 * @param userId The proposal owner.
 * @param newStatus number of the next proposal status.
 * @returns boolean.
 */ 
export function setProposalStatus(
    userId: string,
    newStatus: i8
 ): bool {
     assert(userList.contains(userId), "user not registered"); //Check if userId exist within storage
     assert(proposals.contains(userId), "proposal not registered"); //Check if userId has a proposal registered and within storage
     const userProposal = getProposal(userId); 
     const owner = userProposal.user;  
     assert(owner == Context.sender, "You need to be the proposal owner") //Check the owner is the function caller
     const user = getUser(Context.sender); 
     deleteUser(userId);  
     userProposal.setStatus(newStatus); //Set the updated proposal status with newStatus(number)
     user.setProposal(userProposal); //Set the updated proposal in User data
     pushUpdatedUser(user); //Push the user with the proposal status updated into storage
     deleteProposal(userId);  
     pushProposal(owner, userProposal); //Push the updated proposal into storage


     return true;
 }


