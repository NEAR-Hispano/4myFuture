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
        {(contribution)?.map((contribution) => (
          <div  className="p-8 text-gray-500 bg-gray-100  rounded-2xl font-medium w-1/2 m-auto mt-2 grid grid-cols-3">
           <div className="">
           
           
            
            <span>Contributor: {contribution.userRefound}</span>
            <img src={contribution.userPic} width={100} height={100}/>
           </div>
            <div className="">
            <span>Date: {contribution.date}</span> <br></br>
            <span>ID contribution: {contribution.idContribution}</span> <br></br>
            <span>Amount in NEAR: {parseInt(contribution.amount)/1000000000000000000000000}</span> <br></br>
              <img src="https://www.pngplay.com/wp-content/uploads/12/Arrow-Free-PNG.png" width={100} height={100}/>
           </div>

           <div className="">
           <span>ID proposal: {contribution.proposalId}</span> <br></br>
           <img src={contribution.proposalPic} width={100} height={100}/>
            </div>
           
           
            

         
            
          
          </div>
         
        
      ))}
        </div>
      </Layout>
    </div>
  );
}

export default contribution;
