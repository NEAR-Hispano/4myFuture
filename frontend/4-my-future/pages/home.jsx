import React from 'react';
import Layout from '../components/Layout';
import { initContract } from '../components/near';
import ProposalsGeneral from '../components/home/ProposalsGeneral';
import Loading from '../components/common/Loading';
import SearchHome from '../components/home/SearchHome';
import AppSummary from '../components/home/AppSummary';

function home() {

    const [proposals, setProposals] = React.useState([]);
    const [payments, setPayments] = React.useState(null);
    const [users, setUsers] = React.useState(null);

    const init = async () => {
        const { contract } = await initContract();
        contract.getAllProposals().then(setProposals);
        contract.getAllUsers().then(setUsers);
        contract.getAllPayments().then(setPayments)
    }

    React.useEffect(
        () => {
            init()

        }, []
    )
    return (
        <div>
            <Layout>
                <SearchHome data={proposals} payments={payments} users={users}/>
                {proposals.length > 0 ?
                    <div>
                        <ProposalsGeneral proposals={proposals}></ProposalsGeneral>
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
