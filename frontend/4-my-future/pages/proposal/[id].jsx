import React from 'react';
import ProposalDetails from '../../components/proposals/ProposalDetails';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import { initContract } from '../../components/near';
import Loading from '../../components/common/Loading';

function ProposalIdDetails() {
    const router = useRouter();
    const [proposal, setProposal] = React.useState(null);

    const start = async () => {
        const { contract } = await initContract();
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

    React.useEffect(() => {
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
                    <ProposalDetails proposal={proposal} />
                    :
                    <div>
                        <Loading />
                    </div>
                }
                </div>
            </Layout>
        </div>
    )
}

export default ProposalIdDetails
