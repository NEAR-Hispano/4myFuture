import { context, Context, logging, u128, ContractPromiseBatch } from 'near-sdk-as'
import { proposals, contributions, payments } from './Storage'
import { getProgressProposal, inactiveProposal, proposalCompleted } from './ProposalManager';
import Proposal from './models/Proposal';
import Contribution from './models/Contribution';
import { asNEAR, BASE_TO_CONVERT, NANOSEC_DIA, NANOSEC_HOR, NANOSEC_MIN, NANOSEC_SEC, ONE_NEAR, onlyAdmins, toYocto, toYoctob128 } from './utils';
import Payment from './models/Payment';

let propId: i32;

//CALLABLE FUNCTIONS <---------------------------- REVIEW


export function generatePayFromProposal(proposalId: i32): string{
    assert(proposals.contains(proposalId), "Proposal is not registered")
    const proposal = proposals.getSome(proposalId);
    if(timeToProcessProposal(proposalId)){
      if(proposalCompleted(proposalId)){ 
        return "Proposal goal is complete!, creator will recibe amount";
      }else{
        refound(proposalId)
        inactiveProposal(proposal.user, proposalId);
        return "Proposal goal is not complete, contributors will recibe their amount";
      }
    }else{
      return "Proposal is not finish yet";
    }
  }



  //BUILT IN FUNCTIONS <------------------------------------ REVIEW

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
  
  export function transfer(user: string, amount: u128): boolean{
    ContractPromiseBatch.create(user).transfer(amount);
    return true
  }
  