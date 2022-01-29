import React from "react";

const useAuth = () => {
  const [auth, setAuth] = React.useState(false);

  //React.useEffect(() => setAuth((window as any).walletConnection.isSignedIn()), []);
  return auth;
};

export default useAuth;