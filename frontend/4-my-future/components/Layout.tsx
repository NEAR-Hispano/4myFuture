import React, { Children } from 'react';
import Navbar from './common/Navbar';
import Footer from './common/Footer';

interface LayoutProps {
    children: React.ReactNode;
  }

function Layout({children}: LayoutProps) {
    
    React.useEffect(
        () => {

        }, []
    )

    return (
        <div className='w-screen flex flex-col'>
            <Navbar/>
                {children}
            <Footer/>
        </div>
    )
}

export default Layout
