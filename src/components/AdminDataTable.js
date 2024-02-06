import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import axios from "axios";
import { useRouter } from "next/router";

function AdminDataTable({ admins, className }) {
  const router = useRouter();
  const handleToggleIsAllowed = async function (_id, isAllowed) {
    const response = await axios.patch("/api/fetchAdmins", {
      _id,
      isAllowed,
    });
    if (response.data) {
      router.replace(router.asPath);
    }
  };
  return (
    <div className={className}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>isAllowed</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="min-w-screen">
          {admins.map((admin, index) => (
            <TableRow key={index}>
              <TableCell>{admin.username}</TableCell>
              <TableCell>{admin.email}</TableCell>
              <TableCell>{admin.isAllowed ? "Yes" : "No"}</TableCell>
              <TableCell>
                <Button
                  className="bg-lightblue hover:bg-lightblue-250 dark:bg-green-700 dark:hover:bg-green-500"
                  onClick={() =>
                    handleToggleIsAllowed(admin._id, admin.isAllowed)
                  }
                >
                  Toggle isAllowed
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminDataTable;
