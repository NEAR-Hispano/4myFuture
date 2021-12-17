import { context, Context, logging, storage, util, u128, ContractPromiseBatch } from 'near-sdk-as'


import User from './models/User'
import { userList, proposals, contributions } from './Storage'
import { createProposal, inactiveProposal, getFundsToSuccess, proposalCompleted } from './ProposalManager';
import Proposal from './models/Proposal';
import Contribution from './models/Contribution';
import { asNEAR, ONE_NEAR, toYocto } from './utils';


export function createUser(): boolean {
  assert(!userList.contains(Context.sender), "the user already exist")
  let newUser = new User(Context.sender)  
  userList.set(context.sender, newUser)
  return true
}

export function getUser(userId: string): User {
  return userList.getSome(userId)
}

export function getUserContributionsLength(userId: string): number {
  assert(userList.contains(userId), "user not registered")
  return userList.get(userId)!.contributions.length
}

export function getUserContributions(userId: string): Array<Contribution>{
  assert(userList.contains(userId), "user not registered")
  const user = getUser(userId);
  return user.contributions
}


export function createNewProposal(
  title: string,
  description: string,
  finishDate: string,
  photos: Array<string>,
  amountNeeded: number
  ): Proposal {
 return createProposal(
    title,
    description,
    finishDate,
    photos,
    u128.from(amountNeeded)
  );
}
export function getProposalUser(): number{

  return proposals.values(0,proposals.length).filter(propo => propo.user == Context.sender).filter(prop => prop.status == 1).length
}

export function proposalSuccess(proposalId: i32): bool {
  if (proposalCompleted(proposalId)){
    return true;
  }
  return false;
} 

export function createContribution(proposalId: u32, amount: i32, userRefound: string): Contribution {
  //amount must be more than 0
  
  let amountU128 = u128.from(amount);
  let  fundsToSuccess = getFundsToSuccess(proposalId);

  // parse amount to u128
  assert(Context.attachedDeposit > u128.Zero, "Invalid contribution amount");
  assert(amountU128 <  fundsToSuccess, "The contributions is higher than the requirement");

 // assert(amountU128 > u128.from(0), "Contribution will be not zero");

  assert(asNEAR(Context.attachedDeposit) == amountU128, "Attached deposit mus be same than contribution amount"); 
  //get Proposal
  let proposal = proposals.getSome(proposalId);


  assert(proposal.status != 0, "Can't contribute to this proposal");

  let  contribution = new Contribution(contributions.length+1,proposalId, amountU128, userRefound);
  proposal.founds = u128.add(proposal.founds, amountU128);
  proposals.set(proposal.index, proposal);
  contributions.set(contributions.length+1, contribution);
  let  userTemp = userList.getSome(userRefound);
  userTemp.contributions.push(contribution);
  userList.set(userRefound, userTemp);
  return contribution
}


export function sting(): string {
  const sender = Context.sender
  return sender;
}


// export function getM(value: i32): void {
//   const amount = toYocto(value);
//  ContractPromiseBatch.create('blacks.testnet').transfer(amount);
  
// }

export function inactiveOneProposal(userId: string, index: u32): Proposal {
  return inactiveProposal(userId, index)
}

export function getAllProposals(): Array<Proposal> {
    return proposals.values(0, proposals.length);
  
};
export function getAllUsers(): Array<User> {
  return userList.values(0, userList.length);

};

export function changeRank (userId: string, rank: number): User{
  assert(userList.contains(userId), "El usuario no existe")
  const userTemp = userList.getSome(userId)
  userTemp.rank = rank
  userList.set(userId, userTemp)
  return userTemp
}

export function showId (userId: string): string{
  return userList.get(userId)!.id
}




  //export const ONE_NEAR = u128.from('10000000000000000')

