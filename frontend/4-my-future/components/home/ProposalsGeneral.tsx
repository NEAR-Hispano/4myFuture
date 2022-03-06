import React from "react";
import Proposal from "../../models/Proposal";
import ProposalCard from "./ProposalCard";

interface ProposalGeneralProps {
  proposals: Proposal[];
  type: string;
  Ordergoal: string;

}

function ProposalsGeneral({ proposals, type, Ordergoal}: ProposalGeneralProps) {
  return (
    <div className="">
      <div className="flex w-full flex-wrap overflow-hidden p-auto m-auto justify-center items-center align-middle ">
        {proposals?.map((proposal, i) => (
          <ProposalCard
              key={i}
              title={proposal?.title}
              goal={proposal?.goal}
              amountNeeded={proposal?.amountNeeded}
              index={proposal?.index}
              initDate={proposal?.initDate}
              finishDate={proposal?.finishDate}
              photos={proposal?.photos}
              user={proposal?.user}
              founds={proposal?.founds}
              status={proposal?.status}
              type = {parseInt(type)}
              Ordergoal = {Ordergoal}
          
              
            /> 
           
          
        ))}
      </div>
    </div>
  );
}

export default ProposalsGeneral;
