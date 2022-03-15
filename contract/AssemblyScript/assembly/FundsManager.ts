import { context, Context, logging, u128, ContractPromiseBatch } from 'near-sdk-as'
import { proposals, contributions, payments } from './Storage'
import { getFundsToSuccess, getPercentToRefound, getProgressProposal, inactiveProposal, inactiveProposalAfterTime, proposalCompleted, updateProposal } from './ProposalManager';
import Proposal from './models/Proposal';
import Contribution from './models/Contribution';
import { asNEAR, BASE_TO_CONVERT, NANOSEC_DIA, NANOSEC_HOR, NANOSEC_MIN, NANOSEC_SEC, ONE_NEAR, onlyAdmins, toYocto, toYoctob128 } from './utils';
import Payment from './models/Payment';

let propId: i32;

//CALLABLE FUNCTIONS <---------------------------- REVIEW

/**
 * Check time and funds needed, after the verification pay the student or refund users, depends on the funds reached at the moment
 * @param proposalId proposal ID
 * @returns string
 */ 
export function generatePayFromProposal(proposalId: i32): string{
    assert(proposals.contains(proposalId), "Proposal is not registered");
    assert(proposals.getSome(proposalId).status == 0, "Can't generate payment from this proposal");
    if(getFundsToSuccess(proposalId) < getPercentToRefound(proposalId, 25)){
      if(proposalCompleted(proposalId)){ 
        return "Proposal goal is complete!, creator will recibe amount";
      }else{
        PayToCreator(proposalId)
        inactiveProposalAfterTime(proposalId);
        return "Proposal goal is not complete, contributors will recibe their amount";
      }
    }else{
      refund(proposalId)
      return "Proposal is not finish yet";
    }
  }



  //BUILT IN FUNCTIONS <------------------------------------ REVIEW

  /**
 * Transfer the student funds
 * @param proposalId proposal Owner
 * @returns boolean.
 */ 
  export function PayToCreator(proposalId: i32): boolean{
    ContractPromiseBatch.create(proposals.getSome(proposalId).user).transfer(proposals.getSome(proposalId).founds);
    return true;
  }
  
  /**
 * Refund contributors if the proposal doesn't get the funds needed
 * @param proposalId proposal ID
 * @returns bool
 */ 
  export function refund(proposalId: i32): boolean{
    propId = proposalId
    let contribTemp = contributions.values(0,contributions.length).filter(contrib => contrib.proposalId == propId)
    for (let index = 0; index < contribTemp.length; index++) {
      ContractPromiseBatch.create(contribTemp[index].userRefound).transfer(contribTemp[index].amount);
      logging.log(contribTemp[index])
      let pay = new Payment(contribTemp[index].userRefound, '4MyFuture', contribTemp[index].amount,"", "refund" )
      payments.set(payments.length+1, pay)
     
    }
    
    let proposalTemp = proposals.getSome(propId);
    proposalTemp.setStatus(3);
    updateProposal(propId,proposalTemp)


    return true
  }
  
  /**
 * Change the scale unit time for a proposal
 * @param proposalId proposal ID
 * @param time time in the specified unit
 * @param scale time unit
 * @returns Proposal
 */ 
  export function changetimeProposal(proposalId: i32, time: string): Proposal{
    
    let temProposal = proposals.getSome(proposalId)
  

    temProposal.finishDate = time;
    proposals.set(proposalId, temProposal)
    
    return temProposal
  }


  /**
 * Checks if the proposal is over time 
 * @param proposalId proposal ID
 * @returns bool
 */ 
  // export function timeToProcessProposal(proposalId: i32): boolean{
  //   let temProposal = proposals.getSome(proposalId)
  //   if(temProposal.finishDate < i64(Context.blockTimestamp)){
  //     return true
  //   }else{
  //     return false
  //   }
  // }
  
 /**
 * Transfer from contract to an specific user 
 * @param user transfer recipient 
 * @param amount to transfer
 * @returns bool
 */ 
  export function transfer(user: string, amount: u128): boolean{
    ContractPromiseBatch.create(user).transfer(amount);
    return true
  }
  