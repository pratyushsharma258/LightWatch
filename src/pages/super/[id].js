import axios from "axios";
import Navbar from "@/components/Navbar";
import AdminDataTable from "@/components/AdminDataTable";

function page({ admins }) {
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
