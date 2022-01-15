import React from 'react';
import ProposalDetails from '../../components/proposals/ProposalDetails';
import Layout from '../../components/Layout';
import Proposal from '../../models/Proposal';
import { useRouter } from 'next/router';




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
