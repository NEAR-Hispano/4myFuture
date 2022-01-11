import React from "react";

interface ProposalCardInfoProps {
  index: number;
  user: string;
  amountNeeded: string;
  founds: string;
  title: string;
  photos: string[];
  initDate: string;
}

function ProposalCard({
  index,
  user,
  amountNeeded,
  founds,
  title,
  photos,
  initDate,
}: ProposalCardInfoProps) {
  return (
    <div className="w-1/4 h-2/3 pb-6 pr-6 pl-6 pt-6 bg-gray-100 border-2 border-green-600 shadow-2xl font-sans">
      <div className="flex flex-col w-full h-1/4 border-b-2 ">
        <div className="font-extralight mb-1">{index}</div>
        <div className="flex justify-between">
          <div className="text-3xl font-bold text-green-500">{title}</div>
          <div className="text-xl font-thin">{initDate}</div>
        </div>
        <div className="text-xl font-thin">{user}</div>
      </div>

      <div className="h-1/2 mt-1 ">
        <img src={photos[0]} alt="Proposal" className="h-full w-full" />
      </div>
      <div className="flex flex-col items-center text-xl  font-medium text-green-500">
        <div>
          Required:{" "}
          <span className="font-bold text-black">{amountNeeded} NEARs</span>
        </div>
        <div className="flex w-full justify-between pl-8 pr-8 mt-8">
          <button className="p-3 pl-5 pr-5 hover:bg-slate-400  border-0 rounded-xl text-black bg-slate-300">
            Details
          </button>
          <button className="p-3 pl-5 pr-5 font-bold hover:bg-green-400 border-0 rounded-xl text-black bg-green-300">
            Fund
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProposalCard;
