import { context, Context, logging, storage, PersistentUnorderedMap, u128 } from 'near-sdk-as'
//import { userList } from './Storage';
import User from './models/User'
import { userList, proposals, contributions } from './Storage'
import { createProposal, setProposalStatus } from './ProposalManager';
import Proposal from './models/Proposal';
import Contribution from './models/Contribution';

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

  return userList.get(userId)!.contributions.length
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
    u128.from(amountNeeded)
  );
}

export function createContribution(proposalId: string, amount: string, userRefound: string): Contribution {
  //amount must be more than 0
  
  let amountU128 = u128.from((parseInt(amount)));
  assert(amountU128 > u128.from(0), "Contribution will be not zero");

  assert(Context.attachedDeposit >= amountU128, "Attached deposit is lower than contribution amount");
  //get Proposal
  let proposal = proposals.getSome(parseInt(proposalId));


  assert(proposal.status == 0, "Can't contribut to a frozen proposal");

  let  contribution = new Contribution(contributions.length+1,parseInt(proposalId), amountU128, userRefound)
  proposal.founds = u128.add(proposal.founds, amountU128)
  proposals.set(proposal.index, proposal)
  contributions.set(contributions.length+1, contribution)
  let  userTemp = userList.getSome(userRefound)
  userTemp.contributions.push(contribution)
  userList.set(userRefound, userTemp)
  return contribution
}
export function sting(): string {
  const sender = Context.sender
  return sender;
}

export function inactiveProposal(
  userId: string,
  index: number
  ): bool {
  assert(userId == context.sender, "Only creator can inactive proposal");
  return setProposalStatus(userId, index, 1);
};

export function pauseProposal(
  userId: string,
  index: number
  ): bool {
    assert(context.sender == 'blacks.testnet' || context.sender == 'edward.testnet', "Only admins can pause proposal");
  return setProposalStatus(userId, index, 2);
};

export function activeProposal(
  userId: string,
  index: number
  ): bool {
  assert(userId == context.sender, "Only creator can active proposal");  
  return setProposalStatus(userId, index, 0);
};

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

