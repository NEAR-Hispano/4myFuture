import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NEARApiContextProvider } from "../context/nearContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NEARApiContextProvider>
      <Component {...pageProps} />
    </NEARApiContextProvider>
  );
}

export default MyApp;
