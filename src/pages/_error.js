import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect } from "react";

function Error({ statusCode }) {
  const router = useRouter();
  const [redirectMessage, setRedirectMessage] = useState(
    "Redirecting in 5 seconds..."
  );

  const redirectToPrevious = () => {
    router.back();
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      let counter = 5;
      const interval = setInterval(() => {
        counter--;
        setRedirectMessage(`Redirecting in ${counter} seconds...`);
        if (counter === 0) {
          clearInterval(interval);
          redirectToPrevious();
        }
      }, 1000);
    }
  }, []);

  const bgColor = "bg-lightblue-900";
  const textColor = "text-lightblue-400";

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen ${bgColor}`}
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`text-4xl font-bold ${textColor}`}
      >
        Error
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`text-lg mt-1 ${textColor}`}
      >
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : "An error occurred on client"}
      </motion.p>
      <p className="text-lightblue-600 mt-2">{redirectMessage}</p>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
