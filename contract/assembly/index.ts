import { context, Context, logging, storage, PersistentUnorderedMap, u128 } from 'near-sdk-as'
//import { userList } from './Storage';
import User from './models/User'
import { userList, proposals, contributions } from './Storage'
import { createProposal } from './ProposalManager';
import Proposal from './models/Proposal';
import Contribution from './models/Contribution';

export function createUser(): boolean {
  assert(!userList.contains(Context.sender), "the user already exist")
  let newUser = new User(Context.sender)  
  userList.set(context.sender, newUser)
  return true
}

export function deleteUser(): boolean{
  userList.delete(context.sender)
  return true
}

export function unitConverter(value: number): void {
  
  assert(context.attachedDeposit >= u128.from(value), "Attached deposit doesn't match contribution amount");
  logging.log(u128.from(value).toU128);
  //logging.log(typeof(u128.from(value)))
  logging.log(context.attachedDeposit)
  //logging.log(typeof(context.attachedDeposit))
  
}

export function listProposal(): Array<number>{
  return proposals.keys();
}

export function clearAll(): boolean {
  proposals.clear();
  contributions.clear();
  userList.clear();
  return true
}

export function getProposal(proposalId: number): Proposal{

  return proposals.getSome(proposalId);
}

export function cleanUsers(): boolean {
  userList.clear
  return true
}

export function getUser(userId: string): User| null {
  return userList.get(userId)
}



// export function updateUserContribution(userId: string, amount: number): User {
//   assert(userList.contains(userId), "El usuario no existe");
//   const userTemp = userList.getSome(userId);
//   let tempIndex = contributions.length + 1;
//   const contribTemp = createContribution(userTemp.proposal.index, amount, userTemp.id);
//   userTemp.contributions.push(contribTemp);
//   userList.set(userId, userTemp);
//   contributions.set(contribTemp.idContribution, contribTemp);
//  return userTemp
// }


export function createContribution(proposalId: string, amount: string, userRefound: string): Contribution {
  //amount must be more than 0
  
  let amountU128 = u128.from((parseInt(amount)));
  assert(amountU128 > u128.from(0), "Contribution will be not zero");

  assert(Context.attachedDeposit >= amountU128, "Attached deposit is lower than contribution amount");
  //get Proposal
  let proposal = proposals.getSome(parseInt(proposalId));


  assert(proposal.status == true, "Can't contribut to a frozen proposal");

  let  contribution = new Contribution(contributions.length+1,parseInt(proposalId), amountU128, userRefound)
  proposal.founds = u128.add(proposal.founds, amountU128)
  proposals.set(proposal.index, proposal)
  contributions.set(contributions.length+1, contribution)
  let  userTemp = userList.getSome(userRefound)
  userTemp.contributions.push(contribution)
  userList.set(userRefound, userTemp)
  return contribution
}

export function createNewProposal(
  title: string,
  description: string,
  finishDate: string,
  photos: Array<string>,
  amountNeeded: number
  ): Proposal {
    logging.log(Context.sender);
    logging.log(userList.get(Context.sender));
    logging.log(userList.contains(Context.sender));
 return createProposal(
    title,
    description,
    finishDate,
    photos,
    u128.from(amountNeeded+0.1)
  );
}

export function getAllProposals(): Array<Proposal> {
    return proposals.values(0, proposals.length);
  
}

export function getProposalById(id: string): Proposal{

  return proposals.getSome(parseInt(id))
}

export function dateRetun(): Date {

  return new Date(0)
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

