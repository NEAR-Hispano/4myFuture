import React from 'react';
import Layout from '../components/Layout';
import { initContract } from '../components/near';
import ProposalsGeneral from '../components/ProposalsGeneral';

function home() {

    const [proposals, setProposals] = React.useState([]);
    

    React.useEffect(
        ()=> {

        }, []
    )
    return (
        <div>
            <Layout>
                {/* <ProposalsGeneral></ProposalsGeneral> */}
            </Layout>
        </div>
    )
}

export default home
