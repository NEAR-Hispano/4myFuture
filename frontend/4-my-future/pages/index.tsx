import type { NextPage } from 'next'
import Banner from '../components/Banner'
import Carrousel from '../components/Carrousel'
import Footer from '../components/Footer'
import Items from '../components/Items'
import Navbar from '../components/Navbarhome'
import Particle from '../components/Particles'
import Team from '../components/Team'
import Work from '../components/Work'
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
