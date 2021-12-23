import { u128 } from "near-sdk-as";
import { context } from "near-sdk-core";

/**
 * Account ID of transaction sender.
 */
export type accountId = string;

/* Generates a unique ID */

export const ONE_NEAR = u128.from("1000000000000000000000000");
export const BASE_TO_CONVERT = 1000000.0;

export function asNEAR(amount: u128): u128 {
    return u128.div(amount, ONE_NEAR);
  }

  export function toYocto(amount: i64): u128 {
    return u128.mul(ONE_NEAR, u128.from(amount))
  }

  export function toYoctob128(amount: u128): u128{
    return u128.mul(ONE_NEAR, amount)
  }



