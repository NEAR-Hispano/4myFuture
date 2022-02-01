import type { NextPage } from "next";
import Layout from "../components/Layout";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <div className="w-screen h-screen flex flex-col font-sans ">
      <Layout>
        <div className="flex flex-col">
          <div className="w-full flex justify-center h-full">
            <div className="w-1/3  rounded-xl mt-10">
              <img src="/landing/near-l.png" className="rounded-xl" alt="" />
            </div>
            <div className="flex items-center justify-center align-middle text-7xl font-thin flex-col">
              <div className="text-center border-0 p-4">
                <p className="text-center">Help </p>
                <span className="text-amber-500 font-bold">Students</span>
                <p className="text-center border-b-2">Reach their Dreams</p>
                <div className="mt-11">
                  <button
                    onClick={() => {router.push('/home')}}
                    className="text-3xl pr-10 pl-10 hover:bg-[#5836d6] bg-[#7B62D9] p-4 rounded-xl shadow-2xl text-white font-thin border-2">
                    Start Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Home;
