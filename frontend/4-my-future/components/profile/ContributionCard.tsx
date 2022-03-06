import React from "react";
import Contribution from "../../models/Contribution";
import { useRouter } from "next/router";
import { HeartIcon } from "../icons";
import { toNEAR } from '../utils';

interface ContributionCardProps {
  contribution: Contribution;
}

function ContributionCard({ contribution }: ContributionCardProps) {
  const router = useRouter();

  return (
    <div className="h-50 w-64 ml-5 flex flex-col font-sans shadow-xl p-5">
      <div className="bg-gray-500 p-4 rounded-t-xl">
        <div className="text-xl font-thin text-green-500 w-full flex justify-between">
          <div>Contribution ID#{contribution.idContribution}</div>
          <div>
            <HeartIcon className="w-6 border-0 text-red-500" />
          </div>
        </div>
        <div className="text-white">Recipient: <span className="font-bold"> {contribution.userRefound}</span></div>
      </div>
      
      <div>Funds: {toNEAR((contribution.amount).toString())}</div>
      <div className="w-full flex justify-between">
        <div>Proposal ID{contribution.proposalId}</div>
        <div>
          <button
            className="border-2 border-green-500 hover:bg-green-500"
            onClick={() => {
              router.push(`/proposal/${contribution.proposalId}`);
            }}
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContributionCard;
