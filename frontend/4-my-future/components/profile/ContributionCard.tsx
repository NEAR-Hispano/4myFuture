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


<div className="cursor-pointer" onClick={() => {
               router.push(`/proposal/${contribution.proposalId}`);
           }}>

<div className=" border-2 p-3 mt-6 shadow-lg shadow-[#7B62D9]">
  <div className="flex">
    <p className="mr-2 text-lg">Funded:</p>
    <span className="text-lg text-[#7B62D9] font-extrabold">
      {toNEAR(contribution.amount.toString())}
    </span>
    <span className="text-lg font-bold ml-2">NEARs</span>
  </div>
  {/* <div className=" flex">
    <p className="mr-2 text-lg text-bold">Reicipent:</p>
    <span className="text-lg text-[#7B62D9] font-extrabold">
      {contribution.userRefound}
    </span>
  </div> */}
  <div className=" flex">
    <p className="mr-2 text-lg text-bold">Date:</p>
    <span className="text-lg text-[#7B62D9] font-extrabold">
      {contribution.date}
    </span>
  </div>
</div>

</div>
  );
}

export default ContributionCard;
