import React from "react";
import Proposal from "../../models/Proposal";
import ProposalCard from "./ProposalCard";

interface ProposalGeneralProps {
  proposals: Proposal[];
  type: string;
  Ordergoal: string;

}



function ProposalsGeneral({ proposals, type, Ordergoal}: ProposalGeneralProps) {
  const [indexInf, setIndexInf] = React.useState(0);

  const [paginado] = React.useState(6);
  const [indexSup, setIndexSup] = React.useState(paginado);

  const previus = async () => {
    if(indexInf>0){
   setIndexSup(indexSup-paginado)
   setIndexInf(indexInf-paginado)
    }
   
  };
  
  const next = async () => {
    if(indexSup<proposals.length){
     setIndexSup(indexSup+paginado)
    setIndexInf(indexInf+paginado) 
    }
    
   };

  return (
    <div className="">
      <div className="flex w-full flex-wrap p-auto m-auto justify-center items-center align-middle ">
        {proposals?.map((proposal, i) => (
          ((i >= indexInf) && (i < indexSup)) ?
          
          <ProposalCard
              key={i}
              title={proposal?.title}
              goal={proposal?.goal}
              amountNeeded={proposal?.amount_needed}
              index={proposal?.index}
              initDate={proposal?.init_date}
              finishDate={proposal?.finish_date}
              pics={proposal?.pics}
              user={proposal?.user}
              founds={proposal?.funds}
              status={proposal?.status}
              type = {parseInt(type)}
              Ordergoal = {Ordergoal}
          
              
            /> 

            : ""
         
           
        )
       
        
        )}
      </div>
      <br></br>    
    {proposals.length > paginado? 
      <div className="flex items-center w-2/4	m-auto">
    <button type="button" className="w-full p-4 border text-base rounded-l-xl text-gray-600 bg-white hover:bg-gray-100"
    onClick={() => {previus()}}>
    previous
    </button>
    <button type="button" className="w-full p-4 border-t border-b border-r text-base  rounded-r-xl text-gray-600 bg-white hover:bg-gray-100"
    onClick={() => {next()}}>
       
        next
    </button>
</div> :
<div></div>
    }   
  
    </div>
  );
}

export default ProposalsGeneral;
