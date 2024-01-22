import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import { Button } from "./ui/button";

export default function Navbar() {
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
        setUser(data);
      }
    );
  }, [router]);

  return (
    <div className="h-10 bg-black text-white fixed top-0 w-screen flex flex-grow justify-between">
      Navigation links
      {user?.username ? (
        <div>
          <Button
            variant="link"
            onClick={handleLogout}
            className="text-orange-peel"
          >
            Logout
          </Button>
        </div>
      ) : (
        <div>SignIn</div>
      )}
    </div>
  );
}
