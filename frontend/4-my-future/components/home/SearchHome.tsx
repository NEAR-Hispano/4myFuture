import React from 'react'
import Proposal from '../../models/Proposal';
import SearchBar from './SearchBar';

interface SearchHomeProps {
    data?: Proposal[]
}

function SearchHome({data}: SearchHomeProps) {
    return (
        <div className='flex flex-col w-full items-center justify-center align-middle h-1/2 border-b-2 pt-20 pb-20 mb-11 bg-gray-200 shadow-xl'>
                <div className='text-7xl font-sans font-thin'>
                    Help <span className='text-green-400 font-semibold'>students</span> to reach their dreams 
                </div>
            <div className='flex w-full justify-center h-96 items-center align-middle'>
                <div className=' w-2/5 flex'>
                    <SearchBar data={data}></SearchBar>
                    
                </div>
                <div className='h-36 ml-32'>
                    <img src="images/NEAR.png" alt="" className='w-full h-full'/>
                </div>
            </div>
        </div>
    )
}

export default SearchHome
