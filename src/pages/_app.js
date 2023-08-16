import "@/styles/globals.css";
import NextNProgress from "nextjs-progressbar";
import UserProvider from "@/contexts/UserContext";

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <NextNProgress
        color="#37139D"
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
        options={{
          showSpinner: false,
        }}
      />
      <Component {...pageProps} />
    </UserProvider>
  );
}
