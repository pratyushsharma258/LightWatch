import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const SignupSuccessPage = () => {
  const router = useRouter();

  const redirectToLogin = () => {
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-green-100">
      <div className="p-8 bg-white rounded shadow-md">
        <h1 className="text-2xl font-semibold text-green-800 mb-2">
          Welcome to Lightwatch!
        </h1>
        <p className="text-green-600 mb-4">
          Your account has been successfully created. Please wait before you get
          access.
        </p>
        <Button onClick={redirectToLogin} className="bg-blue-500 text-white">
          Go to Login
        </Button>
      </div>
    </div>
  );
};

export default SignupSuccessPage;
