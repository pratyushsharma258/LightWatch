import "@/styles/globals.css";
import { Mulish } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import { PulseLoader } from "react-spinners";
import Navbar from "@/components/Navbar";

const mulish = Mulish({ subsets: ["latin"] });

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    if (isMobile) {
      router.replace("/not-supported");
    }

    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <Head>
        <title>LightWatch</title>
        <link rel="icon" href="/logo.png" />
        <meta
          name="description"
          content="An app to assist government in maintainence of street lights and for public to lodge greivances and get a map view of related domain."
        />
      </Head>
      <main className={mulish.className}>
        {loading ? (
          <>
            <Navbar />
            <div className="w-screen h-[calc(100vh-56px)] bg-lightblue-500 dark:bg-green-900 flex items-center justify-center absolute top-14">
              <PulseLoader color="#ffffff" loading={loading} size={15} />
            </div>
          </>
        ) : (
          <Component {...pageProps} />
        )}
      </main>
    </ThemeProvider>
  );
}
