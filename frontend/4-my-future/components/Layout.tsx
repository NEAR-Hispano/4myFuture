import React, { Children } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
    children: React.ReactNode;
  }

function Layout({children}: LayoutProps) {
    
    React.useEffect(
        () => {
            
        }, []
    )

    return (
        <div className='w-screen h-screen flex flex-col'>
            <Navbar/>
                {children}
            <Footer/>
        </div>
    )
}

export default Layout
