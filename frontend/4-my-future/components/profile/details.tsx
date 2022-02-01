import React from "react";
import User from "../../models/User";
import { useNear } from "../../hooks/useNear";
import { NearContext } from "../../context/nearContext";
import Loading from "../common/Loading";
import ContributionsGeneral from "./ContributionsGeneral";
interface DetailsProps {
  near: NearContext;
}

function details({ near }: DetailsProps) {
  const [user, setUser] = React.useState<User>(null);
  const [amountNEARs, setAmountNEARs] = React.useState(0);

  const getUser = async () => {
    try {
      const userId = await near.walletConnection.getAccountId();

      // @ts-ignore: Unreachable code error
      const user = await near.contract.getUser({ userId });
      setUser(user);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="h-screen w-screen flex justify-center items-center align-middle">
      {user ? (
        <div className="p-8 flex flex-col w-3/4 h-4/5 border-2 bg-gray-100 shadow-2xl rounded-t-xl">
          <div className="w-full pl-12 flex justify-between  border-b-2 border-green-500">
            <div className="text-5xl pb-7 text-bold text-black">{user.id}</div>
            <img src={user.picture} width={100} height={100} className="cursor-pointer"/>
          </div>
          <div className="flex flex-col mt-7 ml-12 text-2xl">
            <div>
              Level: <span className="font-bold">{user.rank}</span>
            </div>
            <div>
              Total Contributions:{" "}
              <span className="font-bold">{user.contributions.length}</span>
            </div>
          </div>
          <div className="w-full flex flex-col mt-10">
            <div className="text-xl text-green-500 ml-14 font-bold">Contributions</div>
            <div className="w-full  p-6">
              <ContributionsGeneral contributions={user.contributions} />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Loading />
        </div>
      )}
    </div>
  );
}

export default details;
