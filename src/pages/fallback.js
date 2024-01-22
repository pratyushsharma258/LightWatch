import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const FallbackPage = () => {
  const router = useRouter();

  const redirectToLogin = () => {
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Lightwatch
        </h1>
        <p className="text-gray-600 mb-4">
          Oops! It seems you are not registered as an admin. Contact the super
          admin for access.
        </p>
        <Button onClick={redirectToLogin} className="bg-blue-500 text-white">
          Go to Login
        </Button>
      </div>
    </div>
  );
};

export default FallbackPage;
