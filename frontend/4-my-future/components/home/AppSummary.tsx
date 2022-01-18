import React from "react";
import User from "../../models/User";
import Proposal from "../../models/Proposal";
import Payments from "../../models/Payment";

interface AppSummaryProps {
  proposals?: Proposal[];
  payments?: Payments[];
  users?: User[];
}

function AppSummary({ proposals, payments, users }: AppSummaryProps) {
  return (
    <div className="w-full text-3xl font-sans border-b-2 ">
      {proposals.length > 0 && payments.length > 0 && users.length > 0 ? (
        <div className="w-full flex justify-between">
          <div>
            Proposals Registered:{" "}
            <span className="font-bold">{proposals.length}</span>
          </div>
          <div>
            Total Payments: <span className="font-bold">{payments.length}</span>
          </div>
          <div>
            Users Registered: <span className="font-bold">{users.length}</span>
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-between">
          <div className="">
            Proposals Registered:{" "}
            <span className="font-bold">0</span>
          </div>
          <div>
            Total Payments: <span className="font-bold">0</span>
          </div>
          <div>
            Users Registered: <span className="font-bold">0</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default AppSummary;
