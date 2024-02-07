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
import { Toaster } from "./ui/toaster";
import { set } from "mongoose";

function AdminDataTable({ admins, className }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleIsAllowed = async function (_id, isAllowed) {
    setIsLoading(true);
    const response = await axios.patch("/api/fetchAdmins", {
      _id,
      isAllowed,
    });
    if (response.data) {
      setIsLoading(false);
      toast({
        title: "Admin updated",
        description: "Admin permission updated successfully",
      });
      router.replace(router.asPath);
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong",
      });
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
                  {isLoading ? (
                    <PulseLoader color="#ffffff" size={8} margin={2} />
                  ) : (
                    "Toggle isAllowed"
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Toaster />
    </div>
  );
}

export default AdminDataTable;
