import React from "react";
import Proposal from '../../models/Proposal';
import { useRouter } from 'next/router';
import { toDay_from_nano, toNEAR } from '../utils'
import { HeartIcon } from '../icons';



interface ProposalCardInfoProps {
  index: number;
  user: string;
  amountNeeded: string;
  founds: string;
  title: string;
  photos: string[];
  initDate: string;
  finishDate: string;
  status: number;
}

function ProposalCard({
  index,
  user,
  amountNeeded,
  founds,
  title,
  photos,
  initDate,
  finishDate,
  status
}: ProposalCardInfoProps) {
  const router = useRouter();

  return (
    <div className="w-1/3 h-full pb-6 pr-6 pl-6 pt-6 bg-gray-100 border-0 rounded-t-xl shadow-2xl font-sans mt-2 mr-2 m-8">
      <div className="flex flex-col w-full h-1/4 border-b-2 ">
        <div className="flex justify-between">
          <div className="font-extralight mb-1"> ID{index}</div>
          <div className="text-base font-thin">
            Days left: {toDay_from_nano(initDate, finishDate)}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="text-2xl font-bold text-green-500">{title}</div>
        </div>
        <div className="text-lg font-thin">{user}</div>
      </div>

      <div className="h-1/2 mt-1 ">
        <img src={photos[0]} alt="Proposal" className="h-60 w-50 m-auto" />
      </div>
      <div className="flex flex-col items-center text-xl font-medium text-green-500">
        <div className="mt-4 border-b-2 w-full ">
          Required:{" "}
          <span className="font-bold text-black">
            {toNEAR(amountNeeded)} NEARs
          </span>
        </div>
        <div className="mt-4 border-b-2 w-full ">
          Actual founds:{" "}
          <span className="font-bold text-black">{toNEAR(founds)} NEARs</span>
        </div>
        <div className="flex w-full justify-between pl-8 pr-8 mt-8 ">
          <button
            className="p-3 pl-12 pr-12 hover:bg-slate-400  w-full border-0 rounded-xl text-black bg-slate-300"
            onClick={(e) => {
              e.preventDefault();
              router.push(`/proposal/${index}`);
            }}
          >
            Details
          </button>
          {/* status == 0 ?
          <button className="p-3 flex pl-12 pr-12 font-bold hover:bg-green-400 border-2 border-black rounded-lg shadow-xl text-black bg-green-300">
            Fund
            <HeartIcon className="w-6"></HeartIcon>
          </button>
          :
          <div className="p-3 flex pl-12 pr-12 font-bold border-2 border-black rounded-lg shadow-xl text-gray-100 bg-gray-300">
            Fund
            <HeartIcon className="w-6"></HeartIcon>
          </div> */}
          
          
        </div>
      </div>
    </div>
  );
}

export default ProposalCard;
