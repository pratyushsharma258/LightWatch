import Addicon from "../icons/Addicon";
import Singleusericon from "../icons/Singleusericon";
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

function Sidebar(props) {
  const { username, role, info } = props;
  const [toggleValue, setToggleValue] = useState("home");

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
        {role === "super" && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div
                  className="w-full flex justify-center items-center"
                  onClick={() => setToggleValue("admin")}
                >
                  <Singleusericon />
                </div>
              </TooltipTrigger>
              <TooltipContent className="relative left-4 bottom-2">
                <p>Manage Admin requests</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        {role === "user" ? (
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
        {role !== "user" && (
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
      </div>
      <Section content={toggleValue} name={username} info={info} />
    </>
  );
}

export default Sidebar;
