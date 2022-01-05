import type { NextPage } from 'next'
import Navbar from '../components/Navbar'

const Home: NextPage = () => {
  return (
    <div className='w-screen h-screen flex flex-col font-sans'>
      <Navbar></Navbar>

      <p className='text-2xl font-extralight '>Bienvenidos a 4MyFuture</p>

    </div>
  )
}

export default Home
