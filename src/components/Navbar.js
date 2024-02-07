import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
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
import { PulseLoader } from "react-spinners";

export default function Navbar(props) {
  const { userRole } = props;
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { setTheme, theme } = useTheme();

  const router = useRouter();
  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsLoading(true);
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
        if (userRole && data?.userRole !== userRole) handleLogout();
        setUser(data);
      }
    );
  }, [router]);

  useEffect(() => {
    if (
      (router.asPath.includes("login") || router.asPath.includes("signup")) &&
      user
    )
      router.replace(`/${user?.userRole}/${user?.userId}`);
  }, [user]);

  return (
    <div
      style={{
        boxShadow: `0px 20px 80px ${
          theme !== "light" ? "rgba(34, 197, 97, 0.2)" : "rgba(0, 0, 0, 0.4)"
        }`,
        zIndex: "2000",
      }}
      className="h-14 bg-white fixed top-0 w-screen flex flex-grow justify-between items-center dark:bg-deepgreen"
      suppressHydrationWarning
    >
      <div className="h-auto flex items-center justify-center ml-4 w-28">
        <img
          src={theme === "light" ? "/logo_full.png" : "/logo_full_dark.png"}
        />
      </div>
      <div className="h-full flex flex-row items-center justify-center">
        {user?.username && (
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="link"
                  className="text-lightblue dark:text-green-500"
                >
                  LogOut
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] text-lightblue dark:text-green-500">
                <DialogHeader>
                  <DialogTitle>Confirm Action</DialogTitle>
                  <DialogDescription className="text-lightblue dark:text-green-500">
                    Are you sure you want to Log out ?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    type="submit"
                    className="bg-lightblue dark:bg-green-700 dark:hover:bg-green-500"
                    onClick={handleLogout}
                  >
                    {isLoading ? (
                      <PulseLoader color="#ffffff" size={8} margin={2} />
                    ) : (
                      "Log Out"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger className="border-white ring-0" asChild>
            <Button
              variant="outline"
              className="text-lightblue-500 dark:text-green-500"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="mx-4 z-[40000] border-md border-lightblue-600 dark:border-green-500"
          >
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
      </div>
    </div>
  );
}
