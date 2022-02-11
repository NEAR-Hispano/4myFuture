import React from 'react';
import Layout from '../../components/Layout';
import Details from '../../components/profile/Details';
import { useNear } from '../../hooks/useNear';

function index() {

    const [nearContext, setNearContext] = useNear();

    return (
        <div>
            <Layout>
                <Details near={nearContext} />
            </Layout>
        </div>
    )
}

export default index
