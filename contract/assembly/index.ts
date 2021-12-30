import { context, Context, logging, u128, ContractPromiseBatch } from 'near-sdk-as'
import User from './models/User'
import { userList, proposals, contributions, payments, value } from './Storage'
import { createProposal, inactiveProposal, getFundsToSuccess, proposalCompleted, pauseProposal } from './ProposalManager';
import Proposal from './models/Proposal';
import Contribution from './models/Contribution';
import { asNEAR, BASE_TO_CONVERT, NANOSEC_DIA, NANOSEC_HOR, NANOSEC_MIN, NANOSEC_SEC, ONE_NEAR, onlyAdmins, toYocto, toYoctob128 } from './utils';
import Payment from './models/Payment';
import { generatePayFromProposal, transfer } from './FundsManager';

const adminDAO = "4myfuture.sputnikv2.testnet";


//USER FUNCTIONS <------------------------------ REVIEW 
export function createUser(): User {
  assert(!userList.contains(Context.sender), "the user already exist")
  let newUser = new User(Context.sender)  
  userList.set(Context.sender, newUser)
  return newUser
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


//PROPOSAL FUNCTIONS <------------------------------ REVIEW

export function createNewProposal(
  title: string,
  description: string,
  finishDate: i32,
  photos: Array<string>,
  amountNeeded: string
  ): Proposal {

    let amountf = parseFloat(amountNeeded)* BASE_TO_CONVERT;
    let fninalDate = Context.blockTimestamp + (finishDate*NANOSEC_MIN);
 return createProposal(
    title,
    description,
    fninalDate,
    photos,
    u128.div(toYoctob128(u128.from(amountf)), u128.from(BASE_TO_CONVERT))
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

export function inactiveOneProposal(userId: string, index: u32): Proposal {
  return inactiveProposal(userId, index)
}
export function pauseoneproposal(index: u32): Proposal {
  return pauseProposal(index)
}

export function getAllProposals(): Array<Proposal> {
    return proposals.values(0, proposals.length);
  
};


//PROPOSAL CONTRIBUTIONS <------------------------------- REVIEW

export function createContribution(proposalId: u32, amount: string, userRefound: string): Contribution {
  //amount must be more than 0
  if(!userList.contains(Context.sender)){ //CREATING USER FOR CONTRIBUTE
    let newUser = new User(Context.sender)  
    userList.set(Context.sender, newUser)
  }
  let amountBase = (parseFloat(amount)*BASE_TO_CONVERT);
  let amountU128 = u128.div(toYoctob128(u128.from(amountBase)), u128.from(BASE_TO_CONVERT));
  let  fundsToSuccess = getFundsToSuccess(proposalId);
  // parse amount to u128
  assert(Context.attachedDeposit > u128.Zero, "Invalid contribution amount");
  assert(amountU128 <=  fundsToSuccess, "The contributions is higher than the requirement");
 // assert(amountU128 > u128.from(0), "Contribution will be not zero");
  assert(Context.attachedDeposit == amountU128, "Attached deposit mus be same than contribution amount"); 
  //get Proposal
  let proposal = proposals.getSome(proposalId);
  assert(proposal.status == 0, "Can't contribute to this proposal");
  let  contribution = new Contribution(contributions.length+1,proposalId, amountU128, userRefound);
  proposal.founds = u128.add(proposal.founds, amountU128);
  proposals.set(proposal.index, proposal);
  contributions.set(contributions.length+1, contribution);
  let  userTemp = userList.getSome(userRefound);
  userTemp.contributions.push(contribution);
  userList.set(userRefound, userTemp);
  return contribution
}


export function giveTip(): bool {
  assert(Context.attachedDeposit > u128.Zero, "Invalid contribution amount");

  value.set(0,Context.attachedDeposit);
  return true;
};



//CONTRACT PAYMENTS
export function getAllPayments(): Array<Payment>{
  return payments.values(0, payments.length);
}

export function refundPayments(proposalId: i32): string {
 return generatePayFromProposal(proposalId)
}


// export function withdrawAll(): void {
//   assert(Context.sender == 'lexdev.testnet' || Context.sender == 'blacks.testnet', "only admins can withdraw");
//   if(value.get(0) != null){
//     transfer(adminDAO, value.get(0, u128.from(0)))
//   }

