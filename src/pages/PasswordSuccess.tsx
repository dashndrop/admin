import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import loginBanner from "/img/loginbanner.png";

export default function PasswordSuccess() {
  const navigate = useNavigate();

  const handleGoToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Success Message */}
      <div className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex justify-start">
            <div className="w-16 h-16 bg-[#F28C28] rounded-lg flex items-center justify-center">
              <Lock className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Header */}
          <div className="text-start">
            <h1 className="text-3xl font-bold text-gray-900">Password reset Succesfull!</h1>
            <p className="mt-2 text-gray-600">
              Your password has been reset successfully, you can now login to your dashboard using your new credentials
            </p>
          </div>

          {/* Action Button */}
          <Button
            onClick={handleGoToLogin}
            className="w-full h-12 text-white font-medium rounded-lg"
            style={{ backgroundColor: "#F28C28" }}
          >
            Go To Login
          </Button>
        </div>
      </div>

      {/* Right Side - Banner Image */}
      <div className="hidden lg:flex lg:flex-1">
        <div className="relative w-full h-full">
          <img
            src={loginBanner}
            alt="Login Banner"
            className="w-full h-full object-cover"
          />
          {/* Overlay with delivery icon */}
          <div className="absolute bottom-6 right-6">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <div className="w-10 h-10 bg-[#F28C28] rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
