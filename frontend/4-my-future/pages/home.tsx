import React from 'react';
import Layout from '../components/Layout';
import { initContract } from '../components/near';
import ProposalsGeneral from '../components/home/ProposalsGeneral';
import Loading from '../components/common/Loading';
import SearchHome from '../components/home/SearchHome';
import {useNear} from '../hooks/useNear';

function home() {

    const [proposals, setProposals] = React.useState([]);
    const [contributions, setContributions] = React.useState([])
    const [payments, setPayments] = React.useState(null);
    const [users, setUsers] = React.useState(null);
    const [ nearContext, setNearContext ]= useNear();
    
    const init = async () => {

        const { contract } = await initContract();
        // @ts-ignore: Unreachable code error
        contract.getAllProposals().then(setProposals);
        // @ts-ignore: Unreachable code error
        contract.getAllUsers().then(setUsers);
        // @ts-ignore: Unreachable code error
        contract.getAllPayments().then(setPayments);
        // @ts-ignore: Unreachable code error
        contract.getAllContributions().then(setContributions);
    }

    React.useEffect(
        () => {
            init()

        }, []
    )
    return (
        <div>
            <Layout>
                <SearchHome data={proposals} payments={payments} users={users} contributions={contributions}/>
                {proposals.length > 0 ?
                    <div className='bg-gray-100'>
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
