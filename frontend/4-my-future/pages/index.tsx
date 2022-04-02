import React from "react";
import type { NextPage } from "next";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { initContract } from "../components/near";
import Contribution from "../models/Contribution";
import User from "../models/User";
import Proposal from "../models/Proposal";
import { useNear } from "../hooks/useNear";
import { toNEAR } from "../components/utils";
import moment from "moment";

const Home: NextPage = () => {
  const [contributions, setContributions] = React.useState<Array<Contribution>>(
    []
  );
  const [users, setUsers] = React.useState<Array<User>>([]);
  const [proposals, setProposals] = React.useState<Array<Proposal>>([]);
  const [topContributions, setTopContributions] = React.useState<
    Array<Contribution>
  >([]);
  const [topContributors, setTopContributors] = React.useState<Array<User>>([]);

  const [nearContext] = useNear();

  const showStatistics = async () => {
    // @ts-ignore: Unreachable code error
    var contributionList = await nearContext.contract.getAllContributions();
    // @ts-ignore: Unreachable code error
    var proposalList = await nearContext.contract.getAllProposals();
    // @ts-ignore: Unreachable code error
    var userList = await nearContext.contract.getAllUsers();

    setUsers(userList);
    setProposals(proposalList);
    setContributions(contributionList);
  };

  React.useEffect(() => {
  
    if (nearContext) {
      showStatistics();
    }
    return;
  }, [nearContext]);

  const router = useRouter();
  return (
    <div className=" flex flex-col font-sans ">
      <Layout>
        <div className="flex flex-col">
          <div className="w-full flex justify-center h-full">
            <div className="w-1/3  rounded-xl mt-10">
              <img src="/landing/near-l.png" className="rounded-xl" alt="" />
            </div>
            <div className="flex items-center justify-center align-middle text-5xl font-thin flex-col">
              <div className="text-center border-0 p-4">
                <p className="text-center">Help </p>
                <span className="text-[#7B62D9] font-bold">Students</span>
                <p className="text-center border-b-2">Reach their Dreams</p>
                <div className="mt-11">
                  <button
                    onClick={() => {
                      router.push("/home");
                    }}
                    className="text-2xl pr-9 pl-9 hover:bg-[#5836d6] bg-[#7B62D9] p-2 rounded-xl shadow-2xl text-white font-thin border-2"
                  >
                    Start Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          <section>
            <div className="p-8 flex justify-center bg-[#7B62D9] text-white shadow-2xl">
              <div className="flex justify-between p-6">
                <div className="w-full flex lg:w-1/2 justify-center align-middle items-center px-8">
                  <div className="mb-12 lg:mb-0 pb-12 lg:pb-0 border-b lg:border-b-0 flex flex-col w-full h-full justify-center items-center align-middle">
                    <div className="mb-4 text-center text-3xl font-bold font-heading ">
                      4MyFuture is an app which students can find an opportunity to fund their academic
                      goals
                    </div>
                    <div className="text-black text-center text-lg leading-loose">
                      Crowdfunding dapp for students for fund their professional
                      training.
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-col justify-center align-middle items-center lg:w-1/2 px-8">
                  <ul className="space-y-12">
                    <li className="flex -mx-4">
                      <div className="px-4 flex justify-center items-center align-middle">
                        <span className="flex w-14 h-14 mx-auto items-center justify-center text-xl font-bold font-heading rounded-full bg-white text-blue-600">
                          1
                        </span>
                      </div>
                      <div className="px-4 ">
                        <h3 className="my-4 text-2xl font-semibold">
                          Easy to use
                        </h3>
                        <p className="text-gray-100 text-xl leading-loose">
                          Create proposals, Contribute and Receive funds.
                        </p>
                      </div>
                    </li>
                    <li className="flex -mx-4">
                      <div className="px-4 flex justify-center items-center align-middle">
                        <span className="flex w-14 h-14 mx-auto items-center justify-center text-xl font-bold font-heading rounded-full bg-white text-blue-600">
                          2
                        </span>
                      </div>
                      <div className="px-4">
                        <h3 className="my-4 text-2xl font-semibold">
                          Transparency
                        </h3>
                        <p className="text-gray-100 text-xl leading-loose">
                          Option to View and Audit Transactions
                        </p>
                      </div>
                    </li>
                    <li className="flex -mx-4">
                      <div className="px-4 flex justify-center items-center align-middle">
                        <span className="flex w-14 h-14 mx-auto items-center justify-center text-xl font-bold font-heading rounded-full bg-white text-blue-600">
                          3
                        </span>
                      </div>
                      <div className="px-4">
                        <h3 className="my-4 text-2xl font-semibold">
                          Contributors are rewarded
                        </h3>
                        <p className="text-gray-100 text-xl leading-loose">
                          NFTs and soon with native platform tokens.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <div className="flex px-4 py-12 sm:py-16 sm:px-6 lg:px-8 lg:py-20 w-full justify-center align-middle border-b-2 shadow-lg">
            <div className="flex flex-col p-6 h-full w-1/2 ">
              <div className="max-w-4xl text-center mx-auto ">
                <h2 className="text-3xl font-extrabold leading-9 ">
                  Platform Summary
                </h2>
                <p className="mt-3 text-xl leading-7 sm:mt-4 ">
                  to the moon 🚀
                </p>
              </div>
              <div className="mt-24 justify-center items-center">
                {proposals && contributions && users ? (
                  <div className="flex flex-col pl-14">
                    <div className="flex align-middle items-center pb-2 border-b-2">
                      <p className="text-3xl font-extrabold leading-none text-[#7B62D9]">
                        {proposals.length}
                      </p>
                      <p className="text-xl leading-6 ml-5  ">
                        Proposals requesting funds
                      </p>
                    </div>
                    <div className="mt-12 flex align-middle items-center pb-2 border-b-2">
                      <p className="text-3xl font-extrabold leading-none text-[#7B62D9]">
                        {contributions.length}
                      </p>
                      <p className="text-xl ml-5 leading-6 ">
                        Contributions made to students
                      </p>
                    </div>
                    <div className="mt-14 flex align-middle items-center pb-2 border-b-2">
                      <p className="text-3xl font-extrabold leading-none text-[#7B62D9]">
                        {users.length}
                      </p>
                      <p className="text-xl ml-5 leading-6 ">
                        Users registered over time
                      </p>
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
            <div className="w-1/2  flex justify-center align-middle items-center">
              <div className="w-full">
                <img src="/landing/launch-l.png" alt="" />
              </div>
            </div>
          </div>

          <div className="flex justify-center border-b-2 shadow-xl  pb-8">
            <div className=" w-1/2 flex justify-center align-middle items-center">
              <div className="w-full">
                <img src="/landing/education-l.png" alt="" />
              </div>
            </div>
            <div className="container flex flex-col mx-auto w-1/2 p-6 items-center justify-center mt-5">
              <div className="px-4 flex justify-center py-5 sm:px-6 w-full mb-2 rounded-md text-center">
                <h3 className="text-3xl p-6 leading-6 font-extrabold text-gray-900">
                  Top Contributions
                  <span className="font-normal">🏆</span>
                </h3>
              </div>
              {contributions ? (
                contributions
                  .slice()
                  .sort((a, b) => b.amount - a.amount)
                  .slice(0, 3)
                  .map((contribution, index) => (
                    <div className="flex">
                      <div className="flex mr-11 mt-12 bg-[#7B62D9] justify-center  border-2 rounded-full w-16 h-16 items-center align-middle">
                        <div className="text-4xl font-extrabold text-white">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex flex-col border-2 p-3 mt-6 shadow-lg shadow-[#7B62D9]">
                        <div className="flex">
                          <p className="mr-2 text-lg">Funded:</p>
                          <span className="text-lg text-[#7B62D9] font-extrabold">
                            {toNEAR(contribution.amount.toString())}
                          </span>
                          <span className="text-lg font-bold ml-2">NEARs</span>
                        </div>
                        <div className=" flex">
                          <p className="mr-2 text-lg text-bold">Reicipent:</p>
                          <span className="text-lg text-[#7B62D9] font-extrabold">
                            {contribution.userRefound}
                          </span>
                        </div>
                        <div className=" flex">
                          <p className="mr-2 text-lg text-bold">Date:</p>
                          <span className="text-lg text-[#7B62D9] font-extrabold">
                            {contribution.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <div></div>
              )}
            </div>
          </div>

          <div className="p-7 mt-20 m-auto text-black shadow-lg">
            <div className="flex justify-center">
              <p className="text-center text-4xl font-extrabold text-gray-800">
                Professional team
              </p>
              <span className="text-4xl">💻</span>
            </div>
            <p className="text-center mb-32 text-xl font-normal text-black"></p>
            <div className="flex items-center space-y-24 md:space-y-0 flex-col md:flex-row justify evenly ">
              <div className="p-4 relative">
                <div className="text-center mb-4 absolute -top-16 right-1/2 transform translate-x-1/2">
                  <a href="#" className="block relative">
                    <img
                      alt="profil"
                      src="/blad.jpg"
                      className="object-contain rounded-lg h-40 w-full  border-2 border-white dark:border-gray-800"
                    />
                  </a>
                </div>
                <div className="bg-white  rounded-lg  px-8 py-4 pt-24 shadow-2xl ">
                  <div className="text-center">
                    <p className="text-2xl text-gray-800 ">
                      Bladimir J. Aponte
                    </p>
                    <p className="text-xl text-black  font-light">Developer</p>
                    <p className="text-md text-black w-60  mx-auto py-4 font-light">
                      Co-creator of 4myfuture, Systems Engineering student,
                      mobile application developer, Dapps developer.
                    </p>
                  </div>
                  <div className="pt-8 flex border-t border-gray-200 w-40 mx-auto text-black items-center justify-between">
                    <a href="https://twitter.com/Bjavieraps">
                      <svg
                        width="30"
                        height="30"
                        fill="currentColor"
                        className="text-xl hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1684 408q-67 98-162 167 1 14 1 42 0 130-38 259.5t-115.5 248.5-184.5 210.5-258 146-323 54.5q-271 0-496-145 35 4 78 4 225 0 401-138-105-2-188-64.5t-114-159.5q33 5 61 5 43 0 85-11-112-23-185.5-111.5t-73.5-205.5v-4q68 38 146 41-66-44-105-115t-39-154q0-88 44-163 121 149 294.5 238.5t371.5 99.5q-8-38-8-74 0-134 94.5-228.5t228.5-94.5q140 0 236 102 109-21 205-78-37 115-142 178 93-10 186-50z"></path>
                      </svg>
                    </a>
                    <a href="https://github.com/blad1mir">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="currentColor"
                        className="text-xl hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
                        viewBox="0 0 1792 1792"
                      >
                        <path d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z"></path>
                      </svg>
                    </a>
                    <a href="https://www.linkedin.com/in/bladimir-aponte-sarria/">
                      <svg
                        width="30"
                        height="30"
                        fill="currentColor"
                        className="text-xl hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M477 625v991h-330v-991h330zm21-306q1 73-50.5 122t-135.5 49h-2q-82 0-132-49t-50-122q0-74 51.5-122.5t134.5-48.5 133 48.5 51 122.5zm1166 729v568h-329v-530q0-105-40.5-164.5t-126.5-59.5q-63 0-105.5 34.5t-63.5 85.5q-11 30-11 81v553h-329q2-399 2-647t-1-296l-1-48h329v144h-2q20-32 41-56t56.5-52 87-43.5 114.5-15.5q171 0 275 113.5t104 332.5z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-4 relative">
                <div className="text-center mb-4 absolute -top-16 right-1/2 transform translate-x-1/2">
                  <a href="#" className="block relative">
                    <img
                      alt="profil"
                      src="/ed.jpg"
                      className="w-full object-contain rounded-lg h-40  border-2 border-white dark:border-gray-800"
                    />
                  </a>
                </div>
                <div className="bg-white  rounded-lg px-8 py-4 pt-24 shadow-2xl">
                  <div className="text-center">
                    <p className="text-2xl text-gray-800 ">Edward Vergel</p>
                    <p className="text-xl text-black  font-light">Developer</p>
                    <p className="text-md text-black w-60  mx-auto py-4 font-light">
                      Co-creator of 4myfuture, Systems Engineering student,
                      mobile application developer, Dapps developer.
                    </p>
                  </div>
                  <div className="pt-8 flex border-t border-gray-200 w-40 mx-auto text-black items-center justify-between">
                    {/* <a href="#">
                      <svg
                        width="30"
                        height="30"
                        fill="currentColor"
                        className="text-xl hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1684 408q-67 98-162 167 1 14 1 42 0 130-38 259.5t-115.5 248.5-184.5 210.5-258 146-323 54.5q-271 0-496-145 35 4 78 4 225 0 401-138-105-2-188-64.5t-114-159.5q33 5 61 5 43 0 85-11-112-23-185.5-111.5t-73.5-205.5v-4q68 38 146 41-66-44-105-115t-39-154q0-88 44-163 121 149 294.5 238.5t371.5 99.5q-8-38-8-74 0-134 94.5-228.5t228.5-94.5q140 0 236 102 109-21 205-78-37 115-142 178 93-10 186-50z"></path>
                      </svg>
                    </a> */}
                    <a href="https://github.com/EdwardsVO">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="currentColor"
                        className="text-xl hover:text-gray-800 dark:hover:text-gray-500 transition-colors duration-200"
                        viewBox="0 0 1792 1792"
                      >
                        <path d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z"></path>
                      </svg>
                    </a>
                    <a href="https://www.linkedin.com/in/edward-vergel-829797219/">
                      <svg
                        width="30"
                        height="30"
                        fill="currentColor"
                        className="text-xl hover:text-gray-800 dark:hover:text-gray-500 transition-colors duration-200"
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M477 625v991h-330v-991h330zm21-306q1 73-50.5 122t-135.5 49h-2q-82 0-132-49t-50-122q0-74 51.5-122.5t134.5-48.5 133 48.5 51 122.5zm1166 729v568h-329v-530q0-105-40.5-164.5t-126.5-59.5q-63 0-105.5 34.5t-63.5 85.5q-11 30-11 81v553h-329q2-399 2-647t-1-296l-1-48h329v144h-2q20-32 41-56t56.5-52 87-43.5 114.5-15.5q171 0 275 113.5t104 332.5z"></path>
                      </svg>
                    </a>
                  </div>
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
