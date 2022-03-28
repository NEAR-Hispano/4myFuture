import React from "react";
import Contribution from "../../models/Contribution";
import ProposalsAdd from "../../pages/proposals";
import ContributionCard from "./ContributionCard";

interface ContributionsGeneralProps {
  contributions: Contribution[];
}

function ContributionsGeneral({ contributions }: ContributionsGeneralProps) {

  const [indexInf, setIndexInf] = React.useState(0);
  const [paginado] = React.useState(4);
  const [indexSup, setIndexSup] = React.useState(paginado);

  const previus = async () => {
    if (indexInf > 0) {
      setIndexSup(indexSup - paginado)
      setIndexInf(indexInf - paginado)
    }

  };

  const next = async () => {
    if (indexSup < contributions.length - 1) {
      setIndexSup(indexSup + paginado)
      setIndexInf(indexInf + paginado)
    }

  };

  return (
    <div className="">
      <div className="flex w-full flex-wrap p-auto m-auto justify-center items-center align-middle ">
        {contributions?.map((contribution, i) => (
          ((i >= indexInf) && (i < indexSup)) ?
            <ContributionCard key={i} contribution={contribution} />
            :
            ""
        ))}

      </div>

      <br></br>
      {contributions.length > paginado ?
        <div className="flex items-center w-2/4	m-auto">
          <button type="button" className="w-min p-4 border text-base rounded-l-xl text-gray-600 bg-white hover:bg-gray-100 m-auto"
            onClick={() => { previus() }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>


          <button type="button" className="w-min p-4 border-t border-b border-r text-base  rounded-r-xl text-gray-600 bg-white hover:bg-gray-100 m-auto"
            onClick={() => { next() }}>

            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        :
        ""
      }

    </div>
  );
}

export default ContributionsGeneral;
