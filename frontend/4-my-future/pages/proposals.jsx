import React from "react";
import Navbar from "../components/common/Navbar";
import { initContract } from "../components/near";
import { create } from "ipfs-http-client";
import moment from 'moment';
import Layout from "../components/Layout";
import { toYocto } from "../components/utils";

const client = create("https://ipfs.infura.io:5001/api/v0");

function ProposalsAdd() {
  const [proposalTitle, setProposalName] = React.useState("");
  const [proposalDescription, setProposalDescription] = React.useState("");
  const [proposalDate, setProposalDate] = React.useState("");
  const [proposalPhothos, setProposalPhoto] = React.useState([]);
  const [proposalAmount, setProposalAmount] = React.useState("");
  const [urlArr, setUrlArr] = React.useState();
  const [file, setFile] = React.useState(null);

  const [user, setUser] = React.useState("");
  const [state, setState] = React.useState(true);
  const [visibility, setVisibility] = React.useState("invisible");
  
   


  const userLogged = async () => {
    const user =
      (await JSON.parse(localStorage.getItem("undefined_wallet_auth_key"))) ||
      null;

    if (user) {
      setUser(user?.accountId);
    }
  };

  const handleSubmit = async (e) => {
 
    e.preventDefault();
    try {
      const created = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${created.path}`;
      setUrlArr(url);
      console.log(url);
      setState(false)
    } catch (error) {
      console.log(error.message);
    }
    
  };

  const retrieveFile = (e) => {
    const data = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(Buffer(reader.result));
      console.log("Buffer data: ", Buffer(reader.result));
    };
    e.preventDefault();
  
  };


  const createUser = async () => {
    const { contract } = await initContract();
    contract.createUser();
  };

  const setNewProposal = async () => {
    const { contract } = await initContract();
    // contract.createNewProposal({title: "example 2", description:"asdasd", finishDate: 10, photos: ["asdasd"], amountNeeded:"10"})
  
    const proposal = {
      title: proposalTitle,
      description: proposalDescription,
      initDate: moment().format('L'),
      finishDate: proposalDate,
      photos: [urlArr],
      amountNeeded: proposalAmount
    };

    
    console.log(proposal)
    console.log(proposalTitle)
    console.log(proposalDescription)
    console.log(proposalDate)
    console.log(urlArr)
    console.log(proposalAmount)


    contract.createNewProposal(proposal, 300000000000000, 300000000000000);
    setVisibility("visible")

  


    setProposalName("")
    setProposalDescription("")
    setProposalDate("")
    setProposalAmount("")
    setFile(null)
    setState(true)

    setTimeout(() => {
      setVisibility("invisible")
  }, 3000);
    
  
  };

  React.useEffect(() => {
    userLogged();
   
  }, []);

  return (
    <div>
      <Layout>
      {/* <div className="">
              <div className="bg-gray-100 rounded-b-lg py-12 px-4 lg:px-24 ml-60 mr-60 mt-20">
                <p className="text-center text-sm text-gray-500 font-light">
                  {" "}
                  Create Proposal{" "}
                </p>

                <div className="relative">
                  <p>Title:</p>
                  <input
                    className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                    type="text"
                    placeholder="Proposal title"
                    onChange={(e) => setProposalName(e.target.value)}
                  />
                </div>

                <div className="relative mt-3">
                  <p>Description:</p>
                  <textarea
                    rows="4"
                    cols="100"
                    type="text"
                    className="bg-gray-100 rounded border border-gray-200 py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                    placeholder="Enter your description"
                    onChange={(e) => setProposalDescription(e.target.value)}
                  ></textarea>
                </div>

                <div className="relative mt-3">
                  <p>Time:</p>
                  <select
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-state"
                    onChange={(e) => setProposalDate(e.target.value)}
                  >
                    <option>- </option>
                    <option value={moment().add(1, 'months').calendar()}>1 mont</option>
                    <option value={moment().add(3, 'months').calendar()}>3 monts</option>
                    <option value={moment().add(6, 'months').calendar()}>6 monts</option>
                    <option value={moment().add(9, 'months').calendar()}>9 monts</option>
                    <option value={moment().add(1, 'years').calendar()}>1 year</option>
                  </select>
                </div>
                <div className="relative mt-3">
                  <p>Amount in NEARs:</p>
                  <input
                    className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                    type="number"
                    placeholder="Amount required"
                    onChange={(e) => setProposalAmount(e.target.value)}
                  />
                </div>

                <div className="relative mt-3">
                  <p>Add your picture:</p>
                
                </div>

                <div className="flex justify-center">
                  <div className="mb-3 w-96 text-center">
                    
                    <input
                      className="form-control
                        block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      type="file"
                      id="formFile"
                      onChange={retrieveFile}
                    />
                    <button className="uppercase py-2 px-4 rounded bg-blue-500 text-cyan-50 hover:bg-blue-300" onClick={handleSubmit}>
                Upload file
              </button>
                  </div>
                
                </div>

                <div className="flex items-center justify-center mt-8">
                  {" "}
                  <button
                    className="text-white py-2 px-4 uppercase rounded bg-green-500 hover:bg-green-200 hover:text-green-500 shadow disabled:bg-green-300 disabled:hover:shadow-none disabled:hover:text-white disabled:hover:-translate-y-0 hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 "
                    onClick={setNewProposal} disabled={state}

                  >
                    {" "}
                    Create Proposal{" "}
                  </button>{" "}
              
                </div>
              </div>
            </div> */}

            

    <div className="bg-white rounded-lg shadow sm:max-w-md sm:w-full sm:mx-auto sm:overflow-hidden">
    <div className="px-4 py-8 sm:px-10">
        <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300">
                </div>
            </div>
            <div className="relative flex justify-center text-sm leading-5">
                <span className="px-2 text-gray-500 bg-white">
                   Create proposal
                </span>
            </div>
        </div>
        <div className="mt-6">
            <div className="w-full space-y-6">
                <div className="w-full">
                    <div className=" relative ">
                        <input type="text" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Title"
                         onChange={(e) => setProposalName(e.target.value)}/>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <label className="text-gray-700">
                            <textarea className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" id="comment" placeholder="Enter your description" name="comment" rows="5" cols="40"
                              onChange={(e) => setProposalDescription(e.target.value)}>
                            </textarea>
                        </label>
                    </div>

                    
                <div className="relative mt-3">
                  <p>Time:</p>
                  <select
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-state"
                    onChange={(e) => setProposalDate(e.target.value)}
                  >
                    <option>- </option>
                    <option value={moment().add(1, 'months').calendar()}>1 mont</option>
                    <option value={moment().add(3, 'months').calendar()}>3 monts</option>
                    <option value={moment().add(6, 'months').calendar()}>6 monts</option>
                    <option value={moment().add(9, 'months').calendar()}>9 monts</option>
                    <option value={moment().add(1, 'years').calendar()}>1 year</option>
                  </select>
                </div>
                    <div className="w-full">
                        <div className=" relative ">
                            <input type="number" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Amount in NEAR"
                              onChange={(e) => setProposalAmount(e.target.value)}/>
                            </div>
                        </div>
                        <div className="relative mt-3">
                  <p>Add your picture:</p>
                
                </div>

                <div className="flex justify-center">
                  <div className="mb-3 w-96 text-center">
                    
                    <input
                      className="
                        block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      type="file"
                     
                      onChange={retrieveFile}
                    />
                    <button className="uppercase py-2 px-4 rounded bg-blue-500 text-cyan-50 hover:bg-blue-300" onClick={handleSubmit}>
                Upload file
              </button>
                  </div>
                
                </div>
                            <div>
                                <span className="block w-full rounded-md shadow-sm">
                                    {/* <button className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg disabled:bg-indigo-300 " 
                                    onClick={setNewProposal} disabled={state}>
                                    Create Proposal
                                    </button> */}

                                    <button
                    className="text-white py-2 px-4 uppercase rounded w-full bg-indigo-500 hover:bg-indigo-200 hover:text-indigo-500 shadow disabled:bg-indigo-300 disabled:hover:shadow-none disabled:hover:text-white disabled:hover:-translate-y-0 hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 "
                    onClick={setNewProposal} disabled={state}

                  >
                    {" "}
                    Create Proposal{" "}
                  </button>{" "}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                
            <div className={`bg-green-200 border-green-600 text-green-600 border-l-4 p-4 ${visibility}`} role="alert" >
                <p className="font-bold">
                    Success
                </p>
                <p>
                    Congratulations, you are the best player.
                </p>
            </div>
             
            </div>


      </Layout>

      {proposalTitle}
      {proposalDescription}
      {proposalDate}
      {proposalAmount}
      {urlArr}
      
{/*       
      <button
              className="text-white py-2 px-4 uppercase rounded bg-green-500 hover:bg-green-200 hover:text-green-500 shadow disabled:bg-green-300 disabled:hover:shadow-none disabled:hover:text-white disabled:hover:-translate-y-0 hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 "
              onClick={createUser} 

            >
              {" "}
              Create User{" "}
            </button> */}
            
             
    </div>
  );
}

export default ProposalsAdd;
