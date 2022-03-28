import React from "react";
import Proposal from "../../models/Proposal";
import { useRouter } from "next/router";
import { toDay_from_nano, toNEAR } from "../utils";
import { HeartIcon } from "../icons";
import moment from "moment";
import { coingeckoFetch, coingeckoUrl } from "../coingeko";
import Loading from "../common/Loading";
import { useNear } from "../../hooks/useNear";

interface ProposalCardInfoProps {
  index: number;
  user: string;
  amountNeeded: string;
  founds: string;
  title: string;
  goal: string;
  pics: string[];
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
  pics,
  initDate,
  finishDate,
  status,
  type,
  Ordergoal,
}: ProposalCardInfoProps) {
  let restan = Math.round(
    (Number(toNEAR(founds)) / Number(toNEAR(amountNeeded))) * 100
  );
  let percent = "w-[" + restan + "%]";
  percent = percent.toString();
  console.log(coingeckoFetch(moment().format("DD-MM-YYYY")));
  const router = useRouter();
  const fundsLeft = Number(toNEAR(amountNeeded)) - Number(toNEAR(founds));
  let counter = 0;
  const [nearContext] = useNear();

  const seeDetails = async (e) => {
    e.preventDefault();
    if (nearContext.walletConnection.isSignedIn()) {
      router.push(`/proposal/${index.toString()}`);
    } else {
      await nearContext.walletConnection.requestSignIn();
    }
  };
  return status == type ? (
    <div></div>
  ) : goal == Ordergoal || Ordergoal == "-" ? (
    <div
      className="flex items-center justify-center m-2 cursor-pointer w-1/4"
      onClick={(e) => {
        seeDetails(e);
      }}
    >
      <div
        className={
          status == 0
            ? "w-full shadow-xl border border-gray-100 rounded-lg text-center hover:shadow-[#7B62D9] hover:shadow-lg align-center text-black "
            : "w-full shadow-xl border border-gray-100 rounded-lg text-center hover:shadow-green-300 hover:shadow-lg align-center text-black"
        }
      >
        <img src={pics[0]} className="h-64 w-48 m-auto object-contain" />
        <div className="w-full justify-center align-middle items-center text-2xl p-2 font-extrabold font-sans">
          <div className="text-base text-[#7B62D9]">{title}</div>
          {fundsLeft > 0 ? `${fundsLeft.toFixed(2)}  NEARs left` : "Finished❤"}
        </div>
      </div>
    </div>
  ) : (
    <div>{/* <Loading></Loading> */}</div>
  );
}

export default ProposalCard;
