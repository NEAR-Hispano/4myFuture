import { context, Context, logging, storage, PersistentUnorderedMap } from 'near-sdk-as'
//import { userList } from './Storage';
import User from './models/User'
import { userList, proposals } from './Storage'
import { createProposal } from './ProposalManager';
import Proposal from './models/Proposal';

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


export function getUserContributionsLength(userId: string): number {

  return userList.get(userId)!.contributions.length
}

export function updateUserContribution(userId: string, amount: number): void {
  assert(userList.contains(userId), "El usuario no existe")
  const userTemp = userList.getSome(userId)
  userTemp.updateContributions(amount)

  userList.set(userId, userTemp)
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


export function changeRank (userId: string, rank: string): User{
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

