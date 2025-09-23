import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import loginBanner from "/img/loginbanner.png";

export default function Login() {
  const [email, setEmail] = useState("timirizz78@gmail.com");
  const [password, setPassword] = useState("@hexain21");
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({ description: "Please enter both email and password" });
      return;
    }

    setIsLoading(true);
    try {
      console.log('Attempting login with:', { email, password: '***' });
      await login(email, password);
      console.log('Login successful, navigating to dashboard');
      toast({ description: "Login successful!" });
      navigate("/");
    } catch (error) {
      console.error('Login failed:', error);
      toast({ description: "Invalid email or password" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
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
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back!</h1>
            <p className="mt-2 text-gray-600">Sign in to your admin account</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-10"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox
                  id="keep-signed-in"
                  checked={keepSignedIn}
                  onCheckedChange={(checked) => setKeepSignedIn(checked as boolean)}
                />
                <label htmlFor="keep-signed-in" className="ml-2 text-sm text-gray-700">
                  Keep me signed in
                </label>
              </div>
              <a href="/reset-password" className="text-sm text-[#F28C28] hover:underline">
                Forgot Password?
              </a>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 text-white font-medium rounded-lg"
              style={{ backgroundColor: "#F28C28" }}
            >
              {isLoading ? "Signing in..." : "Sign In"}
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
