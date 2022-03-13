import React from "react";
import { initContract } from "../components/near";

function Comments({proposalId}) {
  const [contribution, setContribution] = React.useState([]);
  const [time, setTime] = React.useState();

  const init = async () => {
    const { contract } = await initContract();
    // @ts-ignore: Unreachable code error
    contract.getAllContributions().then(setContribution);
   
  };

  React.useEffect(() => {
    init();
  }, []);
  return (
    <div>
  
        <div className="">
          <div className=" p-6 text-2xl font-thin">Contributions Registered</div>
          <div className="flex">
            {contribution?.map((contribution, i) => (
                proposalId != contribution.proposalId? 
                <div></div>
                :
              <div key={i} className="flex w-min ">
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
                    <p className="mr-2 text-lg text-bold">Comment:</p>
                    <span className="text-lg text-[#7B62D9] font-extrabold">
                      {contribution.comments}
                    </span>
                  </div>
               
                </div>
              </div>
            ))}
          </div>
        </div>
    
    </div>
  );
}

export default Comments;
