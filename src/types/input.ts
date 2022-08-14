export type BytesLike = string | Uint8Array;
export type BooleanLike = 'true' | 'false' | 'yes' | 'no' | boolean;
export type NumberLike = number | bigint | string;

export type FunctionLike = string | SolidityFunction;
export interface SolidityFunction {
  address: string;
  selector: string;
}
/*
export interface Abi {
  anonymous?:       boolean;
  inputs?:          { [key: string]: any }[];
  name?:            string;
  type?:            Type;
  constant?:        boolean;
  payable?:         boolean;
  stateMutability?: StateMutability;
  outputs?:         { [key: string]: any }[];
}

export enum StateMutability {
  Nonpayable = "nonpayable",
  Payable = "payable",
  Pure = "pure",
  View = "view",
}

export enum Type {
  Constructor = "constructor",
  Error = "error",
  Event = "event",
  Fallback = "fallback",
  Function = "function",
  Receive = "receive",
}
*/
