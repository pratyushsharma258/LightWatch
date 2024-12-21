import { TextGenerateEffect } from "@/components/ui/text-generate";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import { AuroraBackground } from "@/components/ui/aurora-background";

export default function Home() {
  const words = "Discover the future of streetlight management with us.";

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const router = useRouter();

  return (
    <div className="min-w-screen min-h-screen rounded-none">
      {isClient ? (
        <>
          <Navbar />
          <AuroraBackground>
            <div className="flex flex-col gap-4">
              <motion.h1
                initial={{ opacity: 0.5, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3,
                  duration: 0.8,
                  ease: "easeInOut",
                }}
                className="bg-gradient-to-br from-white to-lightblue-500 py-4 bg-clip-text text-center text-4xl font-bold tracking-tight text-transparent md:text-7xl mt-14 z-0"
              >
                LightWatch
              </motion.h1>
              <motion.p
                initial={{ opacity: 0.5, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3,
                  duration: 0.8,
                  ease: "easeInOut",
                }}
                className="bg-gradient-to-br text-white from-white to-lightblue-500 py-4 bg-clip-text text-center text-4xl font-extrabold tracking-tight text-transparent md:text-5xl -mt-20 z-0 w-[60vw] relative top-20"
              >
                <TextGenerateEffect words={words} className={"text-white"} />
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0.5, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className=""
            >
              <button
                className="inline-flex h-12 hover:scale-95 mt-8 animate-shimmer items-center justify-center rounded-md border border-lightblue-800 bg-[linear-gradient(110deg,#001b43,45%,#5096ff,55%,#001b43)] bg-[length:200%_100%] px-6 font-medium text-lightblue-200 transition-colors focus:outline-none relative top-24"
                onClick={() => router.push("/login")}
              >
                Get Started
              </button>
            </motion.div>
          </AuroraBackground>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
