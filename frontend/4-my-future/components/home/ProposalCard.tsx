import React from "react";
import Proposal from '../../models/Proposal';
import { useRouter } from 'next/router';
import { toDay_from_nano, toNEAR } from '../utils'
import { HeartIcon } from '../icons';
import moment from 'moment';
import { coingeckoFetch, coingeckoUrl } from "../coingeko";




interface ProposalCardInfoProps {
  index: number;
  user: string;
  amountNeeded: string;
  founds: string;
  title: string;
  goal: string;
  photos: string[];
  initDate: string;
  finishDate: string;
  status: number;
  type: number;
  Ordergoal: string;
}

function ProposalCard({
  index,
  user,
  amountNeeded,
  founds,
  title,
  goal,
  photos,
  initDate,
  finishDate,
  status,
  type,
  Ordergoal
}: ProposalCardInfoProps) {
  let restan = Math.round((Number(toNEAR(founds)) / Number(toNEAR(amountNeeded))) * 100);
  let percent = "w-[" + restan + "%]";
  percent = percent.toString();
  console.log(coingeckoFetch(moment().format('DD-MM-YYYY')))
  const router = useRouter();
  const fundsLeft = Number(toNEAR(amountNeeded)) - Number(toNEAR(founds));
  let counter = 0;

  // return status == type? <div> </div>:  (goal==Ordergoal || Ordergoal == "-")? (
  //   <div className={ status == 0 ? "w-1/3 h-full pb-6 pr-6 pl-6 pt-6 bg-gray-100 border-0 rounded-t-xl shadow-lg shadow-[#7B62D9] font-sans mt-2 mr-2 m-8 " 
  //   : "w-1/3 h-full pb-6 pr-6 pl-6 pt-6 bg-gray-100 border-0 rounded-t-xl shadow-lg shadow-green-400 font-sans mt-2 mr-2 m-8 "} >
  //     <div className="flex flex-col w-full h-1/4 border-b-2 ">
  //       <div className="flex justify-between">
  //         <div className="font-extralight mb-1"> ID{index}</div>
  //         <div className="text-base font-thin">
  //           Start: {initDate} 
  //         </div>
  //         <div className="text-base font-thin">
  //           End: {finishDate}
  //         </div>
  //         <div className="text-base font-thin">
  //           Time left: {moment(finishDate).fromNow()}
  //         </div>
  //       </div>
  //       {
  //       status == 0? 
  //         <div className="rounded-full py-1 px-4 font-medium border text-yellow-700 bg-yellow-100 border-yellow-300 text-center">
  //       In progress
  //      </div>
  //      :
  //      <div className="rounded-full py-1 px-4 font-medium border text-green-900 bg-green-100 border-green-300 text-center">
  //       Finished
  //      </div>
  //      }

  //       <div className="flex justify-between">
  //         <div className="text-2xl font-bold text-green-500">{title}</div>
  //       </div>



  //       <div className="text-lg font-thin">{user}</div>

  //     </div>

  //     <div className="h-1/2 mt-4 ">
  //       <img src={photos[0]} alt="Proposal" className="h-60 w-50 m-auto" />
  //     </div>
  //     <div aria-label="gray border badge" className="focus:outline-none border bg-[#7B62D9] h-6 w-60 mb-4 md:mb-0 rounded-full flex items-center justify-center m-auto">
  //                       <span className="text-xs text-white font-normal">{goal}</span>
  //       </div>

  //     <div className="flex flex-col items-center text-xl mt-4 font-medium ">
  //       <div className="border-t-2 w-full flex justify-center align-middle items-center text-3xl p-2 font-thin">
  //         {fundsLeft > 0 ? `${fundsLeft.toFixed(2)}  NEARs left` : "Finished!"}
  //       </div>

  //       <div className="w-full bg-gray-600 rounded-full h-2.5">
  //       <div className={`bg-[#7B62D9] h-2.5 rounded-full ${percent}`}></div>
  //       </div>


  //       <div className="flex w-full justify-between pl-8 pr-8 mt-8 ">
  //         <button
  //           className="p-3 pl-12 pr-12 hover:bg-slate-400  w-full border-0 rounded-xl text-black bg-slate-300"
  //           onClick={(e) => {
  //             e.preventDefault();
  //             router.push(`/proposal/${index.toString()}`);
  //           }}
  //         >
  //           Details
  //         </button>



  //       </div>
  //     </div>
  //   </div>
  // ): <div></div>;
 
  return status == type? <div></div>: (goal==Ordergoal || Ordergoal == "-")? (
    
    <div className= "flex items-center justify-center bg-gray-200 m-2 cursor-pointer w-1/4 blur-[1px] hover:blur-none" 
     
    onClick={(e) => {
      e.preventDefault();
      router.push(`/proposal/${index.toString()}`);
    }}
    >

      <div className={status == 0? "w-full bg-black hover:bg-white border border-gray-100 rounded-lg text-center hover:shadow-lg align-center hover:text-black text-cyan-50 "
      : "w-full bg-blue-300 border border-gray-100 rounded-lg text-center hover:shadow-lg align-center"}>
       
          <img src={photos[0]} className="h-64 w-48 m-auto object-contain" />
          <div className="w-full justify-center align-middle items-center text-2xl p-2 font-thin">
            {fundsLeft > 0 ? `${fundsLeft.toFixed(2)}  NEARs left` : "Finished!"}
          </div>
       

   
     

       
    
      

        {/* <div className="flex flex-col items-center text-xl  font-medium  ">
        <div className="text-base font-bold text-green-500 m-auto w-52 h-20"></div>
          <div className="border-t-2 w-full flex justify-center align-middle items-center text-2xl p-2 font-thin bg-[#7B62D9]">
            {fundsLeft > 0 ? `${fundsLeft.toFixed(2)}  NEARs left` : "Finished!"}
          </div>
        </div> */}
      </div>

    </div>
    
  ): 
  <div>
  </div>;

}

export default ProposalCard;
