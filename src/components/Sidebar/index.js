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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Section from "../Section";
import Backicon from "../icons/Backicon";
import { useEffect } from "react";
import jwt from "jsonwebtoken";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Skeleton } from "../ui/skeleton";
import Infoicon from "../icons/Infoicon";

function Sidebar(props) {
  const { info, markingHandler, markerPosition, grievanceInfo, isClient } =
    props;
  const [toggleValue, setToggleValue] = useState("home");

  const [user, setUser] = useState();

  const router = useRouter();
  const { setTheme } = useTheme();
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
        if (data && !data.isAllowed) handleLogout();
        if (data && router.query.userId !== data.userId)
          router.replace(`/${data.userRole}/${data.userId}`);
        if (!router.asPath.includes(data?.userRole)) handleLogout();
        setUser(data);
      }
    );
  }, [router]);

  return (
    <>
      <div className="h-full w-[4vw] bg-lightblue-600 absolute left-0 right-auto flex flex-col justify-center gap-12 text-white dark:bg-green-950 dark:text-green-500">
        <div className="absolute top-3 left-0 w-full flex flex-row justify-center items-center">
          <Avatar className="shadow-md shadow-deepblue bg-white dark:bg-green-500">
            <AvatarImage src="/logo.png" alt="websiteLogo" />
            <AvatarFallback className="text-licorice">
              {user?.username[1] || "U"}
            </AvatarFallback>
          </Avatar>
        </div>
        {isClient ? (
          <>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div
                    className="relative w-full flex flex-col items-center"
                    onClick={() => {
                      setToggleValue("home");
                      if (user?.userRole === "admin") markingHandler(false);
                    }}
                  >
                    {toggleValue === "home" && (
                      <div className="top-0 w-full h-2 rounded-br-lg bg-lightblue-600 dark:bg-green-950 absolute" />
                    )}
                    <div
                      className={`flex flex-col justify-center items-center w-full ${
                        toggleValue === "home" &&
                        "bg-white text-deepblue h-16 dark:bg-deepgreen dark:text-green-600"
                      }`}
                    >
                      <Homeicon />
                      {toggleValue === "home" && (
                        <div className="bottom-0 w-full h-2 rounded-tr-lg bg-lightblue-600 dark:bg-green-950 absolute" />
                      )}
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="relative left-2 bottom-0">
                  <p>Home</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {user?.userRole === "user" ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div
                      className="relative w-full flex flex-col items-center"
                      onClick={() => {
                        setToggleValue("addGrievance");
                        if (user?.userRole === "admin") markingHandler(false);
                      }}
                    >
                      {toggleValue === "addGrievance" && (
                        <div
                          className={`top-0 w-full h-2 rounded-br-lg bg-lightblue-600 dark:bg-green-950 absolute`}
                        />
                      )}
                      <div
                        className={`flex flex-col justify-center items-center w-full ${
                          toggleValue === "addGrievance" &&
                          "bg-white text-deepblue h-16 dark:bg-deepgreen dark:text-green-600"
                        }`}
                      >
                        <Addicon />
                      </div>
                      {toggleValue === "addGrievance" && (
                        <div
                          className={`bottom-0 w-full h-2 rounded-tr-lg bg-lightblue-600 dark:bg-green-950 absolute`}
                        />
                      )}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="relative left-4 bottom-2">
                    <p>File a General Grievance</p>
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
                          className={`top-0 w-full h-2 rounded-br-lg bg-lightblue-600 dark:bg-green-950 absolute`}
                        />
                      )}
                      <div
                        className={`flex flex-col justify-center items-center w-full ${
                          toggleValue === "addLight" &&
                          "bg-white text-deepblue h-16 dark:bg-deepgreen dark:text-green-600"
                        }`}
                      >
                        <Addicon />
                      </div>
                      {toggleValue === "addLight" && (
                        <div
                          className={`bottom-0 w-full h-2 rounded-tr-lg bg-lightblue-600 dark:bg-green-950 absolute`}
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
            {user?.userRole === "admin" && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div
                      className="relative w-full flex flex-col items-center"
                      onClick={() => {
                        setToggleValue("manageGrievance");
                        if (user?.userRole === "admin") markingHandler(false);
                      }}
                    >
                      {toggleValue === "manageGrievance" && (
                        <div
                          className={`top-0 w-full h-2 rounded-br-lg bg-lightblue-600 dark:bg-green-950 absolute`}
                        />
                      )}
                      <div
                        className={`flex flex-col justify-center items-center w-full ${
                          toggleValue === "manageGrievance" &&
                          "bg-white text-deepblue h-16 dark:bg-deepgreen dark:text-green-600"
                        }`}
                      >
                        <Bellicon />
                      </div>
                      {toggleValue === "manageGrievance" && (
                        <div
                          className={`bottom-0 w-full h-2 rounded-tr-lg bg-lightblue-600 dark:bg-green-950  absolute`}
                        />
                      )}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="relative left-4 bottom-2">
                    <p>Manage Grievances</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="ml-4">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div
                    className="relative w-full flex flex-col items-center"
                    onClick={() => {
                      setToggleValue("instructions");
                      if (user?.userRole === "admin") markingHandler(false);
                    }}
                  >
                    {toggleValue === "instructions" && (
                      <div className="top-0 w-full h-2 rounded-br-lg bg-lightblue-600 dark:bg-green-950 absolute" />
                    )}
                    <div
                      className={`flex flex-col justify-center items-center w-full ${
                        toggleValue === "instructions" &&
                        "bg-white text-deepblue h-16 dark:bg-deepgreen dark:text-green-600"
                      }`}
                    >
                      <Infoicon />
                      {toggleValue === "instructions" && (
                        <div className="bottom-0 w-full h-2 rounded-tr-lg bg-lightblue-600 dark:bg-green-950 absolute" />
                      )}
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="relative left-2 bottom-0">
                  <p>Instructions</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Dialog>
                <DialogTrigger>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="w-full flex justify-center items-center">
                        <Backicon />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="relative left-4 bottom-2">
                      <p>Logout</p>
                    </TooltipContent>
                  </Tooltip>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Confirm Action</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to Log out ?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      type="submit"
                      onClick={handleLogout}
                      className="bg-lightblue-650 text-white hover:bg-lightblue-850 dark:bg-green-700 dark:text-green-400 dark:hover:bg-green-600"
                    >
                      Log Out
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </TooltipProvider>
          </>
        ) : (
          <>
            <Skeleton className="h-10 w-10 rounded-full mx-auto" />
            <Skeleton className="h-10 w-10 rounded-full mx-auto" />
            <Skeleton className="h-10 w-10 rounded-full mx-auto" />
          </>
        )}
      </div>
      <Section
        content={toggleValue}
        username={user?.username}
        info={info}
        grievanceInfo={grievanceInfo}
        markerPosition={markerPosition}
        isClient={isClient}
        contentHandler={setToggleValue}
        markingHandler={markingHandler}
      />
    </>
  );
}

export default Sidebar;
