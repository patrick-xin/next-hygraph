import "../styles/global.css";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { client } from "@/lib/client";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ApolloProvider client={client}>
    <Component {...pageProps} />
  </ApolloProvider>
);

export default MyApp;
