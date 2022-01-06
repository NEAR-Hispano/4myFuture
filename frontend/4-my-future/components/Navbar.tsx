import React from 'react'

function Navbar() {
    const [ user, setUser ] = React.useState('');
    return (
        <div className='w-full h-16 flex bg-primary-50 text-white pl-8 pr-8 border-0 shadow-2xl'>
            <div className='flex justify-between items-center align-middle w-full h-full'>
                <div>
                    <p className='text-3xl font-bold '>4MyFutureDApp</p>
                </div>
                <div className='flex text-xl font-extralight items-center align-middle h-full'>
                    {/* <div className='p-6'>
                        <button>
                            Ver proposals
                        </button>
                    </div>
                    <div className='p-6'>
                        <button>
                            Crear proposals
                        </button>
                    </div> */}
                    <div className='bg-white font-thin h-11 rounded-lg flex items-center align-middle pl-6 pr-6 hover:bg-gray-800 hover:text-white font-sans text-black '>
                        <button>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
