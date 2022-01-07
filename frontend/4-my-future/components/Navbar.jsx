import React from 'react'
import * as nearAPI from "near-api-js";
import { CONTRACT_NAME, getConfig } from '../config';
import { initContract } from './near';


function Navbar() {


    const logIn = async () => {
        const { contract, currentUser, nearConfig, walletConnection } = await initContract()
        await walletConnection.requestSignIn(
            {contractId: nearConfig.contractName, methodNames: [contract.createUser]}, //contract requesting access
            'Conecting to Contract', //optional name
            null, //optional URL to redirect to if the sign in was successful
            null //optional URL to redirect to if the sign in was NOT successful
          );
        console.log(contract)
    }



    const verify = async () => {
        const {walletConnection} = await initContract();
        if (walletConnection.isSignedIn()) {
            console.log('Funciona')
        } else {
            console.log('algo mal')
        }
    }   
    return (
        <div className='w-full h-16 flex bg-primary-50 text-white pl-8 pr-8 border-0 shadow-2xl'>
            <div className='flex justify-between items-center align-middle w-full h-full'>
                <div>
                    <p className='text-3xl font-bold '>4MyFutureDApp</p>
                </div>
                <div className='flex text-xl font-extralight items-center align-middle h-full'>
                    <div className='bg-white font-thin h-11 rounded-lg flex items-center align-middle pl-6 pr-6 hover:bg-gray-800 hover:text-white font-sans text-black '>
                        <button onClick={()=>{logIn()}}>
                            Login
                        </button>
                    </div>
                    <div className='bg-white font-thin h-11 rounded-lg flex items-center align-middle pl-6 pr-6 hover:bg-gray-800 hover:text-white font-sans text-black '>
                        <button onClick={()=>{verify()}}>
                            prueba
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
