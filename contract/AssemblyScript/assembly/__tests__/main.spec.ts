import { createNewProposal, createUser, getAllProposals, getUser } from '..'; 
import { storage, Context, logging } from 'near-sdk-as'
import Proposal from '../models/Proposal';
import User from '../models/User';

const user = new User(Context.sender)
const userId = "test.testnet"
const proposal = new Proposal("", "I want to get my career", "I really want please", 1234.1, 9, "november", ["asd.img"], 0);


describe('createUser', () => {
  it('should return "True"', () => {
    expect(createUser()).toBe(true);
    it(`should return "Proposal`, () => {
      expect(createNewProposal("I want to get my career", "I really want please", "november", ["asd.img"], 1231.1)).toStrictEqual(proposal);
    })
  })
})

