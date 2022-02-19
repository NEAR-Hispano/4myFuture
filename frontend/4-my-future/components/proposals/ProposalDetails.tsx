import React from "react";
import Proposal from "../../models/Proposal";
import ProposalsGeneral from "../home/ProposalsGeneral";
import { toDay_from_nano, toNEAR } from "../utils";
import { HeartIcon } from "../icons";
import { toYocto } from "../utils";
import { useNear } from "../../hooks/useNear";
import { FundModal } from "../FundModal";
import Modal from "../modal";
import moment from "moment";
import useUser from "../../hooks/useUser";
import { useRouter } from "next/router";

interface ProposalDetailsProps {
  proposal: Proposal;
}

function ProposalDetails({ proposal }: ProposalDetailsProps) {
  const [nearContext] = useNear();
  const fundsLeft =
    Number(toNEAR(proposal.amountNeeded)) - Number(toNEAR(proposal.founds));
  const [isOpenEnable, setIsOpenEnable] = React.useState<boolean>(false);
  const handleEnableModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsOpenEnable(true);
  };
  const [isOwner, setIsOwner] = React.useState<boolean>(false);
  const [user] = useUser();
  const router = useRouter();

  const canFund = async () => {
    if (proposal) {
      if (proposal.user == user.id) {
        setIsOwner(true);
        console.log("isOwner");
      }
    }
  };
  const fund = async () => {
    const proposalId = {
      proposalId: proposal.index
    };
    
    // @ts-ignore: Unreachable code error
    nearContext.contract.fund(proposalId,300000000000000,300000000000000).then(() => {
    router.push('/home')
  })
}


  React.useEffect(() => {
    canFund();
    if(((fundsLeft == 0) && (proposal.status != 3))) {
      fund();
    }
  });

  return (
    <div className="w-2/3 h-full pb-6 pr-6 pl-6 pt-6 mb-8 mt-8 bg-gray-100 border-2  shadow-xl font-sans my-4">
      {/* <div className="flex flex-col w-full h-1/4 ">
        <div className="flex justify-between">
          <div className="font-extralight mb-1"> #ID Proposal: {proposal.index}</div>
          <div className="text-base font-thin">Start: {proposal.initDate}</div>
          <div className="text-base font-thin">End: {proposal.finishDate}</div>
          <div className="text-base font-thin">
            Time left: {moment(proposal.finishDate).fromNow()}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="text-5xl font-bold text-green-500 p-5 font-">
            {proposal.title}
          </div>
        </div>
        <div className="text-2xl font-normal">
          Required: {toNEAR(proposal.amountNeeded)} NEARs
        </div>
        <div className="text-2xl font-thin"> {proposal.user}</div>
      </div>
      <div className="flex flex-col w-full h-1/4 ">
      <div className="text-base font-thin">
            Academic description:
          </div>
          <div className="text-base font-thin">
          Start: {proposal.activityStart}
          </div>
          <div className="text-base font-thin">
          End: {proposal.activityEnd}
          </div>
          <div className="text-base font-thin ">
          Institution: <a href={proposal.linkInstitution} target="_blank" className="hover:text-fuchsia-600"> Institution Website</a>
          </div>
          <div className="text-base font-thin">
          Pensum: <a href={proposal.linkPensum} target="_blank" className="hover:text-fuchsia-600"> Pensum link</a>
          </div>
      </div>

      <div className="h-1/2 mt-5 border-2 p-6 rounded-t-xl shadow-2xl flex justify-center items-center align-middle mb-5">
        <div className="flex flex-col h-full justify-center items-center">
          {fundsLeft==0? "": <div className="w-1/2   border-0 shadow-2xl flex flex-col bg-slate-600 rounded-lg border-black">
            <div className="w-full p-6 flex  text-black  font-thin justify-center items-center">
              <span className="font-bold text-2xl text-white">
                {fundsLeft.toFixed(2)} <span className="font-thin"> NEARs left</span>
              </span>
            </div>
            {proposal.status == 0 && proposal.user != user.id ?
            <button
              className="flex mb-5 m-auto p-3 w-2/4  items-center justify-center align-middle font-bold hover:bg-green-600 border-2 rounded-lg border-black text-black bg-green-500"
              onClick={handleEnableModal}
            >
              Fund
              <HeartIcon className="w-6"></HeartIcon>
            </button> :
            <div
            className="flex mb-5 m-auto p-3 w-2/4  items-center justify-center align-middle font-bold border-2 rounded-lg border-black text-black bg-gray-300"
            
          >
            Fund
            <HeartIcon className="w-6"></HeartIcon>
          </div>}
            <Modal isOpen={isOpenEnable}>
              <FundModal
                handleCancel={() => {
                  setIsOpenEnable(false);
                }}
                index={proposal.index}
                near={nearContext}
                user={proposal.user}
              />
            </Modal>
          </div>}
          
      
          <div className="text-2xl p-6 text-center font-thin">
            {proposal.description}
          </div>
        </div>
        <img
          src={proposal.photos[0]}
          alt="Proposal"
          className="h-full w-1/2 m-auto shadow-lg"
        />
      </div>
      <div className="flex flex-col items-center justify-center  align-middle text-xl font-medium text-green-500 border-t-2 "></div>
      {(((isOwner) && (proposal.status != 3) && (fundsLeft < (parseFloat(toNEAR(proposal.amountNeeded))*0.25))) || ((proposal.founds != '0') && moment(proposal.finishDate) < moment())) ? 
      <div className="text-center">
        <button className="p-6 bg-green-400 hover:bg-green-500" onClick={()=>{fund()}}>
        Get Funds 
        </button>
      </div>  
      :
      <div></div>
    }
     */}
<div className="md:py-4 lg:px-20 md:px-6 py-6 px-4">

 <div className="lg:p-10 md:p-6 p-4 bg-white">
 <div className="flex justify-between">
          <div className="font-extralight mb-1"> #ID Proposal:{proposal.index}</div>
          <div className="text-base font-thin">Proposal start: {proposal.initDate}</div>
          <div className="text-base font-thin">Proposal end: {proposal.finishDate}</div>
          <div className="text-base font-thin">
            Time left: {moment(proposal.finishDate).fromNow()}
          </div>
        </div>
   <div className="mt-3 md:mt-4 lg:mt-0 flex flex-col lg:flex-row items-strech justify-center lg:space-x-8">
     <div className="lg:w-1/2 flex justify-between items-strech bg-gray-50  px-2 py-20 md:py-6 md:px-6 lg:py-24">
     
       <div className="">
         <div className="lg:relative">
           <div className="flex">
           <a href={proposal.photos[0]} target="_blank">
           <img src={proposal.photos[0]} className="w-full h-full" />
           </a>
            
           </div>
         </div>
       </div>
    
     </div>
     <div className="lg:w-1/2 flex flex-col justify-center mt-7 md:mt-8 lg:mt-0 pb-8 lg:pb-0">
       <h1 className="text-5xl lg:text-4xl font-bold text-[#9a86e0] p-6 text-center">{proposal.title}</h1>
       <p className="text-base leading-normal text-gray-600 mt-2"> {proposal.description}</p>
       <div className="flex border-t border-gray-200 py-2">
          <span className="text-gray-500">Academic description:</span>
         
        </div> 
        <div className="flex border-t border-gray-200 py-2">
          <span className="text-gray-500">Creator:</span>
         
          <span className="ml-auto text-gray-900"> 
          <a href={`https://explorer.testnet.near.org/accounts/`+proposal.user} target="_blank" className="hover:text-fuchsia-600"> {proposal.user}</a>
          </span>
        </div>
       <div className="flex border-t border-gray-200 py-2">
          <span className="text-gray-500">Required:</span>
          <span className="ml-auto text-gray-900">{toNEAR(proposal.amountNeeded)} NEARs</span>
        </div>
        <div className="flex border-t border-gray-200 py-2">
          <span className="text-gray-500">Start:</span>
          <span className="ml-auto text-gray-900">{proposal.activityStart}</span>
        </div>
        <div className="flex border-t border-gray-200 py-2">
          <span className="text-gray-500">End:</span>
          <span className="ml-auto text-gray-900">{proposal.activityEnd}</span>
        </div>
        <div className="flex border-t border-gray-200 py-2">
          <span className="text-gray-500">Institution:</span>
          <span className="ml-auto text-gray-900"><a href={proposal.linkInstitution} target="_blank" className="hover:text-fuchsia-600"> Institution Website</a></span>
        </div>
        <div className="flex border-t border-gray-200 py-2">
          <span className="text-gray-500">Pensum:</span>
          <span className="ml-auto text-gray-900"><a href={proposal.linkPensum} target="_blank" className="hover:text-fuchsia-600"> Pensum link</a></span>
        </div>
       <p className="text-3xl font-medium text-gray-600 mt-8 md:mt-10"> 
       {fundsLeft.toFixed(2)} <span className="font-thin"> NEARs left</span>
       </p>

     <div className="flex items-center flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 lg:space-x-8 mt-8 md:mt-16">
       {proposal.status == 0 && proposal.user != user.id ? 
       
        <button className="w-full md:w-3/5 text-base font-medium leading-none uppercase py-6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 shadow-lg  hover:shadow-[#9a86e0]  bg-[#9a86e0] text-white"  onClick={handleEnableModal} >fund</button>
       
      
       : 
     
       <button className="w-full md:w-3/5 border border-gray-800 text-base font-medium leading-none uppercase py-6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 bg-gray-500 text-white" >fund</button>
      
     
       }
              
              {(((isOwner) && (proposal.status != 3) && (fundsLeft < (parseFloat(toNEAR(proposal.amountNeeded))*0.25))) || ((proposal.founds != '0') && moment(proposal.finishDate) < moment())) ? 
       <button className="w-full md:w-3/5 border border-gray-800 text-base font-medium leading-none uppercase py-6 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-green-400 hover:bg-green-500 text-white" onClick={()=>{fund()}}> Get Funds </button>
     
      :
      <div></div>
    } 


   </div>
      
   
    <Modal isOpen={isOpenEnable}>
              <FundModal
                handleCancel={() => {
                  setIsOpenEnable(false);
                }}
                index={proposal.index}
                near={nearContext}
                user={proposal.user}
              />
            </Modal>
     </div>
   </div>
 </div>
</div>
    </div>
  );
}

export default ProposalDetails;
