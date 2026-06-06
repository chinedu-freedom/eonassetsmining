"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      if (email === "chinedufreedom10@gmail.com" && password === "Chinedu2$") {
        router.push("/ktdevpro/dashboard");
      } else {
        setError("Invalid email or password");
        setIsLoading(false);
      }
    }, 1500);
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
                {error && (
                  <div className="pb-6">
                    <div className="p-3 bg-red-50 text-red-600 rounded text-sm text-center">
                      {error}
                    </div>
                  </div>
                )}
                
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
                    defaultValue="chinedufreedom10@gmail.com"
                  />
                </div>
                
                <div className="pb-6">
                  <Label className="block text-[14px] font-semibold mb-[10px]" htmlFor="password">Password</Label>
                  <Input 
                    type="password" 
                    id="password"
                    name="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="text-[16px] leading-[28px] px-4 py-2 w-full min-h-[44px] bg-[#e8f0fe] transition-shadow focus-visible:ring-[#5469d4]"
                    defaultValue="Chinedu2$"
                  />
                </div>
                
                <div className="pb-6">
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-[#5469d4] text-white font-semibold min-h-[44px] hover:bg-[#495bc2]"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
