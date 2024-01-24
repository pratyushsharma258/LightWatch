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

function Sidebar(props) {
  const { username, info, userRole } = props;
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

  return (
    <>
      <div className="h-full w-[4vw] bg-deepblue absolute left-0 right-auto flex flex-col justify-center gap-16 text-orange-peel">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div
                className="w-full flex justify-center items-center"
                onClick={() => setToggleValue("home")}
              >
                <Homeicon />
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
                  className="w-full flex justify-center items-center"
                  onClick={() => setToggleValue("add")}
                >
                  <Addicon />
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
                  className="w-full flex justify-center items-center"
                  onClick={() => setToggleValue("add")}
                >
                  <Addicon />
                </div>
              </TooltipTrigger>
              <TooltipContent className="relative left-4 bottom-2">
                <p>Add a streetlight</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        {userRole !== "user" && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div
                  className="w-full flex justify-center items-center"
                  onClick={() => setToggleValue("notify")}
                >
                  <Bellicon />
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
      <Section content={toggleValue} name={username} info={info} />
    </>
  );
}

export default Sidebar;
