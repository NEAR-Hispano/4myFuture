import React from 'react'
import { initContract } from '../near';
import { LogOutIcon, LoginIcon } from '../icons';
import { useNear } from '../../hooks/useNear';
import { useRouter } from 'next/router';

function Navbar() {

    const [logged, setLogged] = React.useState(false);
    const [user, setUser] = React.useState('');
    const [nearContext, setNearContext] = useNear();
    const router = useRouter();

    const nearApi = async () => {
        const { contract, walletConnection, nearConfig } = await initContract();
        setNearContext({ contract, walletConnection, nearConfig })
    }

    const logIn = async () => {

        await nearApi();
        await nearContext.walletConnection.requestSignIn(
            // @ts-ignore: Unreachable code error
            { contractId: nearContext.nearConfig.contractName, methodNames: [nearContext.contract.createUser] }, //contract requesting access
            'Connecting to Contract', //optional name
            null, //optional URL to redirect to if the sign in was successful
            null //optional URL to redirect to if the sign in was NOT successful
        )
        setLogged(true);
    }

    const logOut = async () => {
        await nearContext.walletConnection.signOut();
        setNearContext(null);
        setLogged(false);
        router.push('/')
    }


    const userLogged = async () => {
        const user = await JSON.parse(localStorage.getItem('undefined_wallet_auth_key')) || null
        //const user = await nearContext.walletConnection.getAccountId()
        if (user) {
            setUser(user?.accountId)
            setLogged(true);
        }
    }

    React.useEffect(
        () => {
            nearApi()
            userLogged();

        }, [setUser, user, logged, setLogged]
    )


    return (
        <div className='w-full h-16 flex bg-primary-50 text-white pl-8 pr-8 border-0 shadow-2xl'>
            <div className='flex justify-between items-center align-middle w-full h-full'>
                <div>
                    <a href="/home" className='text-3xl font-bold'> 4MyFutureDApp </a>
                </div>

                <div className='flex text-xl font-extralight items-center align-middle h-full'>
                    {!logged ? (
                        <div className='bg-white font-thin h-11 rounded-lg flex items-center align-middle pl-6 pr-6 hover:bg-gray-800 hover:text-white font-sans text-black '>

                            <button onClick={() => { logIn() }} className='flex'>
                                Login
                                <LoginIcon className='w-6 ml-4 flex align-middle justify-center items-center'></LoginIcon>
                            </button>
                        </div>) : (
                        <div className='flex '>
                            <div className='flex justify-center align-middle items-center mr-2'>
                                <button
                                    className='text-black shadow-xl flex justify-center items-center align-middle text-xl border-0 w-full h-full hover:border-2 hover:border-black bg-green-500 pr-3 pl-3 rounded-tl-xl rounded-bl-xl'
                                    onClick={() => { router.push('/proposals') }}>
                                    Create Proposal
                                </button>
                            </div>
                            <div className='flex bg-white rounded-tr-xl rounded-br-xl'>
                                <div className='mr-5 ml-5 font-white flex items-center align-middle justify-center'>
                                    <button
                                        className='w-full h-full text-black hover:text-green-500'
                                        onClick={() => { router.push('/profile') }}>
                                        {user}
                                    </button>
                                </div>
                                <div className='bg-gray-200 rounded-tr-xl rounded-br-xl font-thin h-11 flex items-center align-middle pl-6 pr-6 hover:bg-gray-800 hover:text-white font-sans text-black '>
                                    <button onClick={() => { logOut() }}>
                                        <LogOutIcon className='w-6'></LogOutIcon>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar
