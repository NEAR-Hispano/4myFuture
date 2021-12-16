import { Context, PersistentUnorderedMap, u128, ContractPromiseBatch } from "near-sdk-core";
import Contribution from "./models/Contribution";
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
    amountNeeded: u128,
): Proposal {
    assert(userList.contains(Context.sender), "User not registered");
    const user = Context.sender;
    const userLogged = getUser(user); 
    assert(!userLogged.withActiveProposal, "User already have one active proposal")
    assert(amountNeeded > u128.Zero, "Invalid proposal amount");
    assert(title.length > 3, "Invalid title");
    const newProposal = new Proposal(
        Context.sender,
        title,
        description,
        amountNeeded,
        initDate,
        finishDate,
        photos,
        proposals.length+1);
    proposals.set(proposals.length +1, newProposal);
    userLogged.setProposal(true);
    deleteUser(user);
    pushUpdatedUser(userLogged);
    return newProposal;
};

export function inactiveProposal(
    userId: string,
    index: u32
    ): Proposal {
    assert(userId == Context.sender, "Only creator can inactive proposal");
    const userLogged = getUser(Context.sender);
    userLogged.setProposal(false);
    updateUser(userId, userLogged);
    return setProposalStatus(index, 1);
  };
  
  export function pauseProposal(
    userId: string,
    index: u32
    ): Proposal {
      assert(Context.sender == 'blacks.testnet' || Context.sender == 'edward.testnet', "Only admins can pause proposal");
    return setProposalStatus(index, 2);
  };
  
  export function activeProposal(
    userId: string,
    index: u32
    ): Proposal {
    assert(userId == Context.sender, "Only creator can active proposal");  
    return setProposalStatus(index, 0);
  };

export function pushProposal(index: number , proposal: Proposal): Proposal {
    proposals.set(index, proposal);
    return proposal;
}

export function updateUser(userId: string, user:User):bool {
    userList.delete(userId);
    userList.set(userId,user)
    return true;
}

export function updateProposal(proposalId: u32, proposal: Proposal):bool {
    proposals.set(proposalId, proposal)
    return true;
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

export function substract(num1: u128, num2: u128): u128  {
    return u128.sub(num1,num2);
}

export function getFundsToSuccess(proposalId: u32): u128 {
    const proposal = getProposal(proposalId);
    const request = proposal.amountNeeded;
    const funds = proposal.founds;
    var fundsToSuccess = substract(request, funds);
    return fundsToSuccess; 
}

export function proposalCompleted(proposalId: u32): bool {
    const proposal = getProposal(proposalId);
    proposal.setStatus(3);
    updateProposal(proposalId, proposal);
    return payStudent(proposal.user, proposal);
}

export function payStudent(student: string, proposal: Proposal): bool {
    ContractPromiseBatch.create(student).transfer(proposal.founds);
    return true
}

/**
 * function that remove form the storage one proposal (only for development purposes)
 * @param userId The proposal owner.
 * @returns boolean.
 */ 
export function deleteProposal(
    index: number
): boolean {
    proposals.delete(index);
    return true;
}

/**
 * Get one proposal 
 * @param userId user ID.
 * @returns Proposal | Null.
 */ 
export function getProposal(index: number): Proposal {
    return proposals.getSome(index);
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
    index: u32,
    newStatus: i8
 ): Proposal {
     assert(proposals.contains(index), "proposal not registered"); //Check if userId has a proposal registered and within storage
     const userProposal = proposals.getSome(index)
     assert(userProposal.user == Context.sender, "You need to be the proposal owner") //Check the owner is the function caller
     userProposal.setStatus(newStatus) 
     deleteProposal(index); 
     proposals.set(index, userProposal) 

     return userProposal;
 }


