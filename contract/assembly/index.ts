import { context, Context, logging, storage, PersistentUnorderedMap } from 'near-sdk-as'
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

export function cleanUsers(): boolean {
  userList.clear
  return true
}

export function getUser(userId: string): User| null {
  return userList.get(userId)
}



export function updateUserContribution(userId: string, amount: number): User {
  assert(userList.contains(userId), "El usuario no existe");
  const userTemp = userList.getSome(userId);
  const contribTemp = createContribution(userId, amount, userTemp.proposal);
  userTemp.contributions.push(contribTemp);
  userList.set(userId, userTemp);
  contributions.set(userId, contribTemp);
 return userTemp
}

export function getamountContribut(userId: string): number{
let contribTemp =+ contributions.get(userId)!.amount

return contribTemp
}

export function createContribution(userId: string, amount: number, proposal: Proposal): Contribution {
  

  return new Contribution(userId, amount, proposal)
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
    amountNeeded
  );
}

export function getAllProposals(): Array<Proposal> {
    return proposals.values(0, proposals.length);
  
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

