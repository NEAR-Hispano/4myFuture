import React from "react";
import Proposal from "../../models/Proposal";
import Pagination from "../common/Pagination";
import ProposalCard from "./ProposalCard";

interface ProposalGeneralProps {
  proposals: Proposal[];
}

function ProposalsGeneral({ proposals }: ProposalGeneralProps) {
  return (
    <div className="">
      <div className="flex w-full flex-wrap overflow-hidden p-auto m-auto justify-center items-center align-middle">
        {proposals?.map((proposal) => (
          
            <ProposalCard
              title={proposal?.title}
              amountNeeded={proposal?.amountNeeded}
              index={proposal?.index}
              initDate={proposal?.initDate}
              finishDate={proposal?.finishDate}
              photos={proposal?.photos}
              user={proposal?.user}
              founds="23"
              status={proposal.status}
            ></ProposalCard>
          
        ))}
      </div>
    </div>
  );
}

export default ProposalsGeneral;
