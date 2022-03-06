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
      proposalId: proposal.index,
    };

    // @ts-ignore: Unreachable code error
    nearContext.contract.fund(proposalId, 300000000000000, 300000000000000)
      .then(() => {
        router.push("/home");
      });
  };

  const pauseProposal = async () => {
    const proposaltemp = {
      userId: user,
      proposalId: proposal.index,
    };

    //@ts-ignore: Unreachable code error
    nearContext.contract.percent();
  };

  React.useEffect(() => {
    canFund();
    if (fundsLeft == 0 && proposal.status != 3) {
      fund();
    }
  });

  return (
    <div className="w-11/12 h-full pb-6 pr-6 pl-6 mt-8 border-2  shadow-xl font-sans my-4">
      <div className="md:py-4 lg:px-20 md:px-6 py-6 px-4">
        <div className="lg:p-10 md:p-6 p-4 bg-white h-full">
          <div className="flex justify-between">
            <div className="font-extralight mb-1">
              {" "}
              #ID Proposal:{proposal.index}
            </div>
            <div className="text-base font-thin">
              Proposal start: {proposal.initDate}
            </div>
            <div className="text-base font-thin">
              Proposal end: {proposal.finishDate}
            </div>
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
                      <img
                        src={proposal.photos[0]}
                        className="w-full h-96 object-contain"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 flex flex-col justify-center mt-7 md:mt-8 lg:mt-0 pb-8 lg:pb-0">
              <h1 className="text-5xl lg:text-4xl font-bold text-[#9a86e0] p-6 text-center">
                {proposal.title}
              </h1>
              <p className="text-base leading-normal text-gray-600 mt-2">
                {" "}
                {proposal.description}
              </p>
              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">Academic description:</span>
              </div>
              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">Creator:</span>

                <span className="ml-auto text-gray-900">
                  <a
                    href={
                      `https://explorer.testnet.near.org/accounts/` +
                      proposal.user
                    }
                    target="_blank"
                    className="hover:text-fuchsia-600"
                  >
                    {" "}
                    {proposal.user}
                  </a>
                </span>
              </div>
              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">Required:</span>
                <span className="ml-auto text-gray-900">
                  {toNEAR(proposal.amountNeeded)} NEARs
                </span>
              </div>
              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">Start:</span>
                <span className="ml-auto text-gray-900">
                  {proposal.activityStart}
                </span>
              </div>
              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">End:</span>
                <span className="ml-auto text-gray-900">
                  {proposal.activityEnd}
                </span>
              </div>
              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">Institution:</span>
                <span className="ml-auto text-gray-900">
                  <a
                    href={proposal.linkInstitution}
                    target="_blank"
                    className="hover:text-fuchsia-600"
                  >
                    {" "}
                    {proposal.linkInstitution}
                  </a>
                </span>
              </div>
              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">Pensum:</span>
                <span className="ml-auto text-gray-900">
                  <a
                    href={proposal.linkPensum}
                    target="_blank"
                    className="hover:text-fuchsia-600"
                  >
                    {proposal.linkPensum}
                  </a>
                </span>
              </div>
              <p className="text-3xl font-medium text-gray-600 mt-8 md:mt-10">
                {fundsLeft.toFixed(2)}{" "}
                <span className="font-thin"> NEARs left</span>
              </p>

              <div className="flex justify-center items-center flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 lg:space-x-8 mt-8 md:mt-16">
                {proposal.status == 0 && proposal.user != user.id ? (
                  <button
                  onClick={handleEnableModal}
                  className="text-3xl font-bold pr-9 pl-9 hover:bg-[#6450ac] bg-[#7B62D9] p-2 rounded-xl shadow-2xl text-white border-2 font-sans"
                >
                  Contribute <span>❤</span>
                </button>
                ) : (
                  <div></div>
                )}

                {(isOwner &&
                  proposal.status != 3 &&
                  fundsLeft <
                    parseFloat(toNEAR(proposal.amountNeeded)) * 0.25) ||
                (proposal.founds != "0" &&
                  moment(proposal.finishDate) < moment()) ? (
                  <button
                    className="w-full md:w-3/5 border border-gray-800 text-base font-medium leading-none uppercase py-6 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-green-400 hover:bg-green-500 text-white"
                    onClick={() => {
                      fund();
                    }}
                  >
                    Get Funds
                  </button>
                ) : (
                  <div></div>
                )}
              </div>
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
  );
}

export default ProposalDetails;
