import React from "react";
import Layout from "../components/Layout";
import { initContract } from "../components/near";

function contribution() {
  const [contribution, setContribution] = React.useState([]);
  const [proposals, setProposals] = React.useState([]);
  const [time, setTime] = React.useState();
  const [indexInf, setIndexInf] = React.useState(0);
  const [paginado] = React.useState(3);
  const [indexSup, setIndexSup] = React.useState(paginado);


  const init = async () => {
    const { contract } = await initContract();
    // @ts-ignore: Unreachable code error
    contract.get_contributions().then(setContribution);
    // @ts-ignore: Unreachable code error
    contract.get_proposals().then(setProposals);

  // @ts-ignore: Unreachable code error
    console.log(contract.get_contributions())
  };

  const previus = async () => {
    if(indexInf>0){
   setIndexSup(indexSup-paginado)
   setIndexInf(indexInf-paginado)
    }
   
  };

  const next = async () => {
    if(indexSup<contribution.length-1){
     setIndexSup(indexSup+paginado)
    setIndexInf(indexInf+paginado) 
    }
    
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
              ((i >= indexInf) && (i < indexSup)) ?

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
                      {contribution.by}
                    </span>
                  </div>
                  <div className=" flex">
                    <p className="mr-2 text-lg text-bold">Date:</p>
                    <span className="text-lg text-[#7B62D9] font-extrabold">
                      {contribution.date}
                    </span>
                  </div>
                  <div className=" flex">
                    <p className="mr-2 text-lg text-bold">Commets:</p>
                    <span className="text-lg text-[#7B62D9] font-extrabold">
                      {contribution.comments}
                    </span>
                  </div>
                </div>
              </div> : 
              ""
            ))}
          </div>

   <br></br>       
<div className="flex items-center w-2/4	m-auto">
    <button type="button" className="w-full p-4 border text-base rounded-l-xl text-gray-600 bg-white hover:bg-gray-100"
    onClick={() => {previus()}}>
    previous
    </button>
  
   
    <button type="button" className="w-full p-4 border-t border-b border-r text-base  rounded-r-xl text-gray-600 bg-white hover:bg-gray-100"
    onClick={() => {next()}}>
       
        next
    </button>
</div>

        </div>
      </Layout>
    </div>
  );
}

export default contribution;
