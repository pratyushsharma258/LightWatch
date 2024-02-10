import "@/styles/globals.css";
import { Mulish } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";

const mulish = Mulish({ subsets: ["latin"] });

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    if (isMobile) {
      router.push("/not-supported");
    }
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
        <Component {...pageProps} />
      </main>
    </ThemeProvider>
  );
}
