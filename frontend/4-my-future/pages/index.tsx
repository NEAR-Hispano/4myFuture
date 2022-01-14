import type { NextPage } from 'next'
import Banner from '../components/landing/Banner'
import Carrousel from '../components/landing/Carrousel.jsx'
import Footer from '../components/common/Footer'
import Items from '../components/landing/Items'
import Navbar from '../components/landing/Navbarhome'
import Particle from '../components/common/Particles'
import Team from '../components/landing/Team'
import Work from '../components/landing/Work'
import Layout from '../components/Layout'

const Home: NextPage = () => {
  return (
    <div className='w-screen h-screen flex flex-col font-sans'>
       
  
      <Navbar/>
      <Carrousel/>
      <Banner/>
       <Items/>
       <Work/>
       <Team/>
      <Footer/>
    

    </div>
    
  )
}

export default Home
