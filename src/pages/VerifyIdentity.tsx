import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import loginBanner from "/img/loginbanner.png";

export default function VerifyIdentity() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [activeIndex, setActiveIndex] = useState(1);
  const navigate = useNavigate();

  const handleCodeChange = (value: string, index: number) => {
    if (value.length > 1) return; // Only allow single character
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    
    // Auto-focus next input
    if (value && index < 5) {
      setActiveIndex(index + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      setActiveIndex(index - 1);
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual verification logic
    navigate("/");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Verify Form */}
      <div className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex justify-start">
            <div className="w-16 h-16 bg-[#F28C28] rounded-lg flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Header */}
          <div className="text-start">
            <h1 className="text-3xl font-bold text-gray-900">Verify Your Identity</h1>
            <p className="mt-2 text-gray-600">Enter the 6-digit code sent to your Email</p>
          </div>

          {/* Verification Form */}
          <form onSubmit={handleVerify} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4 text-start">
                Input Code
              </label>
              <div className="flex justify-start gap-3">
                {code.map((digit, index) => (
                  <Input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onFocus={() => setActiveIndex(index)}
                    className={`w-12 h-12 text-center text-lg font-semibold ${
                      activeIndex === index ? "ring-2 ring-[#F28C28]" : ""
                    }`}
                    style={{ 
                      borderColor: activeIndex === index ? "#F28C28" : "#D1D5DB",
                      backgroundColor: digit ? "#F9FAFB" : "white"
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Didn't Receive code?{" "}
                <a href="#" className="text-[#F28C28] hover:underline">
                  Resend
                </a>
              </p>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-white font-medium rounded-lg"
              style={{ backgroundColor: "#F28C28" }}
            >
              Verify
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
