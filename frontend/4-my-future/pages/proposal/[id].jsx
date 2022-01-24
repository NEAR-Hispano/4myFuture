import React from 'react';
import ProposalDetails from '../../components/proposals/ProposalDetails';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import { initContract } from '../../components/near';
import Loading from '../../components/common/Loading';
import { HeartIcon } from "../../components/icons";
import {toYocto } from '../../components/utils'


function ProposalIdDetails() {
    const router = useRouter();
    const [proposal, setProposal] = React.useState(null);
    const [amounttoContribute, setAmounttoContribute] = React.useState();
    const [user, setUser] = React.useState("");
    const [time, setTime] = React.useState();
    

    const start = async () => {
        const { contract } = await initContract();
        contract.getTime().then(setTime)
        const idInt = await router.query.id;
        const id = String(idInt);
        if (id) {
            const proposal = await contract.getProposal(
                {
                    proposalId: id
                }
            )
            setProposal(proposal)
        }
    }

    const id = router.query.id;

    const setNewContribution = async () => {
        var amountTemp = BigInt(toYocto(amounttoContribute)).toString();
        const contribution = {
            proposalId: parseInt(id),
            amount: amounttoContribute,
            userRefound: user
          };
          console.log(amountTemp)

        const { contract } = await initContract();
        contract.createContribution(contribution,300000000000000,amountTemp);
       
   
        
       
        // contract.account.sendMoney("dev-1642423516270-21946079884438", amounttoContribute)
    
        // console.log(contribution)
       
        
      };

      const userLogged = async () => {
        const user =
          (await JSON.parse(localStorage.getItem("undefined_wallet_auth_key"))) ||
          null;
    
        if (user) {
          setUser(user?.accountId);
        }
      };

    React.useEffect(() => {
        userLogged();
        if (!id) {
            return;
        }
        const startClass = async () => {
            await start()
        }
        startClass()
    }, [id])



    return (
        <div>
            <Layout>
                <div className='w-screen h-screen flex justify-center items-center align-middle'>
                {proposal ?
                    <ProposalDetails proposal={proposal} time={time} />
                    :
                    <div>
                        <Loading />
                    </div>
                }


                </div>
                <div className="w-2/3 m-auto bg-slate-500">
            <span  className='mt-2 w-2/4 m-auto flex  font-bold'>Amount in NEARsp-: </span>
            <input
              className="w-2/4  m-auto appearance-none border flex pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
              type="number"
              placeholder="Amount to contribute"
              onChange={(e) => setAmounttoContribute(e.target.value)}
            />
          
                <button className="flex mb-5 m-auto p-3 w-2/4 items-center justify-center align-middle font-bold hover:bg-green-600 border-2 rounded-lg border-black text-black bg-green-500"
                onClick={setNewContribution}>
            Fund
            <HeartIcon className="w-6"></HeartIcon>
          </button>
          </div>
            </Layout>
            
        </div>
    )
}

export default ProposalIdDetails
