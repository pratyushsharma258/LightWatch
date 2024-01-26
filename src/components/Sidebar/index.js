import Addicon from "../icons/Addicon";
import { useRouter } from "next/router";
import Homeicon from "../icons/Homeicon";
import { useState } from "react";
import Bellicon from "../icons/Bellicon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Section from "../Section";
import Backicon from "../icons/Backicon";
import { useEffect } from "react";
import jwt from "jsonwebtoken";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Sidebar(props) {
  const { username, info, userRole, markingHandler } = props;
  const [toggleValue, setToggleValue] = useState("home");

  const [user, setUser] = useState();

  const router = useRouter();
  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.replace("/login");
  };

  useEffect(() => {
    const cookies = document.cookie;

    const parsedCookies = cookies.split(";").reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split("=");
      acc[key] = value;
      return acc;
    }, {});

    jwt.verify(
      parsedCookies.token,
      process.env.NEXT_PUBLIC_JWT_SECRET,
      {},
      (err, data) => {
        if (err) console.error("Not found");
        if (data && !data.isAllowed) handleLogout();
        if (data?.userRole !== userRole) handleLogout();
        setUser(data);
      }
    );
  }, [router]);

  console.log(toggleValue);
  return (
    <>
      <div className="h-full w-[4vw] bg-deepblue absolute left-0 right-auto flex flex-col justify-center gap-12 text-orange-peel">
        <div className="absolute top-3 left-0 w-full flex flex-row justify-center items-center">
          <Avatar className="shadow-md shadow-orange-peel bg-orange-peel text-licorice">
            <AvatarImage src="/usericon.svg" alt="usericon" />
            <AvatarFallback className="text-licorice">
              {username[1] || "U"}
            </AvatarFallback>
          </Avatar>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div
                className="relative w-full flex flex-col items-center"
                onClick={() => {
                  setToggleValue("home");
                  markingHandler(false);
                }}
              >
                {toggleValue === "home" && (
                  <div className="top-0 w-full h-2 rounded-br-lg bg-deepblue absolute" />
                )}
                <div
                  className={`flex flex-col justify-center items-center w-full ${
                    toggleValue === "home" &&
                    "bg-orange-peel text-licorice h-16"
                  }`}
                >
                  <Homeicon />
                  {toggleValue === "home" && (
                    <div className="bottom-0 w-full h-2 rounded-tr-lg bg-deepblue absolute" />
                  )}
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent className="relative left-4 bottom-2">
              <p>Home</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {userRole === "user" ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div
                  className="relative w-full flex flex-col items-center"
                  onClick={() => setToggleValue("addGreivance")}
                >
                  {toggleValue === "addGreivance" && (
                    <div
                      className={`top-0 w-full h-2 rounded-br-lg bg-deepblue absolute`}
                    />
                  )}
                  <div
                    className={`flex flex-col justify-center items-center w-full ${
                      toggleValue === "addGreivance" &&
                      "bg-orange-peel text-licorice h-16"
                    }`}
                  >
                    <Addicon />
                  </div>
                  {toggleValue === "addGreivance" && (
                    <div
                      className={`bottom-0 w-full h-2 rounded-tr-lg bg-deepblue absolute`}
                    />
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent className="relative left-4 bottom-2">
                <p>File a General Greivance</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div
                  className="relative w-full flex flex-col items-center"
                  onClick={() => {
                    setToggleValue("addLight");
                    markingHandler(true);
                  }}
                >
                  {toggleValue === "addLight" && (
                    <div
                      className={`top-0 w-full h-2 rounded-br-lg bg-deepblue absolute`}
                    />
                  )}
                  <div
                    className={`flex flex-col justify-center items-center w-full ${
                      toggleValue === "addLight" &&
                      "bg-orange-peel text-licorice h-16"
                    }`}
                  >
                    <Addicon />
                  </div>
                  {toggleValue === "addLight" && (
                    <div
                      className={`bottom-0 w-full h-2 rounded-tr-lg bg-deepblue absolute`}
                    />
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent className="relative left-4 bottom-2">
                <p>Add a streetlight</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        {userRole === "admin" && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div
                  className="relative w-full flex flex-col items-center"
                  onClick={() => setToggleValue("manageGreivance")}
                >
                  {toggleValue === "manageGreivance" && (
                    <div
                      className={`top-0 w-full h-2 rounded-br-lg bg-deepblue absolute`}
                    />
                  )}
                  <div
                    className={`flex flex-col justify-center items-center w-full ${
                      toggleValue === "manageGreivance" &&
                      "bg-orange-peel text-licorice h-16"
                    }`}
                  >
                    <Bellicon />
                  </div>
                  {toggleValue === "manageGreivance" && (
                    <div
                      className={`bottom-0 w-full h-2 rounded-tr-lg bg-deepblue absolute`}
                    />
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent className="relative left-4 bottom-2">
                <p>Manage Greivances</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div
                className="w-full flex justify-center items-center"
                onClick={handleLogout}
              >
                <Backicon />
              </div>
            </TooltipTrigger>
            <TooltipContent className="relative left-4 bottom-2">
              <p>Logout</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Section content={toggleValue} username={username} info={info} />
    </>
  );
}

export default Sidebar;
