import React from "react";
import Proposal from "../../models/Proposal";
import Pagination from "../common/Pagination";
import ProposalCard from "./ProposalCard";

interface ProposalGeneralProps {
  proposals: Proposal[];
  type: number;
}

function ProposalsGeneral({ proposals, type}: ProposalGeneralProps) {
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
              founds={proposal?.founds}
              status={proposal?.status}
              type = {type}
              
            /> 
           
          
        ))}
      </div>
    </div>
  );
}

export default ProposalsGeneral;
