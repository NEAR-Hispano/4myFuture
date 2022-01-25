import React from "react";
import { NearContext } from "../context/nearContext";
import { toYocto } from "./utils";

interface FundModalProps {
  index: number;
  user: string;
  near: NearContext;
  handleCancel: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const FundModal = ({
  index,
  user,
  near,
  handleCancel,
}: FundModalProps) => {
  const [amountToContribute, setAmountToContribute] = React.useState<string>();

  const setNewContribution = async () => {
    try {
      var amountTemp = BigInt(toYocto(amountToContribute)).toString();

      const contribution = {
        proposalId: index,
        amount: amountToContribute,
        userRefound: user,
      };

      const contract = await near.contract;

      // @ts-ignore: Unreachable code error
      contract.createContribution(contribution, 300000000000000, amountTemp);
    } catch (e) {
        console.log(e);
    }
  };

  return (
    <div className="bg-gray-200 w-96 h-96 mx-auto min-h-60 rounded-md shadow-2xl flex flex-col font-sans">
      <div className="bg-green-500 w-full h-11 flex items-center rounded-t-md ">
        <div className="text-white w-full p-8 text-center">FUND CONFIRMATION</div>
      </div>
      <div className="flex-row text-black">
        <div className="pl-8 pr-8 mt-3 flex align-middle items-center">
        <div className="font-thin mr-3">Help with </div>
          <input
            className="w-1/4 text-center mr-4 appearance-none border flex border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600 rounded-md py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
            type="number"
            placeholder="0"
            onChange={(e) => setAmountToContribute(e.target.value)}
          />
          <div className="font-bold">NEARs</div>
        </div>
        <div></div>
        <div className="w-full mt-5">
          <div className="pr-8 pl-8 font-thin text-lg">
            Sometimes we need some words to carry on... Leave a message !🤩
          </div>
          <textarea
            className="w-3/4 p-3 resize mt-2 h-20 text-sm m-auto border flex border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600 rounded-md py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
          />
        </div>
        <div className="p-4 flex mt-2 border-t-2 border-gray-100">
          <button
            type="button"
            className="flex mb-5 m-auto p-2 w-1/3 items-center justify-center align-middle font-thin hover:font-bold border-2 rounded-lg border-black text-black "
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="flex shadow-xl mb-5 m-auto p-2 w-1/3 items-center justify-center align-middle font-bold hover:bg-green-600 border-2 rounded-lg border-black text-black bg-green-500"
            onClick={setNewContribution}
          >
            Fund
          </button>
        </div>
      </div>
    </div>
  );
};
