import { context, Context, logging, u128, ContractPromiseBatch } from 'near-sdk-as'
import User from './models/User'
import { userList, proposals, contributions, contractValue, payments } from './Storage'
import { createProposal, inactiveProposal, getFundsToSuccess, proposalCompleted, pauseProposal } from './ProposalManager';
import Proposal from './models/Proposal';
import Contribution from './models/Contribution';
import { asNEAR, BASE_TO_CONVERT, NANOSEC_DIA, NANOSEC_HOR, NANOSEC_MIN, NANOSEC_SEC, ONE_NEAR, onlyAdmins, toYocto, toYoctob128 } from './utils';
import Payment from './models/Payment';

let propId: i32;
export function createUser(userId: string): User {
  assert(!userList.contains(userId), "the user already exist")
  let newUser = new User(userId)  
  userList.set(userId, newUser)

  return newUser
}

export function calculateTime(): void{
  logging.log( Context.blockIndex)
 
}

export function generatePayFromProposal(proposalId: i32): string{
  assert(proposals.contains(proposalId), "Proposal is not registered")
  let temProposal = proposals.getSome(proposalId)
  let progress = getProgressProposal(proposalId)

  if(timeToProcessProposal(proposalId)){
    if(getProgressProposal(proposalId)>=70){
      PayToCreator(proposalId)
      return "Proposal goal is complete!, creator will recibe amount";
    }else{
      refound(proposalId)
      return "Proposal goal is not complete, contributors will recibe their amount";
    }
  }else{
    return "Proposal is not finish yet";
  }
}

export function PayToCreator(proposalId: i32): boolean{
  ContractPromiseBatch.create(proposals.getSome(proposalId).user).transfer(proposals.getSome(proposalId).founds);
  return true;
}



export function refound(proposalId: i32): boolean{
  propId = proposalId
  let contribTemp = contributions.values(0,contributions.length).filter(contrib => contrib.proposalId == propId)
  for (let index = 0; index < contribTemp.length; index++) {
    ContractPromiseBatch.create(contribTemp[index].userRefound).transfer(contribTemp[index].amount);
    logging.log(contribTemp[index])
    let pay = new Payment(contribTemp[index].userRefound, contribTemp[index].amount,"", "refound" )
    payments.set(payments.length+1, pay)
   
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

export function comprobeTimeProposal(proposalId: i32): boolean{
  let TimeTemp = Context.blockTimestamp;
  
  if(proposals.getSome(proposalId).finishDate > i64(TimeTemp)){
    return true
  }else{
    return false
  }

}

export function changetimeProposal(proposalId: i32, time: i32, scale: string): Proposal{
  let newTime = i64(Context.blockTimestamp);
  let temProposal = proposals.getSome(proposalId)
  if(scale == "s"){
    newTime = newTime + ( i64(time)* i64(NANOSEC_SEC))
  }else if(scale == "m"){
    newTime = newTime + ( i64(time) * i64(NANOSEC_MIN))
  }else if(scale == "h"){
    newTime =  newTime + ( i64(time)* i64(NANOSEC_HOR) )
  }else if(scale == "d"){
    newTime =  newTime + ( i64(time)* i64(NANOSEC_DIA) )
  }
  temProposal.finishDate = newTime;
  proposals.set(proposalId, temProposal)
  
  return temProposal
}
export function timeToProcessProposal(proposalId: i32): boolean{
  let temProposal = proposals.getSome(proposalId)
  if(temProposal.finishDate < i64(Context.blockTimestamp)){
    return true
  }else{
    return false
  }
}

export function testAmount(amount: string): u128{
  let baseTime = 1640309634937914624;
  let newTime = Context.blockTimestamp;
  let finalTime = (newTime - baseTime);
  logging.log(baseTime)
  logging.log(newTime)
  logging.log(finalTime)
  logging.log(finalTime / NANOSEC_DIA)
  logging.log(context.blockTimestamp)
  //logging.log(context.epochHeight)
  logging.log(context.attachedDeposit)
  let amountF = (parseFloat(amount)*BASE_TO_CONVERT);
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

export function createContribution(proposalId: u32, amount: string, userRefound: string): Contribution {
  //amount must be more than 0
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


export function sting(): string {
  const sender = Context.sender
  return sender;
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
export function getAllUsers(): Array<User> {
  return userList.values(0, userList.length);

};

export function getProgressProposal(proposalId: i32): number{
  let proposalTemp = proposals.getSome(proposalId)
  let progress =  u128.div(u128.mul((proposalTemp.founds), u128.from(100)) , (proposalTemp.amountNeeded))
  logging.log(progress)
  return progress.toF64()
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

export function onlyManager(): bool {
  onlyAdmins()
  logging.log( 'Eres admin');
  return true
}

export function projectContribution(): bool {
  assert(Context.attachedDeposit > u128.Zero, "Invalid contribution amount");
  contractValue.set(Context.attachedDeposit);
  return true;
};

export function getContractValue(): u128 {
  return contractValue;
}

export function getAllPayments(): Array<Payment>{
  return payments.values(0, payments.length);
}