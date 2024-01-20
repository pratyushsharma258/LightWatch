import Addicon from "../icons/Addicon";
import Singleusericon from "../icons/Singleusericon";
import Homeicon from "../icons/Homeicon";
import { Button } from "../ui/button";
import Bellicon from "../icons/Bellicon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function Sidebar(props) {
  return (
    <div className="h-full w-[4vw] bg-deepblue absolute left-0 right-auto flex flex-col justify-center gap-16 text-orange-peel">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div
              className="w-full flex justify-center items-center"
              onClick={() => console.log("Hello")}
            >
              <Homeicon />
            </div>
          </TooltipTrigger>
          <TooltipContent className="relative left-4 bottom-2">
            <p>Home</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div
              className="w-full flex justify-center items-center"
              onClick={() => console.log("Hello")}
            >
              <Singleusericon />
            </div>
          </TooltipTrigger>
          <TooltipContent className="relative left-4 bottom-2">
            <p>Manage Admin requests</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div
              className="w-full flex justify-center items-center"
              onClick={() => console.log("Hello")}
            >
              <Addicon />
            </div>
          </TooltipTrigger>
          <TooltipContent className="relative left-4 bottom-2">
            <p>Add a streetlight</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div
              className="w-full flex justify-center items-center"
              onClick={() => console.log("Hello")}
            >
              <Bellicon />
            </div>
          </TooltipTrigger>
          <TooltipContent className="relative left-4 bottom-2">
            <p>Manage Greivances</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

export default Sidebar;
