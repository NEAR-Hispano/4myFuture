import React from "react";
import Navbar from "../components/common/Navbar";
import { initContract } from "../components/near";
import { create } from "ipfs-http-client";

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
      finishDate: parseInt(proposalDate),
      photos: [urlArr],
      amountNeeded: proposalAmount
    };
    console.log(proposal)
    console.log(proposalTitle)
    console.log(proposalDescription)
    console.log(proposalDate)
    console.log(urlArr)
    console.log(proposalAmount)


    contract.createNewProposal(proposal);
  
  };

  React.useEffect(() => {
    userLogged();
   
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col font-sans">
      <Navbar />
      <div className="">
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
            <input
              className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
              type="area"
              placeholder="Please explain why you need that money"
              onChange={(e) => setProposalDescription(e.target.value)}
            />
          </div>

          <div className="relative mt-3">
            <p>Time:</p>
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state"
              onChange={(e) => setProposalDate(e.target.value)}
            >
              <option>- </option>
              <option value={30}>1 mont</option>
              <option value={90}>3 monts</option>
              <option value={180}>6 monts</option>
              <option value={270}>9 monts</option>
              <option value={365}>1 year</option>
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
      </div>
    </div>
  );
}

export default ProposalsAdd;
