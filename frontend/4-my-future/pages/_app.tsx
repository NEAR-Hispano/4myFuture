import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NEARApiContextProvider } from "../context/nearContext";
import UserContextProvider from "../context/userContext";
import {AuthContextProvider} from "../context/authContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NEARApiContextProvider>
      <AuthContextProvider>
        <UserContextProvider>
          <Component {...pageProps} />
        </UserContextProvider>
      </AuthContextProvider>
    </NEARApiContextProvider>
  );
}

export default MyApp;
