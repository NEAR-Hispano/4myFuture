import React from 'react';

import Layout from '../../components/Layout';
import Proposal from '../../models/Proposal';
import { useRouter } from 'next/router';
import ProposalDetails from '../../components/proposals/ProposalDetails';




function ProposalIdDetails() {
    const router = useRouter();

    React.useEffect(() => {

    }, [])

    return (
        <div>
            <Layout>
                <ProposalDetails />
            </Layout>
        </div>
    )
}

export default ProposalIdDetails
