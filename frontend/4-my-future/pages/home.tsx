import React from 'react';
import Layout from '../components/Layout';
import { initContract } from '../components/near';
import ProposalsGeneral from '../components/home/ProposalsGeneral';
import Loading from '../components/common/Loading';
import SearchHome from '../components/home/SearchHome';
import { useNear } from '../hooks/useNear';
import Navbar from '../components/common/Navbar';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

function home() {

    const [proposals, setProposals] = React.useState([]);
    const [contribution, setContribution] = React.useState(null);
    const [users, setUsers] = React.useState(null);
    const [nearContext, setNearContext] = useNear();
    const [type, setProposaltype] = React.useState("3"); 
    const [Ordergoal, setProposalgoal] = React.useState("-");
    const init = async () => {

        const { contract } = await initContract();
        // @ts-ignore: Unreachable code error
        contract.get_proposals().then(setProposals);
        // @ts-ignore: Unreachable code error
        contract.get_users().then(setUsers);
        // @ts-ignore: Unreachable code error
        // contract.getAllPayments().then(setPayments);
        // @ts-ignore: Unreachable code error
        contract.get_contributions().then(setContribution);
    }

    React.useEffect(
        () => {
            init()

        }, []
    )
    return (
        <div className=" min-h-screen">
            <Layout>

                <SearchHome data={proposals} contribution={contribution} users={users} />
                <div className='m-auto w-4/5 "grid grid-cols-2 flex mb-2'>
                  
                    <div className='mr-2'>
                        Proposal status:
                        <select
                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-1 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-state"
                            onChange={(e) => setProposaltype(e.target.value)}
                        >


                            <option value={"3"}>In progress </option>
                            <option value={"0"}>Finished</option>

                        </select>
                    </div>
                    <div className='mr-2'>
                    Proposal goal:
                        <select
                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-1 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-state"
                           onChange={(e) => setProposalgoal(e.target.value)}
                        >
                            <option>- </option>
                            <option value={"Start a short course"}>Start a short course</option>
                            <option value={"Complete a short course"}>Complete a short course</option>
                            <option value={"Start a long course"}>Start a long course</option>
                            <option value={"Complete a long course"}>Complete a long course</option>
                            <option value={"Start high school"}>Start high school </option>
                            <option value={"Finish high school"}>Finish high school </option>
                            <option value={"Start college "}>Start college </option>
                            <option value={"Finish college "}>Finish college </option>
                            <option value={"Start a master's degree"}>Start a master's degree </option>
                            <option value={"Finish a master's degree"}>Finish a master's degree </option>
                        </select>
                    </div>
                </div>

                {proposals.length > 0 ?

                    <div className=''>

                        <ProposalsGeneral proposals={proposals} type={type} Ordergoal={Ordergoal}/>
                    </div>
                    :
                    <div>
                        <Loading></Loading>
                    </div>
                }
            </Layout>
        </div>
    )
}

export default home
