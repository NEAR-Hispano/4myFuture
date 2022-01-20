import React from 'react'
import { initContract } from '../near';
import { LogOutIcon, LoginIcon } from '../icons';
import { useNear } from '../../hooks/useNear';

function Navbar() {

    const [logged, setLogged] = React.useState(false);
    const [user, setUser] = React.useState('');
    const [nearContext, setNearContext] = useNear();


    const nearApi = async() => {
        const { contract, walletConnection, nearConfig } = await initContract();
        setNearContext({contract, walletConnection, nearConfig})
    }
    
    const logIn = async () => {
        
    
        await nearContext.walletConnection.requestSignIn(
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
            
        }, []
    )


    return (
        <div className='w-full h-16 flex bg-primary-50 text-white pl-8 pr-8 border-0 shadow-2xl'>
            <div className='flex justify-between items-center align-middle w-full h-full'>
                <div>
                    <p className='text-3xl font-bold '>4MyFutureDApp</p>
                </div>
                <div className='flex text-xl font-extralight items-center align-middle h-full'>
                    {!logged ? (
                        <div className='bg-white font-thin h-11 rounded-lg flex items-center align-middle pl-6 pr-6 hover:bg-gray-800 hover:text-white font-sans text-black '>
                            
                            <button onClick={() => { logIn() }} className='flex'>
                                Login
                                <LoginIcon className='w-6 ml-4 flex align-middle justify-center items-center'></LoginIcon>
                            </button>
                        </div>) : (
                        <div className='flex'>
                            <div className='mr-10 font-white flex items-center align-middle justify-center'>
                                {user}
                            </div>
                            <div className='bg-white font-thin h-11 rounded-lg flex items-center align-middle pl-6 pr-6 hover:bg-gray-800 hover:text-white font-sans text-black '>
                                <button onClick={() => { logOut() }}>
                                    <LogOutIcon className='w-6'></LogOutIcon>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar
