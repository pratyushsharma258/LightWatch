import { useEffect, useState } from "react";
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
import Navbar from "@/components/Navbar";
import { useTheme } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { PulseLoader } from "react-spinners";

function signup() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
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

    setIsLoading(true);

    const userFormData = { username, email, password, userRole };

    const response = await axios.post("/api/signup", userFormData);

    if (response) {
      setEmail("");
      setPassword("");
      setUserRole("");
      setUsername("");
      setIsLoading(false);
    }

    if (response.data.found === "true") {
      toast({
        title: "User already registered",
        description: "Please check your details",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      router.push("/login");
    } else {
      const { role: userRole, _id } = response.data.newUser;
      if (userRole === "user") router.replace(`/${userRole}/${_id}`);
      else {
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        toast({
          title: "Welcome to LightWatch",
          description: "You have been successfully registered!",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        router.replace("/signupFallback");
      }
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
            <Card className="h-[66vh] border-none rounded-lg dark:bg-deepgreen bg-opacity-20 dark:bg-opacity-75">
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
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
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
                  >
                    <SelectTrigger className="w-full mb-4 dark:text-green-700 dark:bg-deepgreen">
                      <SelectValue placeholder="Select User Role" />
                    </SelectTrigger>
                    <SelectContent className="dark:text-green-500 dark:bg-deepgreen">
                      <SelectItem value="user">Normal User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
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
                  Already registered?
                  <Button
                    className="-m-3 hover:cursor-pointer hover:text-green-400 dark:text-green-500"
                    onClick={() => {
                      router.push("/login");
                    }}
                    variant="link"
                  >
                    LogIn
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

export default signup;
