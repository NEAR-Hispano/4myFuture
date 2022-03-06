import React from "react";
import Contribution from "../../models/Contribution";
import ContributionCard from "./ContributionCard";

interface ContributionsGeneralProps {
  contributions: Contribution[];
}

function ContributionsGeneral({contributions}: ContributionsGeneralProps) {
  return (
    <div className="">
      <div className="flex w-full flex-wrap p-auto m-auto justify-center items-center align-middle ">
        {contributions?.map((contribution, i) => (

          <ContributionCard key={i} contribution={contribution}/>
        ))}
      </div>
    </div>
  );
}

export default ContributionsGeneral;
