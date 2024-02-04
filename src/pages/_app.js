import "@/styles/globals.css";
import { Mulish } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";

const mulish = Mulish({ subsets: ["latin"] });

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <main className={mulish.className}>
        <Component {...pageProps} />
      </main>
    </ThemeProvider>
  );
}
