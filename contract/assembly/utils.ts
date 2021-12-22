import { u128 } from "near-sdk-as";
import { Context } from "near-sdk-core";

/**
 * Account ID of transaction sender.
 */
export type accountId = string;


//ADMIN ACCOUNTS IN SYSTEM
const ADMIN_ACCOUNT = '4myfuture.sputnikv2.testnet';

/* Generates a unique ID */

export const ONE_NEAR = u128.from("1000000000000000000000000");

export function asNEAR(amount: u128): u128 {
    return u128.div(amount, ONE_NEAR);
  }

  export function toYocto(amount: u128): u128 {
    return u128.mul(ONE_NEAR, amount)
  }

  export function onlyAdmins(): bool {
    if(Context.sender == ADMIN_ACCOUNT){
      return true;
    } 
    return false;
  }



