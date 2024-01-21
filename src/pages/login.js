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
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import jwt from "jsonwebtoken";

function login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("");

  const submitHandler = async function (ev) {
    ev.preventDefault();

    const userFormData = { username, password, userRole };

    const response = await axios.get("/api/login", {
      params: {
        ...userFormData,
      },
    });

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

      router.replace(`/${userData.userRole}/${userData.userId}`);
    } else {
      toast("Wrong credentials", {
        description: "Please check your details",
        action: {
          label: "Undo",
          onClick: () => console.log("Wrong info"),
        },
      });
    }
  };

  return (
    <div className="w-screen min-h-screen flex flex-col justify-center items-center bg-thistle-blue">
      <Navbar />
      <div className="shadow-2xl text-lg w-80 h-96 shadow-licorice">
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
              Not registered?
              <label
                className="m-1 hover:cursor-pointer hover:text-green-700"
                onClick={() => {
                  router.push("/signup");
                }}
              >
                SignUp
              </label>
            </p>
          </CardFooter>
        </Card>
        <Toaster />
      </div>
    </div>
  );
}

export default login;
