import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";
import Navbar from "@/components/Navbar";
import { useTheme } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { PulseLoader } from "react-spinners";

function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { theme } = useTheme();
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const submitHandler = async function (ev) {
    ev.preventDefault();

    if (!(username && password && userRole)) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill all the details",
      });
      return;
    }

    setIsLoading(true);

    const userFormData = { username, password, userRole };

    const response = await axios.get("/api/login", {
      params: {
        ...userFormData,
      },
    });

    if (response) {
      setIsLoading(false);
      setPassword("");
      setUserRole("");
      setUsername("");
    }

    if (response.data.found && response.data.passwordMatch) {
      var userData = null;
      jwt.verify(
        response.data.token,
        process.env.NEXT_PUBLIC_JWT_SECRET,
        {},
        (err, data) => {
          if (err) throw err;
          userData = data;
        }
      );
      if (userData.isAllowed) {
        toast({
          title: "Login Successful",
          description: "Welcome to Lightwatch",
        });
        router.replace(`/${userData.userRole}/${userData.userId}`);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "You are not registered as an admin.",
        });
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        router.replace("/signupFallback");
      }
    } else {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Please check your details",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  return (
    <div
      className="w-screen min-h-screen flex flex-col justify-center items-center bg-cover bg-center bg-[url('/backgroundLight.png')] dark:bg-[url('/background.png')]"
      suppressHydrationWarning
    >
      {isClient ? (
        <>
          <Navbar />
          <div
            className="shadow-2xl text-lg w-[22rem] rounded-lg h-full shadow-deepblue dark:shadow-green-800 dark:text-green-800"
            style={{
              boxShadow: `0px 20px 80px ${
                theme !== "light"
                  ? "rgba(34, 197, 97, 0.2)"
                  : "rgba(0, 0, 0, 0.4)"
              }`,
            }}
          >
            <Card className="h-[60vh] border-none rounded-lg dark:bg-deepgreen bg-opacity-20 dark:bg-opacity-75">
              <CardHeader className="dark:text-green-500 text-lightblue">
                <CardTitle className="my-2">Welcome to LightWatch</CardTitle>
                <CardDescription className="dark:text-green-700">
                  Please enter your details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={submitHandler}
                  className="flex flex-grow items-center flex-col justify-center my-4"
                >
                  <Input
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    required={true}
                    className="w-full mb-4 dark:bg-deepgreen dark:text-green-500 placeholder:dark:text-green-700"
                  />
                  <Input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    required={true}
                    className="w-full mb-4 dark:bg-deepgreen dark:text-green-500 placeholder:dark:text-green-700"
                  />
                  <Select
                    onValueChange={(e) => {
                      setUserRole(e);
                    }}
                    value={userRole}
                    required={true}
                  >
                    <SelectTrigger className="w-full mb-4 dark:text-green-700 dark:bg-deepgreen">
                      <SelectValue placeholder="Select User Role" />
                    </SelectTrigger>
                    <SelectContent className="dark:text-green-500 dark:bg-deepgreen">
                      <SelectItem value="user">Normal User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="super">Super Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    className="w-full bg-lightblue dark:bg-green-800 dark:hover:bg-green-500"
                    type="submit"
                  >
                    {isLoading ? (
                      <PulseLoader color="#ffffff" size={8} />
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="justify-center text-sm">
                <p className="dark:text-green-500">
                  Not registered?
                  <Button
                    className="-m-3 hover:cursor-pointer hover:text-green-400 dark:text-green-500"
                    onClick={() => {
                      router.push("/signup");
                    }}
                    variant="link"
                  >
                    SignUp
                  </Button>
                </p>
              </CardFooter>
            </Card>
            <Toaster />
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Login;
