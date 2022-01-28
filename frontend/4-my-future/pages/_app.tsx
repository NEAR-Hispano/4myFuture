import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NEARApiContextProvider } from "../context/nearContext";
import  UserContextProvider  from "../context/userContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NEARApiContextProvider>
      <UserContextProvider>
      <Component {...pageProps} />
      </UserContextProvider>
    </NEARApiContextProvider>
  );
}

export default MyApp;
