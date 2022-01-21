import React from "react";
import Proposal from "../../models/Proposal";
import ProposalsGeneral from "../home/ProposalsGeneral";
import { toDay_from_nano, toNEAR } from "../utils";
import { HeartIcon } from "../icons";

interface ProposalDetailsProps {
  proposal: Proposal;
}

function ProposalDetails({ proposal }: ProposalDetailsProps) {
  const fundsLeft =
    Number(toNEAR(proposal.amountNeeded)) - Number(toNEAR(proposal.founds));
  return (
    <div className="w-2/3 h-full pb-6 pr-6 pl-6 pt-6 bg-gray-100 border-2 border-green-600 shadow-2xl font-sans">
      <div className="flex flex-col w-full h-1/4 border-b-2 ">
        <div className="flex justify-between">
          <div className="font-extralight mb-1"> #ID{proposal.index}</div>
          <div className="text-base font-thin">
            Days left: {toDay_from_nano(proposal.initDate, proposal.finishDate)}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="text-3xl font-bold text-green-500">
            {proposal.title}
          </div>
        </div>
        <div className="text-2xl font-normal">
          Required: {toNEAR(proposal.amountNeeded)} NEARs
        </div>
        <div className="text-2xl font-thin"> {proposal.user}</div>
      </div>

      <div className="h-1/2 mt-1 flex justify-center items-center align-middle mb-5">
        <img
          src={proposal.photos[0]}
          alt="Proposal"
          className="h-full w-50 m-auto"
        />
        <div className="text-2xl font-thin">{proposal.description}</div>
      </div>
      <div className="flex flex-col items-center justify-center  align-middle text-xl font-medium text-green-500 border-t-2 ">
        <div className="w-1/2 h-full mt-4 border-0 shadow-2xl rounded-lg border-black">
          <div className="w-full p-6 flex text-black  font-thin justify-center items-center">
        <span className="font-bold">{fundsLeft} NEARs left</span>
          </div>
          {/* <button className="flex mb-5 m-auto p-3 w-3/4 items-center justify-center align-middle font-bold hover:bg-green-600 border-2 rounded-lg border-black text-black bg-green-500">
            Fund
            <HeartIcon className="w-6"></HeartIcon>
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default ProposalDetails;
