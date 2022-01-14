import React from "react";
import { getConfig, contractName } from '../../config';
import * as nearAPI from 'near-api-js';
import ProposalCard from "../home/ProposalCard";
import Loading from "../common/Loading";

function Carrousel() {
  const [proposals, setProposals] = React.useState([]);

  const getProposals = async () => {
    const nearConfig = getConfig('testnet');
    const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore();
    const near = await nearAPI.connect({ keyStore, ...nearConfig });
    const account = await near.account("lexdev.testnet");

    const contract = new nearAPI.Contract(
      account, // the account object that is connecting
      contractName,
      {
        // name of contract you're connecting to
        viewMethods: ["getAllProposals"], // view methods do not change state but usually return a value
        sender: account, // account object to initialize and sign transactions.
      }
    );
    const data = await contract.getAllProposals();

    if (data.length >= 3) {
      let proposal_1 = data[data.length - 1]
      let proposal_2 = data[data.length - 2]
      let proposal_3 = data[data.length - 3]

      var newArray = [proposal_1, proposal_2, proposal_3]
      setProposals(newArray);
    }

  }




  React.useEffect(() => {
    getProposals()
  }, [])

  return (
    <div className="flex justify-center mt-11">
      {proposals.length > 0 ?
        <div className="flex w-full scroll-x scrollbar-hide p-auto m-auto justify-center items-center align-middle">
          {proposals?.map((proposal) => (

            <ProposalCard
              title={proposal?.title}
              amountNeeded={proposal?.amountNeeded}
              index={proposal?.index}
              initDate={proposal?.initDate}
              finishDate={proposal?.finishDate}
              photos={proposal?.photos}
              user={proposal?.user}
              founds="23"
            ></ProposalCard>

          ))}
        </div> :
        <div>
          <Loading />
        </div>
      }
    </div>
  );
}

export default Carrousel;
