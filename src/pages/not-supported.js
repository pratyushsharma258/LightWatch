import React from "react";
import { motion } from "framer-motion";

const NotFoundPage = () => {
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
        className={`text-4xl font-bold ${textColor} p-4 mx-4 text-center`}
      >
        This web service is not supported for small screen devices.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`text-lg mt-1 ${textColor} mx-4 text-center`}
      >
        Kindly wait for the LightWatch app to get published. Coming soon .....
      </motion.p>
    </div>
  );
};

export default NotFoundPage;
