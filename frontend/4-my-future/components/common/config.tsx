import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { IoMdNotifications } from 'react-icons/io';
import User from '../../models/User';
import { useNear } from '../../hooks/useNear';
import useUser from '../../hooks/useUser';
import { useRouter } from 'next/router';


// const [nearContext, setNearContext] = useNear();
// const [user, setUser] = useUser();
// const router = useRouter();

interface UserDetails {
    user: User;
  }

//   const logOut = async () => {
//     await nearContext.walletConnection.signOut();
//     setNearContext(null);
//     setUser(null);
//     router.push("/");
//   };

function Config({user}: UserDetails) {
   // setUser(user)
    return (
    
        <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full rounded-md px-4 py-2 ">
          <img src={user.picture} width={50} height={50} />
          
          </Menu.Button>
        </div>
  
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
             
           
              {/* <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    License
                  </a>
                )}
              </Menu.Item> */}

              <Menu.Item>
              <a href="#" className="flex items-center px-2 py-2 mx-1">
                <img className="flex-shrink-0 object-cover w-8 h-8 mx-1 rounded-full" src="https://ipfs.infura.io/ipfs/QmPcGmi195SxtGeM7U6TzhAMqq8Xd1hwaYn9iBArbQEiyA" alt="avatar" />
                <p className="mx-2 text-sm text-gray-600"><span className="font-bold">myfuture.testnet</span> donate on your proposal <span className="font-bold text-blue-500">#2</span> artical . 2m</p>
                </a>
              </Menu.Item>
            
              
             
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

    )
}

export default Config
