import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { useEffect } from "react";

const FallbackPage = () => {
  const router = useRouter();

  const redirectToLogin = () => {
    router.replace("/login");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTimeout(() => {
        redirectToLogin();
      }, 10000);
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center h-screen bg-lightblue-100 dark:bg-green-950">
        <div className="shadow-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
            className="p-8 bg-lightblue-200 dark:bg-green-800 rounded"
          >
            <h1 className="text-2xl font-semibold bg-lightblue-200 text-lightblue-600 dark:bg-green-800 dark:text-green-500 mb-2">
              Lightwatch
            </h1>
            <p className="text-lightblue-800 dark:text-green-600 mb-4">
              Oops! It seems you are not registered as an admin. Contact the
              super admin for access.
            </p>
            <Button
              onClick={redirectToLogin}
              className="w-full h-8 text-sm bg-lightblue dark:bg-green-700 dark:hover:bg-green-500"
            >
              Go to Login
            </Button>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default FallbackPage;
