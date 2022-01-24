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

    const init = async () => {
        const { contract } = await initContract();
        contract.getAllProposals().then(setProposals);
        contract.getAllUsers().then(setUsers);
        contract.getAllContributions ().then(setContribution)
        contract.getTime().then(setTime)
        console.log(contract.getTime())
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
                {proposals.length > 0 ?
                    <div className='bg-gray-100'>
                        <ProposalsGeneral proposals={proposals} time={time}/>
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
