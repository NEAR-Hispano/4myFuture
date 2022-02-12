import React from "react";
import Layout from "../components/Layout";
import { initContract } from "../components/near";

function contribution() {

  const [contribution, setContribution] = React.useState([]);
  const [proposals, setProposals] = React.useState([]);
  const [time, setTime] = React.useState();

  const init = async () => {
    const { contract } = await initContract();
    contract.getAllContributions().then(setContribution);
    contract.getAllProposals().then(setProposals);

  };

  React.useEffect(() => {
    init();
  }, []);
  return (
    <div>
      <Layout>
        <div className="">
          {(contribution)?.map((contribution, i) => (
            <div key={i}>
              <div className="p-4 w-1/12 m-auto">
                <div className="flex-row gap-4 flex justify-center items-center">
                  <div className="flex-shrink-0">
                    <a href="#" className="block relative">
                      <img alt="profil" src={contribution.userPic} className="mx-auto object-cover rounded-full h-16 w-16 " />
                    </a>
                  </div>
                  <div className=" flex flex-col">
                    <span className="text-gray-600 text-lg font-medium">
                      {contribution.userRefound}
                    </span>

                  </div>
                </div>
              </div>


              <div className="flex max-w-md bg-white shadow-lg rounded-lg overflow-hidden m-auto">

                <div className="w-1/3 bg-cover bg-landscape">
                  <img src={contribution.proposalPic} />
                </div>
                <div className="w-2/3 p-4">
                  <h1 className="text-gray-900 font-bold text-2xl">
                    Proposal ID: {contribution.proposalId}
                  </h1>
                  <p className="mt-2 text-gray-600 text-sm">
                    "{contribution.comments}" <br></br>
                    -{contribution.userRefound}
                  </p>
                  <div className="flex item-center mt-2">

                  </div>
                  <div className="flex item-center justify-between mt-3">

                    <h1 className="text-gray-700 text-sm">
                      Date: {contribution.date}
                    </h1>

                  </div>

                  <div className="flex item-center justify-between mt-3">


                    <h1 className="text-gray-700 text-sm">
                      Contributed: {parseInt(contribution.amount) / 1000000000000000000000000} NEAR
                    </h1>

                  </div>
                </div>
              </div>

            </div>





          ))}
        </div>
      </Layout>
    </div>
  );
}

export default contribution;
