import React from 'react';
import Layout from '../components/Layout';
import { initContract } from '../components/near';
import ProposalsGeneral from '../components/home/ProposalsGeneral';
import Loading from '../components/common/Loading';
import SearchHome from '../components/home/SearchHome';
import AppSummary from '../components/home/AppSummary';

function home() {

    const [proposals, setProposals] = React.useState([]);
    const [contribution, setContribution] = React.useState(null);
    const [users, setUsers] = React.useState(null);
    const [time, setTime] = React.useState();
    const [type, setProposaltype] = React.useState(3);

    const init = async () => {
        const { contract } = await initContract();
        contract.getAllProposals().then(setProposals);
        contract.getAllUsers().then(setUsers);
        contract.getAllContributions ().then(setContribution)
    }

    React.useEffect(
        () => {
            init()

        }, []
    )
    return (
        <div>
            <Layout>
                <SearchHome data={proposals} contribution={contribution} users={users}/>
                <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state"
              onChange={(e) => setProposaltype(e.target.value)}
            >
            
           
              <option value={3}>In progress </option>
              <option value={0}>Finished</option>
       
            </select>
                {proposals.length > 0 ?
                   
                   <div className='bg-gray-100'>
                    
                        <ProposalsGeneral proposals={proposals} type={type}/>
                    </div>
                    :
                    <div className="w-screen h-screen flex justify-center items-center align-middle p-0 bg-gray-200">
                        <Loading></Loading>
                    </div>
                }
            </Layout>
        </div>
    )
}

export default home
