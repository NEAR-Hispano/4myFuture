import React from "react";
import Layout from "../components/Layout";
import { initContract } from "../components/near";

function contribution() {
  const [contribution, setContribution] = React.useState([]);
  const [proposals, setProposals] = React.useState([]);
  const [time, setTime] = React.useState();

  const init = async () => {
    const { contract } = await initContract();
    // @ts-ignore: Unreachable code error
    contract.getAllContributions().then(setContribution);
    // @ts-ignore: Unreachable code error
    contract.getAllProposals().then(setProposals);
  };

  React.useEffect(() => {
    init();
  }, []);
  return (
    <div>
      <Layout>
        <div className=" scroll-px-6">
          <div className=" p-6 text-2xl font-thin">Contributions Registered</div>
          <div className="flex flex-col">
            {contribution?.map((contribution, i) => (
              <div key={i} className="flex w-min m-auto">
                <div className="flex flex-col border-2 p-3 mt-6 shadow-lg shadow-[#7B62D9]">
                  <div className="flex">
                    <p className="mr-2 text-lg">Funded:</p>
                    <span className="text-lg text-[#7B62D9] font-extrabold">
                      {(
                        parseInt(contribution.amount) /
                        1000000000000000000000000
                      ).toFixed(2)}{" "}
                      
                    </span>
                    <span className="text-lg font-bold ml-2">NEARs</span>
                  </div>
                  <div className=" flex">
                    <p className="mr-2 text-lg text-bold">Reicipent:</p>
                    <span className="text-lg text-[#7B62D9] font-extrabold">
                      {contribution.userRefound}
                    </span>
                  </div>
                  <div className=" flex">
                    <p className="mr-2 text-lg text-bold">Date:</p>
                    <span className="text-lg text-[#7B62D9] font-extrabold">
                      {contribution.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default contribution;
