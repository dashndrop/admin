import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import loginBanner from "/img/loginbanner.png";

export default function CreatePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("GH&%HY42yui90JJJ+_*&");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const navigate = useNavigate();

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual password update logic
    navigate("/password-success");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Create Password Form */}
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
            <h1 className="text-3xl font-bold text-gray-900">Create New password</h1>
            <p className="mt-2 text-gray-600">Sign in to your account</p>
          </div>

          {/* Create Password Form */}
          <form onSubmit={handleUpdate} className="space-y-6">
            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-2">
                Enter New Password
              </label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pr-10"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pr-10"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-white font-medium rounded-lg"
              style={{ backgroundColor: "#F28C28" }}
            >
              Update Password
            </Button>
          </form>
        </div>
      </div>

      {/* Right Side - Banner Image */}
      <div className="hidden lg:flex lg:flex-1 items-center justify-center p-8">
        <div className="relative w-full max-w-2xl rounded-2xl overflow-hidden shadow-md">
          <img
            src={loginBanner}
            alt="Login Banner"
            className="w-full h-auto object-cover"
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
