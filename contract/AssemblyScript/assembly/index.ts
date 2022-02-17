<<<<<<< HEAD:contract/assembly/index.ts
import { context, Context, logging, u128, ContractPromiseBatch } from 'near-sdk-as'
import User from './models/User'
import { userList, proposals, contributions, payments, value, totalAmountContributed } from './Storage'
import { createProposal, inactiveProposal, getFundsToSuccess, proposalCompleted, pauseProposal, getPercentToRefound } from './ProposalManager';
import Proposal from './models/Proposal';
import Contribution from './models/Contribution';
import { adminDAO, asNEAR, BASE_TO_CONVERT, NANOSEC_DIA, NANOSEC_HOR, NANOSEC_MIN, NANOSEC_SEC, ONE_NEAR, onlyAdmins, toYocto, toYoctob128 } from './utils';
import Payment from './models/Payment';
import { generatePayFromProposal, transfer } from './FundsManager';



//USER FUNCTIONS <------------------------------ REVIEW 
/**
 * Create and save an user into 4MyFuture 
 * @returns  User
 */ 
export function createUser(): User {
  assert(!userList.contains(Context.sender), "the user already exist")
  let newUser = new User(Context.sender)  
  userList.set(Context.sender, newUser)
  return newUser
}

/**
 * Get a specific user object
 * @param userId user ID
 * @returns  User
 */ 
export function getUser(userId: string): User {
  const isUser = userList.getSome(userId);
  return isUser
}

/**
 * Get the quantity of contributions given by an user 
 * @param userId user ID
 * @returns  number
 */ 
export function getUserContributionsLength(userId: string): number {
  assert(userList.contains(userId), "user not registered")
  return userList.get(userId)!.contributions.length
}

/**
 * Get the contributions given by an user 
 * @param userId user ID
 * @returns  Array<Contribution>
 */ 
export function getUserContributions(userId: string): Array<Contribution>{
  assert(userList.contains(userId), "user not registered")
  const user = getUser(userId);
  return user.contributions
}

/**
 * Get all User saved 
 * @returns  Array<User>
 */ 
export function getAllUsers(): Array<User> {
  return userList.values(0, userList.length);

};

/**
 * Change the user rank 
 * @param userId user ID
 * @param rank new rank assigned  
 * @returns  User
 */ 
export function changeRank (userId: string, rank: number): User{
  assert(userList.contains(userId), "El usuario no existe")
  const userTemp = userList.getSome(userId)
  userTemp.rank = rank
  userList.set(userId, userTemp)
  return userTemp
}



//PROPOSAL FUNCTIONS <------------------------------ REVIEW

/**
 * Create a new student proposal
 * @param title proposal title
 * @param description history description
 * @param finishDate months the proposal will be active
 * @param photos history support
 * @param amountNeeded funds need it to cover de need   
 * @returns  Proposal
 */ 
export function createNewProposal(
  title: string,
  goal: string,
  linkInstitution: string,
  linkPensum: string,
  activityStart: string,
  activityEnd: string,
  description: string,
  initDate: string,
  finishDate: string,
  photos: Array<string>,
  amountNeeded: string
  ): Proposal {

    // assert(finishDate > 0, "Invalid finishDate")
    let amountf = parseFloat(amountNeeded)* BASE_TO_CONVERT;
    // let fninalDate = Context.blockTimestamp + (finishDate*NANOSEC_DIA);
    assert(amountf > 0, "invalid amount introduced");

 return createProposal(
    title,
    goal,
    linkInstitution,
    linkPensum,
    activityStart,
    activityEnd,
    description,
    initDate,
    finishDate,
    photos,
    u128.div(toYoctob128(u128.from(amountf)), u128.from(BASE_TO_CONVERT))
  );
}

/**
 * Set proposal status to inactive (Status=1)
 * @param index proposal ID to pause   
 * @returns  Array<Proposal>
 */ 
export function inactiveOneProposal(userId: string, index: u32): Proposal {
  return inactiveProposal(userId, index)
}

/**
 * Set proposal status to pause (status=2)
 * @param index proposal ID to pause   
 * @returns  Array<Proposal>
 */ 
export function pauseoneproposal(index: u32): Proposal {
  return pauseProposal(index)
}

/**
 * Get all proposal saved  
 * @returns  Array<Proposal>
 */ 
export function getAllProposals(): Array<Proposal> {
    return proposals.values(0, proposals.length);
  
};

/**
 * Get one proposal by Id  
 * @returns  Proposal
 */ 
export function getProposal(proposalId: string): Proposal {
  const idNumber = parseFloat(proposalId)
  const id = u32(idNumber);
  const proposal = proposals.getSome(id);
  return proposal;

}


//PROPOSAL CONTRIBUTIONS <------------------------------- REVIEW

/**
 * Refund users contribution once me
 * @param proposalId proposal index
 * @param amount amount for contribution
 * @param userRefound Student ID  
 * @returns Contribution
 */ 
export function createContribution(proposalId: u32, amount: string, userRefound: string, today: string, comments: string): Contribution {
  assert(proposals.contains(proposalId), "Inexistent proposal");
  //get Proposal
  let proposal = proposals.getSome(proposalId);
  assert(proposal.status == 0, "Can't contribute to this proposal");
  assert(proposal.finishDate != today, "Proposal time objective completed");
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
  // assert(Context.attachedDeposit == amountU128, "Attached deposit mus be same than contribution amount"); 
  let  contribution = new Contribution(contributions.length+1,proposalId,proposal.photos[0], amountU128, userRefound, userList.getSome(userRefound).picture, today, comments);
  proposal.founds = u128.add(proposal.founds, amountU128);
  proposals.set(proposal.index, proposal);
  contributions.set(contributions.length, contribution);
  let  userTemp = userList.getSome(userRefound);
  userTemp.contributions.push(contribution);
  userList.set(userRefound, userTemp);

  return contribution
}

/**
 * Get all contributions saved in system 
 * @returns Array<Contribution>
 */ 
export function getAllContributions(): Array<Contribution> {
  return contributions.values(0, contributions.length);
}


/**
 * Contribute to 4MyFutureDApp and save it  
 * @returns true
 */ 
export function giveTip(): bool { //FIXME
  assert(Context.attachedDeposit > u128.Zero, "Invalid contribution amount");
  const payment = new Payment('4MyFuture', Context.sender, Context.attachedDeposit, '', 'ProjectContribution');
  payments.set(payments.length, payment);
  const sum = u128.add(value.getSome(0), Context.attachedDeposit);
  value.set(0, sum);
  return true;
};



//CONTRACT PAYMENTS 

/**
 * Get all the Project Payments
 * @returns Array<Payment>
 */ 
export function getAllPayments(): Array<Payment>{
  return payments.values(0, payments.length);
}


/**
 * Fund users contribution once finished the proposal time
 * @param proposalId proposal 
 * @returns payStudent(student, proposal)
 */ 
export function fund(proposalId: i32): string {
 return generatePayFromProposal(proposalId)
}

export function percent(proposalId: i32): u128 {

  return getPercentToRefound(proposalId,25)
 }

/**
 * Get the contributions total amount
 * @returns Array<u128> with total amount 
 */ 
export function getTotalTips(): Array<u128>{
  return value.values(0,payments.length);
}

/**
 * Withdraw all NEARs amount by project contributions to DAO contract  
 */ 

export function withdrawAll(): void { //FIXME
  const isAdmin = onlyAdmins();
  assert(isAdmin, "Only admins can call this function");  
  assert(value.getSome(0) > u128.from(0), "The contract value equals to 0")
  transfer(adminDAO, value.getSome(0));
  const payment = new Payment(adminDAO, '4MyFuture', value.getSome(0), '', 'WithdrawTip');
  payments.set(payments.length, payment);
  value.set(0, u128.from(0));
}

export function changeProfilePicture(userId: string, picture: string): void {
  userList.getSome(userId).changePicture(picture);
}
=======
import { context, Context, logging, u128, ContractPromiseBatch } from 'near-sdk-as'
import User from './models/User'
import { userList, proposals, contributions, payments, value, totalAmountContributed } from './Storage'
import { createProposal, inactiveProposal, getFundsToSuccess, proposalCompleted, pauseProposal, getPercentToRefound } from './ProposalManager';
import Proposal from './models/Proposal';
import Contribution from './models/Contribution';
import { adminDAO, asNEAR, BASE_TO_CONVERT, NANOSEC_DIA, NANOSEC_HOR, NANOSEC_MIN, NANOSEC_SEC, ONE_NEAR, onlyAdmins, toYocto, toYoctob128 } from './utils';
import Payment from './models/Payment';
import { generatePayFromProposal, transfer } from './FundsManager';



//USER FUNCTIONS <------------------------------ REVIEW 
/**
 * Create and save an user into 4MyFuture 
 * @returns  User
 */ 
export function createUser(): User {
  assert(!userList.contains(Context.sender), "the user already exist")
  let newUser = new User(Context.sender)  
  userList.set(Context.sender, newUser)
  return newUser
}

/**
 * Get a specific user object
 * @param userId user ID
 * @returns  User
 */ 
export function getUser(userId: string): User {
  const isUser = userList.getSome(userId);
  return isUser
}

/**
 * Get the quantity of contributions given by an user 
 * @param userId user ID
 * @returns  number
 */ 
export function getUserContributionsLength(userId: string): number {
  assert(userList.contains(userId), "user not registered")
  return userList.get(userId)!.contributions.length
}

/**
 * Get the contributions given by an user 
 * @param userId user ID
 * @returns  Array<Contribution>
 */ 
export function getUserContributions(userId: string): Array<Contribution>{
  assert(userList.contains(userId), "user not registered")
  const user = getUser(userId);
  return user.contributions
}

/**
 * Get all User saved 
 * @returns  Array<User>
 */ 
export function getAllUsers(): Array<User> {
  return userList.values(0, userList.length);

};

/**
 * Change the user rank 
 * @param userId user ID
 * @param rank new rank assigned  
 * @returns  User
 */ 
export function changeRank (userId: string, rank: number): User{
  assert(userList.contains(userId), "El usuario no existe")
  const userTemp = userList.getSome(userId)
  userTemp.rank = rank
  userList.set(userId, userTemp)
  return userTemp
}



//PROPOSAL FUNCTIONS <------------------------------ REVIEW

/**
 * Create a new student proposal
 * @param title proposal title
 * @param description history description
 * @param finishDate months the proposal will be active
 * @param photos history support
 * @param amountNeeded funds need it to cover de need   
 * @returns  Proposal
 */ 
export function createNewProposal(
  title: string,
  description: string,
  initDate: string,
  finishDate: string,
  photos: Array<string>,
  amountNeeded: string
  ): Proposal {

    // assert(finishDate > 0, "Invalid finishDate")
    let amountf = parseFloat(amountNeeded)* BASE_TO_CONVERT;
    // let fninalDate = Context.blockTimestamp + (finishDate*NANOSEC_DIA);
    assert(amountf > 0, "invalid amount introduced");

 return createProposal(
    title,
    description,
    initDate,
    finishDate,
    photos,
    u128.div(toYoctob128(u128.from(amountf)), u128.from(BASE_TO_CONVERT))
  );
}

/**
 * Set proposal status to inactive (Status=1)
 * @param index proposal ID to pause   
 * @returns  Array<Proposal>
 */ 
export function inactiveOneProposal(userId: string, index: u32): Proposal {
  return inactiveProposal(userId, index)
}

/**
 * Set proposal status to pause (status=2)
 * @param index proposal ID to pause   
 * @returns  Array<Proposal>
 */ 
export function pauseoneproposal(index: u32): Proposal {
  return pauseProposal(index)
}

/**
 * Get all proposal saved  
 * @returns  Array<Proposal>
 */ 
export function getAllProposals(): Array<Proposal> {
    return proposals.values(0, proposals.length);
  
};

/**
 * Get one proposal by Id  
 * @returns  Proposal
 */ 
export function getProposal(proposalId: string): Proposal {
  const idNumber = parseFloat(proposalId)
  const id = u32(idNumber);
  const proposal = proposals.getSome(id);
  return proposal;

}


//PROPOSAL CONTRIBUTIONS <------------------------------- REVIEW

/**
 * Refund users contribution once me
 * @param proposalId proposal index
 * @param amount amount for contribution
 * @param userRefound Student ID  
 * @returns Contribution
 */ 
export function createContribution(proposalId: u32, amount: string, userRefound: string, today: string, comments: string): Contribution {
  assert(proposals.contains(proposalId), "Inexistent proposal");
  //get Proposal
  let proposal = proposals.getSome(proposalId);
  assert(proposal.status == 0, "Can't contribute to this proposal");
  assert(proposal.finishDate != today, "Proposal time objective completed");
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
  // assert(Context.attachedDeposit == amountU128, "Attached deposit mus be same than contribution amount"); 
  let  contribution = new Contribution(contributions.length+1,proposalId,proposal.photos[0], amountU128, userRefound, userList.getSome(userRefound).picture, today, comments);
  proposal.founds = u128.add(proposal.founds, amountU128);
  proposals.set(proposal.index, proposal);
  contributions.set(contributions.length, contribution);
  let  userTemp = userList.getSome(userRefound);
  userTemp.contributions.push(contribution);
  userList.set(userRefound, userTemp);

  return contribution
}

/**
 * Get all contributions saved in system 
 * @returns Array<Contribution>
 */ 
export function getAllContributions(): Array<Contribution> {
  return contributions.values(0, contributions.length);
}


/**
 * Contribute to 4MyFutureDApp and save it  
 * @returns true
 */ 
export function giveTip(): bool { //FIXME
  assert(Context.attachedDeposit > u128.Zero, "Invalid contribution amount");
  const payment = new Payment('4MyFuture', Context.sender, Context.attachedDeposit, '', 'ProjectContribution');
  payments.set(payments.length, payment);
  const sum = u128.add(value.getSome(0), Context.attachedDeposit);
  value.set(0, sum);
  return true;
};



//CONTRACT PAYMENTS 

/**
 * Get all the Project Payments
 * @returns Array<Payment>
 */ 
export function getAllPayments(): Array<Payment>{
  return payments.values(0, payments.length);
}


/**
 * Fund users contribution once finished the proposal time
 * @param proposalId proposal 
 * @returns payStudent(student, proposal)
 */ 
export function fund(proposalId: i32): string {
 return generatePayFromProposal(proposalId)
}

export function percent(proposalId: i32): u128 {

  return getPercentToRefound(proposalId,25)
 }

/**
 * Get the contributions total amount
 * @returns Array<u128> with total amount 
 */ 
export function getTotalTips(): Array<u128>{
  return value.values(0,payments.length);
}

/**
 * Withdraw all NEARs amount by project contributions to DAO contract  
 */ 

export function withdrawAll(): void { //FIXME
  const isAdmin = onlyAdmins();
  assert(isAdmin, "Only admins can call this function");  
  assert(value.getSome(0) > u128.from(0), "The contract value equals to 0")
  transfer(adminDAO, value.getSome(0));
  const payment = new Payment(adminDAO, '4MyFuture', value.getSome(0), '', 'WithdrawTip');
  payments.set(payments.length, payment);
  value.set(0, u128.from(0));
}

export function changeProfilePicture(userId: string, picture: string): void {
  userList.getSome(userId).changePicture(picture);
}
>>>>>>> e6ac75741340823e59bc88d7680f0c00d23b4aba:contract/AssemblyScript/assembly/index.ts
