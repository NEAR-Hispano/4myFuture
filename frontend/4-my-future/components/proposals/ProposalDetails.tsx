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
import  useUser  from "../../hooks/useUser";
import { useRouter } from 'next/router';


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
  const fund = async() => {
    const proposalId = proposal.index;
    const today = new Date();
    // @ts-ignore: Unreachable code error

    nearContext.contract.fund({proposalId, today}).then(() => {
    router.push('/home')
  })
}


  React.useEffect(() => {
    canFund();
    if((fundsLeft == 0) && (proposal.status != 3)) {
      fund();
    }
  })

  return (
    <div className="w-2/3 h-full pb-6 pr-6 pl-6 pt-6 bg-gray-100 border-2  shadow-xl font-sans">
      <div className="flex flex-col w-full h-1/4 ">
        <div className="flex justify-between">
          <div className="font-extralight mb-1"> #ID{proposal.index}</div>
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

      <div className="h-1/2 mt-5 border-2 p-6 rounded-t-xl shadow-2xl flex justify-center items-center align-middle mb-5">
        <div className="flex flex-col h-full justify-center items-center">
          {fundsLeft==0? "": <div className="w-1/2   border-0 shadow-2xl flex flex-col bg-slate-600 rounded-lg border-black">
            <div className="w-full p-6 flex  text-black  font-thin justify-center items-center">
              <span className="font-bold text-2xl text-white">
                {fundsLeft.toFixed(2)} <span className="font-thin"> NEARs left</span>
              </span>
            </div>
            <button
              className="flex mb-5 m-auto p-3 w-2/4  items-center justify-center align-middle font-bold hover:bg-green-600 border-2 rounded-lg border-black text-black bg-green-500"
              onClick={handleEnableModal}
            >
              Fund
              <HeartIcon className="w-6"></HeartIcon>
            </button>
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
          className="h-full w-50 m-auto shadow-lg"
        />
      </div>
      <div className="flex flex-col items-center justify-center  align-middle text-xl font-medium text-green-500 border-t-2 "></div>
      {((isOwner) && (proposal.status != 3) && (fundsLeft <= parseInt(proposal.amountNeeded)*0.25)) ? 
      <div>
        <button className="p-6 bg-green-400 hover:bg-green-500" onClick={()=>{fund()}}>
        Get Funds
        </button>
      </div>  
      :
      <div></div>
    }
    </div>
  );
}

export default ProposalDetails;
