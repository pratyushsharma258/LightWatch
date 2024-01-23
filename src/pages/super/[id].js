import axios from "axios";
import Navbar from "@/components/Navbar";
import AdminDataTable from "@/components/AdminDataTable";
import { useEffect } from "react";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";

function page({ admins }) {
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
        if (err) console.log("Not found");
        if (data.userRole !== "super") router.replace("/login");
      }
    );
  }, []);

  const router = useRouter();
  return (
    <div className="min-w-screen min-h-screen bg-deepblue">
      <Navbar />
      {admins && (
        <AdminDataTable
          admins={admins}
          className={
            "absolute top-10 w-full text-orange-peel flex items-center"
          }
        />
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const response = await axios.get("http://localhost:3000/api/fetchAdmins");

  const { admins } = response.data;

  return {
    props: { content: "true", admins },
  };
}

export default page;
