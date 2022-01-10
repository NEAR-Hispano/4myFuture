import type { NextPage } from 'next'
import Layout from '../components/Layout'

const Home: NextPage = () => {
  return (
    <div className='w-screen h-screen flex flex-col font-sans'>
      <Layout>{
        <div>
          Bienvenido a 4Myfuture
        </div>
        }</Layout>
    </div>
  )
}

export default Home
