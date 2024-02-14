"use client";
import axios from "axios";
import Navbar from "@/components/Navbar";
import AdminDataTable from "@/components/AdminDataTable";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";

function Page() {
  const [isClient, setIsClient] = useState(false);
  const [admins, setAdmins] = useState();

  const fetchData = async function () {
    const response = await axios.get("/api/fetchAdmins");
    setAdmins(response?.data?.admins);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (admins) setIsClient(true);
  }, [admins]);

  return (
    <div className="min-w-screen min-h-screen bg-lightblue-250 dark:bg-green-950 text-lightblue-700 dark:text-green-600">
      {isClient ? (
        <>
          <Navbar userRole="super" />
          {admins && (
            <AdminDataTable
              admins={admins}
              className={
                "absolute top-14 w-full text-lightblue-700 dark:text-green-600 flex items-center"
              }
            />
          )}
        </>
      ) : (
        <>
          <PulseLoader color="#22c561" size={15} loading={isClient} />{" "}
        </>
      )}
    </div>
  );
}

export default Page;
