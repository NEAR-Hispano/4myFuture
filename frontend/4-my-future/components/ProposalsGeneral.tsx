import React from "react";
import Proposal from "../models/Proposal";

interface ProposalGeneralProps {
  proposals: Proposal[];
}

function ProposalsGeneral({ proposals }: ProposalGeneralProps) {
  return (
    <div>
      {proposals?.map((proposal) => {
        <div className="flex flex-col">
          <h1>{proposal?.title}</h1>
          <p>{proposal?.description}</p>
          <p>{proposal?.user}</p>
        </div>;
      })}
    </div>
  );
}

export default ProposalsGeneral;
