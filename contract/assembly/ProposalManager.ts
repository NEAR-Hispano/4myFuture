import { Context, PersistentUnorderedMap, u128, ContractPromiseBatch } from "near-sdk-core";
import Contribution from "./models/Contribution";
import Payment from "./models/Payment";
import Proposal from './models/Proposal';
import User from './models/User';
import { proposals, userList, payments } from "./Storage";
import { asNEAR, onlyAdmins, toYocto } from './utils'

const index = i64(proposals.length); // counter based on the proposals length created 
//const initDate = String(context.blockTimestamp);
const initDate = Context.blockTimestamp;

/**
 * CALLABLE FUNCTIONS <-----------------------------------
 */

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
    finishDate: i64,
    photos: Array<string>,
    amountNeeded: u128
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

/**
 * function implemented for set proposal status to inactive
 * Only owner can call this function
 * @param userId proposal Owner
 * @param index proposal index
 * @returns setProposalStatus(1).
 */ 
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
  
  /**
 * function implemented for set proposal status to pause 
 * Only Admins can call this function
 * @param index proposal index
 * @returns setProposalStatus(2).
 */ 
  export function pauseProposal(
    index: u32
    ): Proposal {
    const isAdmin = onlyAdmins();
    assert(isAdmin, "Only admins can pause proposal");
    return setProposalStatus(index, 2);
  };
  
    /**
 * function implemented for set proposal status to active 
 * Only Admins can call this function
 * @param index proposal index
 * @returns setProposalStatus(0).
 */ 
  export function activeProposal(
    index: u32
    ): Proposal {
    const  isAdmin = onlyAdmins();
    assert(isAdmin, "Only admins can active proposal");  
    const proposal = proposals.getSome(index);
    assert(proposal.status != 0, "Proposal already active")
    return setProposalStatus(index, 0);
  };

/**
 * Get the remaining funds to complete the proposal objective 
 * @param proposalId proposal to analyze
 * @returns u128 
 */ 
export function getFundsToSuccess(proposalId: u32): u128 {
    const proposal = getProposal(proposalId);
    const request = proposal.amountNeeded;
    const funds = proposal.founds;
    var fundsToSuccess = substract(request, funds);
    return fundsToSuccess; 
}

/**
 * Checks if the proposal achieves its funding goal and pays the student
 * @param proposalId proposal 
 * @returns payStudent(student, proposal)
 */ 
export function proposalCompleted(proposalId: u32): bool {
    assert(proposals.contains(proposalId), "Proposal inexistent");
    assert(getFundsToSuccess(proposalId) == u128.from(0), "Insufficient funds")
    const proposal = getProposal(proposalId);
    assert(proposal.status == 0, "Proposal not active")
    proposal.setStatus(3);
    updateProposal(proposalId, proposal);
    return payStudent(proposal.user, proposal);
}


/**
 * BUILT IN FUNCTIONS <---------------------------------------------------------
*/ 

/**
 * Set the proposal status to the user or admin election
 * Function called by other functions
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

 /**
 * Pay the student the fund goal once completed
 * Function called by other functions
 * @param proposalId proposal 
 * @returns payStudent(student, proposal)
 */ 
export function payStudent(student: string, proposal: Proposal): bool {
    const payment = new Payment(student, proposal.founds, ('December 17, 1995 03:24:00'), "founds")
    payments.set(payments.length, payment);
    const amount = proposal.founds;
    ContractPromiseBatch.create(student).transfer(amount);
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
 * Get one proposal if it exist
 * @param index proposal id.
 * @returns Proposal | Null.
 */ 
export function getProposal(index: number): Proposal {
    return proposals.getSome(index);
}

/**
 * Get user if it exist 
 * @param userId user ID.
 * @returns User | Null.
 */ 
export function getUser(userId: string): User {
    return userList.getSome(userId);
}

  /**
 * Update an user within the system 
 * function call by other functions
 * @param userId user to update
 * @param user object User
 * @returns true
 */ 
   export function updateUser(userId: string, user:User):bool {
    userList.delete(userId);
    userList.set(userId,user)
    return true;
}

  /**
 * Update a Proposal within the system 
 * function call by other functions
 * @param proposalId proposal to update
 * @param proposal object Proposal
 * @returns true
 */ 
export function updateProposal(proposalId: u32, proposal: Proposal):bool {
    proposals.set(proposalId, proposal)
    return true;
}

/**
 * Push into storage the updated user 
 * function call by other functions
 * @param user User object
 * @returns boolean
 */ 
export function pushUpdatedUser(user: User | null): bool {
    if(user){
        userList.set( user.id ,user);
        return true;
    }
    return false;
}

/**
 * delete an user from storage
 * function call by other functions
 * @param user user id
 * @returns true
 */ 
export function deleteUser(user: string): bool {
    userList.delete(user);
    return true;
}

/**
 * Substract two u128 number types 
 * function call by other functions
 * @param num1 number
 * @param num2 number
 * @returns u128
 */ 
export function substract(num1: u128, num2: u128): u128  {
    return u128.sub(num1,num2);
}

/**
 * Get the progress percentage of an proposal in relation with the funds achieved 
 * @param proposalId Proposal ID 
 * @returns F64
 */
export function getProgressProposal(proposalId: i32): number{
    let proposalTemp = proposals.getSome(proposalId)
    let progress =  u128.div(u128.mul((proposalTemp.founds), u128.from(100)) , (proposalTemp.amountNeeded))
    return progress.toF64()
  }
