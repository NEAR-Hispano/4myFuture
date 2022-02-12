import React from 'react';
import Layout from '../../components/Layout';
import ProfileDetails from '../../components/profile/ProfileDetails';
import { useNear } from '../../hooks/useNear';

function Index() {

    const [nearContext, setNearContext] = useNear();

    return (
        <div>
            <Layout>
                <ProfileDetails near={nearContext} />
            </Layout>
        </div>
    )
}

export default Index
