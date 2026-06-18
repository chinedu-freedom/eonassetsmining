"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { CookieManager } from "@/utils/cookie-utils";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3001/api/auth/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        CookieManager.set("satrixnow-admin-token", data.token);
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminUser", JSON.stringify(data.admin));
        toast.success("Login successful!");
        router.push("/dashboard"); // Redirects to the dashboard root
      } else {
        toast.error(data.error || "Invalid email or password");
      }
    } catch (err) {
      toast.error("Failed to connect to the backend server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full min-h-screen overflow-hidden bg-white font-sans text-[#1a1f36]">
      <div className="flex flex-col min-h-screen grow">
        
        {/* Animated Background Grid Container */}
        <div className="loginbackground bg-white pt-16">
          <div className="loginbackground-gridContainer">
            <div className="flex" style={{ gridArea: "top / start / 8 / end" }}>
              <div className="grow" style={{ backgroundImage: "linear-gradient(white 0%, rgb(247, 250, 252) 33%)" }}></div>
            </div>
            <div className="flex" style={{ gridArea: "4 / 2 / auto / 5" }}>
              <div className="grow box-divider--light-all-2 animationLeftRight tans3s"></div>
            </div>
            {/* Reduced length by changing start column from 'start' to '2' */}
            <div className="flex" style={{ gridArea: "7 / 8 / auto / 4" }}>
              <div className="grow bg-[#5469d4] animationLeftRight"></div>
            </div>
            <div className="flex" style={{ gridArea: "8 / 4 / auto / 6" }}>
              <div className="grow bg-[#e3e8ee] animationLeftRight tans3s"></div>
            </div>
            <div className="flex" style={{ gridArea: "2 / 15 / auto / end" }}>
              <div className="grow bg-[#7fd3ed] animationRightLeft tans4s"></div>
            </div>
            <div className="flex" style={{ gridArea: "3 / 14 / auto / end" }}>
              <div className="grow bg-[#5469d4] animationRightLeft"></div>
            </div>
            <div className="flex" style={{ gridArea: "4 / 17 / auto / 20" }}>
              <div className="grow bg-[#e3e8ee] animationRightLeft tans4s"></div>
            </div>
            <div className="flex" style={{ gridArea: "5 / 14 / auto / 17" }}>
              <div className="grow box-divider--light-all-2 animationRightLeft tans3s"></div>
            </div>
          </div>
        </div>

        {/* Foreground Content */}
        <div className="pt-6 flex flex-col h-screen justify-center grow z-10 relative">
          {/* <div className="pt-10 pb-6 flex justify-center">
            <h1 className="tracking-[-1px] text-[32px] font-bold text-[#5469d4]">
              ADMIN-demo
            </h1>
          </div> */}
          
          <div className="my-0 mx-auto w-full max-w-[448px] bg-white rounded shadow-[0_7px_14px_rgba(60,66,87,0.12),0_3px_6px_rgba(0,0,0,0.12)]">
            <div className="p-12">
              <span className="block text-[20px] text-center mb-5 leading-[28px] text-[#1a1f36] pb-[15px] font-normal">
                Sign in to Admin Panel
              </span>
              
              <form onSubmit={handleLogin}>
                <div className="pb-6">
                  <Label className="block text-[14px] font-semibold mb-[10px]" htmlFor="email">Email</Label>
                  <Input 
                    type="email" 
                    id="email"
                    name="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="text-[16px] leading-[28px] px-4 py-2 w-full min-h-[44px] bg-white transition-shadow focus-visible:ring-[#5469d4]"
                    defaultValue="admin@eonassets.com"
                  />
                </div>
                
                <div className="pb-6">
                  <Label className="block text-[14px] font-semibold mb-[10px]" htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input 
                      type={showPassword ? "text" : "password"} 
                      id="password"
                      name="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="text-[16px] leading-[28px] px-4 py-2 w-full min-h-[44px] bg-[#e8f0fe] transition-shadow focus-visible:ring-[#5469d4] pr-10"
                      defaultValue="admin123"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                
                <div className="pb-6">
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-[#5469d4] text-white font-semibold min-h-[44px] hover:bg-[#495bc2]"
                  >
                    {isLoading ? (
                      <div className="flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><rect width="10" height="10" x="1" y="1" fill="currentColor" rx="1"><animate id="SVG7WybndBt" fill="freeze" attributeName="x" begin="0;SVGo3aOUHlJ.end" dur="0.2s" values="1;13"/><animate id="SVGVoKldbWM" fill="freeze" attributeName="y" begin="SVGFpk9ncYc.end" dur="0.2s" values="1;13"/><animate id="SVGKsXgPbui" fill="freeze" attributeName="x" begin="SVGaI8owdNK.end" dur="0.2s" values="13;1"/><animate id="SVG7JzAfdGT" fill="freeze" attributeName="y" begin="SVG28A4To9L.end" dur="0.2s" values="13;1"/></rect><rect width="10" height="10" x="1" y="13" fill="currentColor" rx="1"><animate id="SVGUiS2jeZq" fill="freeze" attributeName="y" begin="SVG7WybndBt.end" dur="0.2s" values="13;1"/><animate id="SVGU0vu2GEM" fill="freeze" attributeName="x" begin="SVGVoKldbWM.end" dur="0.2s" values="1;13"/><animate id="SVGOIboFeLf" fill="freeze" attributeName="y" begin="SVGKsXgPbui.end" dur="0.2s" values="1;13"/><animate id="SVG14lAaeuv" fill="freeze" attributeName="x" begin="SVG7JzAfdGT.end" dur="0.2s" values="13;1"/></rect><rect width="10" height="10" x="13" y="13" fill="currentColor" rx="1"><animate id="SVGFpk9ncYc" fill="freeze" attributeName="x" begin="SVGUiS2jeZq.end" dur="0.2s" values="13;1"/><animate id="SVGaI8owdNK" fill="freeze" attributeName="y" begin="SVGU0vu2GEM.end" dur="0.2s" values="13;1"/><animate id="SVG28A4To9L" fill="freeze" attributeName="x" begin="SVGOIboFeLf.end" dur="0.2s" values="1;13"/><animate id="SVGo3aOUHlJ" fill="freeze" attributeName="y" begin="SVG14lAaeuv.end" dur="0.2s" values="1;13"/></rect></svg>
                      </div>
                    ) : (
                      "Continue"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
