import { useState } from "react";
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
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import jwt from "jsonwebtoken";

function signup() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("");

  const submitHandler = async function (ev) {
    ev.preventDefault();

    const userFormData = { username, email, password, userRole };

    const response = await axios.post("/api/signup", userFormData);

    console.log(response);

    if (response.data.found === "true") {
      toast("User already registered", {
        description: "Please check your details",
        action: {
          label: "Undo",
          onClick: () => console.log("Existing info"),
        },
      });
      router.push("/login");
    } else {
      var userData = null;
      jwt.verify(
        response.data.token,
        process.env.NEXT_PUBLIC_JWT_SECRET,
        {},
        (err, data) => {
          if (err) throw err;
          console.log(data);
          userData = data;
        }
      );

      router.replace(`/${userData.userRole}/${userData.userId}`);
    }
  };

  return (
    <div className="w-screen min-h-screen flex flex-col justify-center items-center bg-thistle-blue">
      <Navbar />
      <div className="shadow-2xl text-lg w-80 h-50 shadow-licorice">
        <Card className="">
          <CardHeader>
            <CardTitle className="mb-2">Welcome to Lighwatch</CardTitle>
            <CardDescription>Please enter your details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={submitHandler} className="">
              <Input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                required={true}
                className="w-full mb-4"
              />
              <Input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required={true}
                className="w-full mb-4"
              />
              <Input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required={true}
                className="w-full mb-4"
              />
              <Select
                onValueChange={(e) => {
                  setUserRole(e);
                }}
                value={userRole}
              >
                <SelectTrigger className="w-full mb-4">
                  <SelectValue placeholder="Select User Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">Normal User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
              <Button className="w-full" type="submit">
                Submit
              </Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center text-sm">
            <p className="">
              Already registered?
              <label
                className="m-1 hover:cursor-pointer hover:text-green-700"
                onClick={() => {
                  router.push("/login");
                }}
              >
                LogIn
              </label>
            </p>
          </CardFooter>
        </Card>
        <Toaster />
      </div>
    </div>
  );
}

export default signup;
