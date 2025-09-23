import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import loginBanner from "/img/loginbanner.png";

export default function ResetPassword() {
  const [email, setEmail] = useState("Default@mail.com");
  const navigate = useNavigate();

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual reset logic
    navigate("/create-password");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Reset Form */}
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
            <h1 className="text-3xl font-bold text-gray-900">Reset Your Password</h1>
            <p className="mt-2 text-gray-600">We'll send instructions to your registered email.</p>
          </div>

          {/* Reset Form */}
          <form onSubmit={handleReset} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Your Email Address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-white font-medium rounded-lg"
              style={{ backgroundColor: "#F28C28" }}
            >
              Send Reset Link
            </Button>
          </form>
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
