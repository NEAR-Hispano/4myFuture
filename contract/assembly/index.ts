import { context, Context, logging, storage, util, u128, ContractPromiseBatch } from 'near-sdk-as'


import User from './models/User'
import { userList, proposals, contributions } from './Storage'
import { createProposal, inactiveProposal, getFundsToSuccess, proposalCompleted } from './ProposalManager';
import Proposal from './models/Proposal';
import Contribution from './models/Contribution';
import { asNEAR, BASE_TO_CONVERT, ONE_NEAR, toYocto, toYoctob128 } from './utils';

let propId: i32;
export function createUser(userId: string): User {
  assert(!userList.contains(userId), "the user already exist")
  let newUser = new User(userId)  
  userList.set(userId, newUser)
  return newUser
}




export function refound(proposalId: i32): boolean{
  propId = proposalId
  let contribTemp = contributions.values(0,contributions.length).filter(contrib => contrib.proposalId == propId)
  for (let index = 0; index < contribTemp.length; index++) {
    ContractPromiseBatch.create(contribTemp[index].userRefound).transfer(contribTemp[index].amount);
    logging.log(contribTemp[index])
  }
  return true
}


export function getAllContribution(): Array<Contribution>{
  logging.log(contributions.length)
  let contribTemp = contributions.values(0,contributions.length).filter(contrib => contrib.proposalId == 1)
  logging.log(contribTemp.length)
  return contributions.values(0,contributions.length)
}

export function transferToRefound(value: u128, userRefound: string): boolean {
  const amount = toYoctob128(value);
 ContractPromiseBatch.create(userRefound).transfer(amount);
  return true
}

export function testAmount(amount: number): u128{
  logging.log(context.attachedDeposit)
  let amountF = (amount*BASE_TO_CONVERT);

  logging.log(u128.div(toYoctob128(u128.from(amountF)), u128.from(BASE_TO_CONVERT)) )
  logging.log(asNEAR(u128.div(toYoctob128(u128.from(amountF)), u128.from(BASE_TO_CONVERT))))
  ContractPromiseBatch.create('blacks.testnet').transfer(u128.div(toYoctob128(u128.from(amountF)), u128.from(BASE_TO_CONVERT)) );
  return u128.div(toYoctob128(u128.from(amountF)), u128.from(BASE_TO_CONVERT)) 
}

export function transfer(): boolean{
  ContractPromiseBatch.create('myfuture.testnet').transfer(ONE_NEAR);
  return true
}


export function getUser(userId: string): User {
  return userList.getSome(userId)
}

export function getUserContributionsLength(userId: string): number {

  return userList.get(userId)!.contributions.length
}


export function createNewProposal(
  title: string,
  description: string,
  finishDate: string,
  photos: Array<string>,
  amountNeeded: f64
  ): Proposal {

    let amountf = amountNeeded* BASE_TO_CONVERT;
 return createProposal(
    title,
    description,
    finishDate,
    photos,
    u128.div(toYoctob128(u128.from(amountf)), u128.from(BASE_TO_CONVERT))
  );
}
export function getProposalUser(): number{

  return proposals.values(0,proposals.length).filter(propo => propo.user == Context.sender).filter(prop => prop.status == 1).length
}

// export function comprobateUnit(proposalId: u32, value: u32): void {
//   logging.log(getFundsToSuccess(proposalId))
//   logging.log( u128.from(value))
//   logging.log(value)
// }



export function createContribution(proposalId: u32, amount: f64, userRefound: string): Contribution {
  //amount must be more than 0
  let amountBase = (amount*BASE_TO_CONVERT);
  let amountU128 = u128.div(toYoctob128(u128.from(amountBase)), u128.from(BASE_TO_CONVERT));

  
  let  fundsToSuccess = getFundsToSuccess(proposalId);

  // parse amount to u128
  assert(Context.attachedDeposit > u128.Zero, "Invalid contribution amount");
  assert(amountU128 <  fundsToSuccess, "The contributions is higher than the requirement");

 // assert(amountU128 > u128.from(0), "Contribution will be not zero");

  assert(Context.attachedDeposit == amountU128, "Attached deposit mus be same than contribution amount"); 
  //get Proposal
  let proposal = proposals.getSome(proposalId);


  assert(proposal.status == 0, "Can't contribut to a frozen proposal");

  let  contribution = new Contribution(contributions.length+1,proposalId, amountU128, userRefound);
  proposal.founds = u128.add(proposal.founds, amountU128);
  proposals.set(proposal.index, proposal);
  contributions.set(contributions.length+1, contribution);
  let  userTemp = userList.getSome(userRefound);
  userTemp.contributions.push(contribution);
  userList.set(userRefound, userTemp);
  if(fundsToSuccess == u128.from(0)){
    proposalCompleted(proposalId);
    logging.log('se pago mi panaxxxxxx')
  }

  return contribution
}
export function sting(): string {
  const sender = Context.sender
  return sender;
}


export function inactiveOneProposal(userId: string, index: u32): Proposal {
  return inactiveProposal(userId, index)
}

export function getAllProposals(): Array<Proposal> {
    return proposals.values(0, proposals.length);
  
};
export function getAllUsers(): Array<User> {
  return userList.values(0, userList.length);

};

export function getProgressProposal(proposalId: i32): u128{
  let proposalTemp = proposals.getSome(proposalId)
  logging.log(proposalTemp.founds)
  logging.log(proposalTemp.amountNeeded)
  
 
  let progress =  u128.div(u128.mul((proposalTemp.founds), u128.from(100)) , (proposalTemp.amountNeeded))
  logging.log(progress) 
  return progress
}

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

