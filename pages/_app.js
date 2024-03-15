import { Roboto } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import {
  ChakraProvider,
  cookieStorageManagerSSR,
  localStorageManager,
} from "@chakra-ui/react";
import { DarkModeProvider } from "../context/themeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Applayout from "@/ui/Applayout";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

// React query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});
export default function App({ cookies, Component, pageProps, session }) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ChakraProvider
          colorModeManager={
            typeof cookies === "string"
              ? cookieStorageManagerSSR(cookies)
              : localStorageManager
          }
        >
          <main className={roboto.className}>
            <DarkModeProvider>
              <Applayout>
                <Component {...pageProps} />
              </Applayout>
            </DarkModeProvider>
          </main>
        </ChakraProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

App.getInitialProps = ({ req }) => {
  return {
    cookies: req?.headers.cookie ?? "",
  };
};
