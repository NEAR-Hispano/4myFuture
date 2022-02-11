import { u128 } from "near-sdk-as";
import { Context } from "near-sdk-core";

/**
 * Account ID of transaction sender.
 */
export type accountId = string;


//Admin within system
const ADMIN_ACCOUNT_1 = 'lexdev.testnet';
const ADMIN_ACCOUNT_2 = 'blacks.testnet';
export const adminDAO = "4myfuture.sputnikv2.testnet";


//Util units
export const ONE_NEAR = u128.from("1000000000000000000000000");
export const BASE_TO_CONVERT = 1000000.0;
export const NANOSEC_SEC = 1000000000;
export const NANOSEC_MIN = 60000000000;
export const NANOSEC_HOR = 3600000000000;
export const NANOSEC_DIA = 86400000000000;


/**
 * Switch a Yocto value to NEAR value
 * @param amount Yocto amount
 * @returns u128
 */
export function asNEAR(amount: u128): u128 {
    return u128.div(amount, ONE_NEAR);
  }

/**
 * Switch a NEAR i64 type value to Yocto value
 * @param amount NEAR amount
 * @returns u128
 */
export function toYocto(amount: i64): u128 {
  return u128.mul(ONE_NEAR, u128.from(amount))
}

export function toYoctodecimal(amount: f64): u128 {
  return u128.mul(ONE_NEAR, u128.from(amount))
}

/**
 * Switch a NEAR u128 type value to Yocto value
 * @param amount NEAR amount
 * @returns u128
 */
export function toYoctob128(amount: u128): u128{
  return u128.mul(ONE_NEAR, amount)
}

/**
 * Checks if sender is an Admin
 * @returns bool
 */
  export function onlyAdmins(): bool {
    if(Context.sender == ADMIN_ACCOUNT_1 || Context.sender == ADMIN_ACCOUNT_2){
      return true;
    } 
    return false;
  }



