import React from "react";

import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { initContract } from "../../components/near";
import Loading from "../../components/common/Loading";
import { useNear } from "../../hooks/useNear";
import ProposalDetails from "../../components/proposals/ProposalDetails";
import Proposal from "../../models/Proposal";

function ProposalIdDetails() {
  const router = useRouter();
  const [nearContext, setNearContext] = useNear();
  const [proposal, setProposal] = React.useState<Proposal>(null);

  const [user, setUser] = React.useState("");

  const start = async () => {
    const idInt = await router.query.id;
    const id = String(idInt);
    if (id) {
      // @ts-ignore: Unreachable code error
      const proposal = await nearContext.contract.getProposal({
        proposalId: id,
      });
      setProposal(proposal);
    }

  };
  
  

  const id = router.query.id;

  const userLogged = async () => {
    const user =
      (await JSON.parse(localStorage.getItem("undefined_wallet_auth_key"))) ||
      null;

    if (user) {
      setUser(user?.accountId);
    }
  };

  React.useEffect(() => {
    userLogged();
    if (!id) {
      return;
    }
    const startClass = async () => {
      await start();
    };
    startClass();
  }, [id]);

  return (
    <div>
      <Layout>
        <div className="w-screen h-screen flex justify-center items-center align-middle">
          {proposal ? (
            <ProposalDetails proposal={proposal} />
          ) : (
            <div>
              <Loading />
            </div>
          )}
          
        </div>
      </Layout>
    </div>
  );
}

export default ProposalIdDetails;
