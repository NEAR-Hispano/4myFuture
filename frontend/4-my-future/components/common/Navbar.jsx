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
                
                <div>
                    <a href="/contribution" className='text-2xl font-bold'>Contributions </a>
                </div>
                <div>
                    <a href="/proposals" className='text-2xl font-bold'> Create proposal </a>
                </div>
                <div className='flex text-xl font-extralight items-center align-middle h-full'>
                    {!logged ? (
                        <div className='bg-white font-thin h-11 rounded-lg flex items-center align-middle pl-6 pr-6 hover:bg-gray-800 hover:text-white font-sans text-black '>

                            <button onClick={() => { logIn() }} className='flex'>
                                Login
                                <LoginIcon className='w-6 ml-4 flex align-middle justify-center items-center'></LoginIcon>
                            </button>
                        </div>) : (
                        <div className='flex bg-white rounded-xl'>
                            <div className='mr-5 ml-5 font-white flex items-center align-middle justify-center'>
                                <button 
                                    className='w-full h-full text-black hover:text-green-500 '
                                    onClick={()=> {router.push('/profile')}}>
                                        {user}
                                </button>
                            </div>
                            <div className='bg-gray-200 rounded-tr-xl rounded-br-xl font-thin h-11 flex items-center align-middle pl-6 pr-6 hover:bg-gray-800 hover:text-white font-sans text-black '>
                                <button onClick={() => { logOut() }}>
                                    <LogOutIcon className='w-6'></LogOutIcon>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <div class="flex">
                    <div className="relative">
                        <img
                        className="object-cover w-12 h-12 rounded-full"
                        src="https://images.unsplash.com/photo-1520315342629-6ea920342047?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fGNhdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                        alt="Avatar"
                        />
                        <span
                        className="absolute right-0 w-4 h-4 bg-green-600 border-2 border-white rounded-full  top-2"
                        ></span>
                    </div>
                    </div>
            </div>
        </div>
    )
}

export default Navbar
