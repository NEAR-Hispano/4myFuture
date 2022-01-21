import React from "react";
import Contribution from "../../models/Contribution";
import ContributionCard from "./ContributionCard";

interface ContributionsGeneralProps {
  contributions: Contribution[];
}

function ContributionsGeneral({contributions}: ContributionsGeneralProps) {
  return (
    <div className="">
      <div className="flex w-full scroll-x scrollbar-hide p-auto m-auto justify-center items-center align-middle">
        {contributions?.map((contribution) => (
          <ContributionCard contribution={contribution}/>
        ))}
      </div>
    </div>
  );
}

export default ContributionsGeneral;
