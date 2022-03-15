import React from "react";
import Navbar from "../components/common/Navbar";
import { initContract } from "../components/near";
import { create } from "ipfs-http-client";
import moment from "moment";
import Layout from "../components/Layout";
import { toYocto } from "../components/utils";

const client = create("https://ipfs.infura.io:5001/api/v0");

function ProposalsAdd() {
  const [proposalTitle, setProposalName] = React.useState("");
  const [proposalGoal, setProposalgoal] = React.useState("");
  const [proposalDescription, setProposalDescription] = React.useState("");
  const [proposalLinkInstitution, setProposalLinkInstitution] = React.useState("");
  const [proposalLinkPensum, setProposalLinkPensum] = React.useState("");
  const [proposalActivityStart, setProposalActivityStart] = React.useState("");
  const [proposalActivityEnd, setProposalActivityEnd] = React.useState("");
  const [proposalDate, setProposalDate] = React.useState("");
  const [proposalPhothos, setProposalPhoto] = React.useState([]);
  const [proposalAmount, setProposalAmount] = React.useState("");
  const [amounNears, setAmountNears] = React.useState(0);
  const [urlArr, setUrlArr] = React.useState();
  const [file, setFile] = React.useState(null);

  const [user, setUser] = React.useState("");
  const [state, setState] = React.useState(true);
  const [visibility, setVisibility] = React.useState("invisible");
  const [visibilityAlert, setVisibilityAlert] = React.useState("invisible");
  const [check, setCheck] = React.useState("");


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
      setState(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const retrieveFile = (e) => {
    setVisibilityAlert("visible")
    const data = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(Buffer(reader.result));
      console.log("Buffer data: ", Buffer(reader.result));
    };
    e.preventDefault();
  };


  const valiteInputs = (e) => {

  };

  const setNewProposal = async () => {
    const { contract } = await initContract();
    // contract.createNewProposal({title: "example 2", description:"asdasd", finishDate: 10, photos: ["asdasd"], amountNeeded:"10"})

    const proposal = {
      title: proposalTitle,
      goal: proposalGoal,
      description: proposalDescription,
      initDate: moment().format("L"),
      finishDate: proposalDate,
      photos: [urlArr],
      amountNeeded: proposalAmount,
      linkInstitution: proposalLinkInstitution,
      linkPensum: proposalLinkPensum,
      activityStart: moment(proposalActivityStart).format("L"),
      activityEnd: moment(proposalActivityEnd).format("L"),
    };

    console.log(proposal);
    console.log(proposalTitle);
    console.log(proposalDescription);
    console.log(proposalDate);
    console.log(urlArr);
    console.log(proposalAmount);

    contract
      .createNewProposal(proposal, 300000000000000, 300000000000000)
      .then(() => {
        router.push("/home");
      });
    setVisibility("visible");

    setProposalName("");
    setProposalDescription("");
    setProposalDate("");
    setProposalAmount("");
    setFile(null);
    setState(true);

    setTimeout(() => {
      setVisibility("invisible");
    }, 3000);
  };

  const coingeckoUrl = (date) => {
    return `https://api.coingecko.com/api/v3/coins/near/history?date=${date}&localization=false`;
  };

  const coingeckoFetch = async () => {
    var dat = moment().format('DD-MM-YYYY');

    fetch(coingeckoUrl(dat)).then((response) =>
      response.json().then((jsonData) => {
        setAmountNears(parseFloat(jsonData.market_data.current_price.usd).toFixed(2))
        console.log(parseFloat(jsonData.market_data.current_price.usd).toFixed(2));
      })
    );
  };

  const changePrice = async (val) => {

    if (val) {
      console.log(parseFloat(val) / amounNears)
      setProposalAmount((parseFloat(val) / amounNears).toFixed(2))
    } else {
      setProposalAmount(0)
    }

  };

  React.useEffect(() => {
    userLogged();
    coingeckoFetch()



  }, []);

  return (
    <div>
      <Layout>
        {/* <div className="bg-white rounded-lg sm:max-w-md sm:w-full sm:mx-auto sm:overflow-hidden mt-10">
          <div className="px-1 py-1 sm:px-1">
            <div className="relative mt-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
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
                    <input
                      type="text"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Proposal title"
                      onChange={(e) => setProposalName(e.target.value)}
                    />
                  </div>
                
                  <div className="relative mt-3">
                    <p>Goal:</p>
                    <select
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-state"
                      onChange={(e) => setProposalgoal(e.target.value)}
                    >
                      <option>- </option>
                      <option value={"Start a short course"}>Start a short course</option>
                      <option value={"Complete a short course"}>Complete a short course</option>
                      <option value={"Start a long course"}>Start a long course</option>
                      <option value={"Complete a long course"}>Complete a long course</option>
                      <option value={"Start high school"}>Start high school </option>
                      <option value={"Finish high school"}>Finish high school </option>
                      <option value={"Start college "}>Start college </option>
                      <option value={"Finish college "}>Finish college </option>
                      <option value={"Start a master's degree"}>Start a master's degree </option>
                      <option value={"Finish a master's degree"}>Finish a master's degree </option>
                    </select>
                  </div>
                  <div className=" relative ">
                    <input
                      type="text"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Link to the institute's website"
                      onChange={(e) => setProposalLinkInstitution(e.target.value)}
                    />
                  </div>
                  <div className=" relative ">
                    <br></br>
                    <input
                      type="text"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Link to pensum"
                      onChange={(e) => setProposalLinkPensum(e.target.value)}
                    />
                  </div>
                </div>
               
                <p>Time of beginning and end of the academic activity:</p> 
                <div className="flex items-center">
                
              
                  <div className="relative">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  
                    </div>
                    <input
                      name="start"
                      type="date"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                      placeholder="Select date start"
                      min={moment().format('YYYY-MM-DD')} 
                      onChange={(e) => setProposalActivityStart(e.target.value)}
                      
                     
                    />
                  </div>
                  <span className="mx-4 text-gray-500">to</span>
                  <div className="relative">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    
                    </div>
                    <input
                      name="end"
                      type="date"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-blue-500 block w-full pl-10 p-2.5"
                      placeholder="Select date end"
                      min={moment().format('YYYY-MM-DD')} 
                      onChange={(e) => setProposalActivityEnd(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="text-gray-700">
                    <textarea
                      className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      id="comment"
                      placeholder="Explain why you need the funds "
                      name="comment"
                      rows="5"
                      cols="40"
                      onChange={(e) => setProposalDescription(e.target.value)}
                    ></textarea>
                  </label>
                </div>

                <div className="relative mt-3">
                  <p>Proposal duration:</p>
                  <select
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-state"
                    onChange={(e) => setProposalDate(e.target.value)}
                  >
                    <option>- </option>
                    <option value={moment().add(1, "months").calendar()}>
                      1 mont
                    </option>
                    <option value={moment().add(3, "months").calendar()}>
                      3 monts
                    </option>
                    <option value={moment().add(6, "months").calendar()}>
                      6 monts
                    </option>
                    <option value={moment().add(9, "months").calendar()}>
                      9 monts
                    </option>
                    <option value={moment().add(1, "years").calendar()}>
                      1 year
                    </option>
                  </select>
                </div>
                <div className="w-full">
                  <div className=" relative ">
                    <input
                      type="number"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Amount required in Dollars"
                      onChange={(e) => changePrice(e.target.value)}
                    />
                  </div>
                  <br></br>
                  <p>Amount in NEARs  {proposalAmount} NEAR </p> 
                  <p>1 NEAR = ${amounNears} </p>
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
                    <button
                      className="uppercase py-2 px-4 rounded bg-blue-500 text-cyan-50 hover:bg-blue-300"
                      onClick={handleSubmit}
                    >
                      Upload file
                    </button>
                  </div>
                </div>
                <div>
                  <span className="block w-full rounded-md shadow-sm">
                  
                    <button
                      className="text-white py-2 px-4 uppercase rounded w-full bg-indigo-500 hover:bg-indigo-200 hover:text-indigo-500 shadow disabled:bg-indigo-300 disabled:hover:shadow-none disabled:hover:text-white disabled:hover:-translate-y-0 hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 "
                      onClick={setNewProposal}
                      disabled={state}
                    >
                      {" "}
                      Create Proposal{" "}
                    </button>{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`bg-green-200 border-green-600 text-green-600 border-l-4 p-4 ${visibility}`}
            role="alert"
          >
            <p className="font-bold">Success</p>
            <p>Congratulations, you are the best player.</p>
          </div>
        </div> */}

        <div className="flex items-center justify-center min-h-screen">
          <div className="w-full max-w-lg px-10 py-8 mx-auto bg-white rounded-lg shadow-xl">
            <div className="max-w-md mx-auto space-y-6">




              <h2 className="text-2xl font-bold ">Create proposal</h2>
              <p className="my-4 opacity-70">Enter the corresponding data to create your proposal. Use real data to provide credibility with contributors.</p>
              <div className="">
                <label className="uppercase text-sm font-bold opacity-70">Porposal title</label>
                <input type="text" className="p-3 mb-4 w-full bg-slate-200 rounded border-2 border-slate-200 focus:border-slate-600 focus:outline-none"
                  onChange={(e) => setProposalName(e.target.value)} required="true" />
              </div>

              <div>
                <label className="uppercase text-sm font-bold opacity-70">Academic goal</label>
              <select className="w-full p-3 mb-4 bg-slate-200 rounded border-2 border-slate-200 focus:border-slate-600 focus:outline-none"
                onChange={(e) => setProposalgoal(e.target.value)}>
                <option>- </option>
                <option value={"Start a short course"}>Start a short course</option>
                <option value={"Complete a short course"}>Complete a short course</option>
                <option value={"Start a long course"}>Start a long course</option>
                <option value={"Complete a long course"}>Complete a long course</option>
                <option value={"Start high school"}>Start high school </option>
                <option value={"Finish high school"}>Finish high school </option>
                <option value={"Start college "}>Start college </option>
                <option value={"Finish college "}>Finish college </option>
                <option value={"Start a master's degree"}>Start a master's degree </option>
                <option value={"Finish a master's degree"}>Finish a master's degree </option>
              </select>
              </div>

              <div>
                 <label className="uppercase text-sm font-bold opacity-70">Link to the institute's website</label>
              <input type="text" className="p-3 mt-2 mb-4 w-full bg-slate-200 rounded border-2 border-slate-200 focus:border-slate-600 focus:outline-none"
                onChange={(e) => setProposalLinkInstitution(e.target.value)} required="true" />
              </div>

              <div>
                 <label className="uppercase text-sm font-bold opacity-70">Link to pensum</label>
              <input type="text" className="p-3 mt-2 mb-4 w-full bg-slate-200 rounded border-2 border-slate-200 focus:border-slate-600 focus:outline-none"
                onChange={(e) => setProposalLinkPensum(e.target.value)} required="true" />
              </div>
             

             

              <div>
                <label className="uppercase text-sm font-bold opacity-70">Time of beginning and end of the academic activity</label>
              <div className="flex items-center">


                <div className="relative">
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">

                  </div>
                  <input
                    name="start"
                    type="date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                    placeholder="Select date start"
                    min={moment().format('YYYY-MM-DD')}
                    onChange={(e) => setProposalActivityStart(e.target.value)}
                    required="true"


                  />
                </div>
                <span className="mx-4 text-gray-500">to</span>
                <div className="relative">
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">

                  </div>
                  <input
                    name="end"
                    type="date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-blue-500 block w-full pl-10 p-2.5"
                    placeholder="Select date end"
                    min={moment().format('YYYY-MM-DD')}
                    onChange={(e) => setProposalActivityEnd(e.target.value)}
                    required="true"
                  />
                </div>
              </div>
              </div>
              

              <div className="col-span-2">
                <label className="text-gray-700">
                  <textarea
                    className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    id="comment"
                    placeholder="Explain why you need the funds "
                    name="comment"
                    rows="5"
                    cols="40"
                    onChange={(e) => setProposalDescription(e.target.value)}
                  ></textarea>
                </label>
              </div>

              <div className="relative mt-3">

                <label className="uppercase text-sm font-bold opacity-70">Proposal duration</label>
                <select
                  className="w-full p-3 mt-2 mb-4 bg-slate-200 rounded border-2 border-slate-200 focus:border-slate-600 focus:outline-none"

                  onChange={(e) => setProposalDate(e.target.value)}
                >
                  <option>- </option>
                  <option value={moment().add(5, "minutes").toString()}>
                    5 minutes
                  </option>
                  <option value={moment().add(1, "months").toString()}>
                    1 months
                  </option>
                  <option value={moment().add(3, "months").toString()}>
                    3 months
                  </option>
                  <option value={moment().add(6, "months").toString()}>
                    6 months
                  </option>
                  <option value={moment().add(9, "months").toString()}>
                    9 months
                  </option>
                  <option value={moment().add(1, "years").toString()}>
                    1 year
                  </option>
                </select>
              </div>

              <div className="w-full">
                <div className=" relative ">
                  <label className="uppercase text-sm font-bold opacity-70">Amount required in NEARs</label>
                  <input type="number" className="p-3 mt-2 mb-4 w-full bg-slate-200 rounded border-2 border-slate-200 focus:border-slate-600 focus:outline-none"
                    onChange={(e) => setProposalAmount(e.target.value)}
                    required="true"
                  />

                </div>
                {/* <br></br>
                <p>Amount in NEARs  {proposalAmount} NEAR </p>
                <p>1 NEAR = ${amounNears} </p> */}
              </div>
              <div className="relative mt-3">

                <label className="uppercase text-sm font-bold opacity-70">Place a photo that represents your proposal</label>
              </div>
              <div className={`bg-yellow-100 border border-yellow-400 text-gray-700 px-4 py-3 rounded relative ${visibilityAlert}`} role="alert">
                <span className="block sm:inline">Once you have chosen the file press "upload file".</span>

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
                    required="true"
                  />
                  <button
                    className="uppercase py-2 px-4 rounded bg-blue-500 text-cyan-50 hover:bg-blue-300"
                    onClick={handleSubmit}
                  >
                    Upload file
                  </button>
                </div>
              </div>


              <input type="submit"
                className="text-white py-2 px-4 uppercase cursor-pointer rounded w-full bg-indigo-500 hover:bg-indigo-200 hover:text-indigo-500 shadow disabled:bg-indigo-300 disabled:hover:shadow-none disabled:hover:text-white disabled:hover:-translate-y-0 hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 "
                value="Create Proposal"
                onClick={setNewProposal}
                disabled={state}
              />

              <div
                className={`bg-green-200 border-green-600 text-green-600 border-l-4 p-4 ${visibility}`}
                role="alert"
              >
                <p className="font-bold">Success</p>
                <p>Congratulations, you are the best player.</p>
              </div>


            </div>
          </div>

        </div>

      </Layout>


    </div>
  );
}

export default ProposalsAdd;
