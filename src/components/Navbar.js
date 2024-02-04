import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import { Button } from "./ui/button";
import Image from "next/image";

export default function Navbar(props) {
  const { userRole } = props;
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
        if (userRole && data.userRole !== userRole) handleLogout();
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
    <div className="h-12 bg-white text-black fixed top-0 w-screen flex flex-grow justify-between">
      <div className="h-full flex items-center justify-center ml-4">
        <Image src={"/logo_full.png"} width={136} height={8} />
      </div>
      {user?.username && (
        <div>
          <Button
            variant="link"
            onClick={handleLogout}
            className="text-orange-peel"
          >
            Logout
          </Button>
        </div>
      )}
    </div>
  );
}
