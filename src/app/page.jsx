"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/auth-input";
import { CookieManager } from "@/utils/cookie-utils";
import { useFetchData } from "@/hooks/useApi";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { data: settingsResponse } = useFetchData("/settings", ["platform-settings"]);
  const settings = settingsResponse?.settings || {};
  const siteName = settings.site_name || "Polychainapp";
  const siteLogo = settings.platform_logo || null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        CookieManager.set("satrixnow-admin-token", data.token);
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminUser", JSON.stringify(data.admin));
        router.push("/dashboard");
      } else {
        // toast.error(data.error || "Invalid email or password") (removed per user)
      }
    } catch (err) {
      // toast.error("Failed to connect to the backend server.") (removed per user)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white font-sans text-gray-900">
      <div className="flex flex-col justify-center items-center w-full max-w-xl px-8 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-10 flex flex-col items-center text-center">
            {siteLogo ? (
              <div className="w-16 h-16 rounded-full overflow-hidden shadow-sm flex items-center justify-center bg-gray-50 border border-gray-100 mb-4">
                <img src={siteLogo} alt="Logo" className="w-full h-full object-contain" />
              </div>
            ) : (
              <div className="w-16 h-16 bg-gradient-to-br from-[#4c1d95] to-[#0f172a] rounded-full flex items-center justify-center shadow-sm mb-4">
                <div className="text-white text-xs font-bold tracking-wider">
                  {siteName.substring(0, 4).toUpperCase()}
                </div>
              </div>
            )}
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Welcome back
            </h1>
            <p className="text-gray-500 text-sm">
              Sign in to {siteName} Admin Panel
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <Input
                label="Email"
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <Input
                label="Password"
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-purple-600 text-white hover:bg-purple-700 rounded-md py-3 font-medium transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <rect width="10" height="10" x="1" y="1" fill="currentColor" rx="1">
                    <animate id="SVG7WybndBt" fill="freeze" attributeName="x" begin="0;SVGo3aOUHlJ.end" dur="0.2s" values="1;13" />
                    <animate id="SVGVoKldbWM" fill="freeze" attributeName="y" begin="SVGFpk9ncYc.end" dur="0.2s" values="1;13" />
                    <animate id="SVGKsXgPbui" fill="freeze" attributeName="x" begin="SVGaI8owdNK.end" dur="0.2s" values="13;1" />
                    <animate id="SVG7JzAfdGT" fill="freeze" attributeName="y" begin="SVG28A4To9L.end" dur="0.2s" values="13;1" />
                  </rect>
                  <rect width="10" height="10" x="1" y="13" fill="currentColor" rx="1">
                    <animate id="SVGUiS2jeZq" fill="freeze" attributeName="y" begin="SVG7WybndBt.end" dur="0.2s" values="13;1" />
                    <animate id="SVGU0vu2GEM" fill="freeze" attributeName="x" begin="SVGVoKldbWM.end" dur="0.2s" values="1;13" />
                    <animate id="SVGOIboFeLf" fill="freeze" attributeName="y" begin="SVGKsXgPbui.end" dur="0.2s" values="1;13" />
                    <animate id="SVG14lAaeuv" fill="freeze" attributeName="x" begin="SVG7JzAfdGT.end" dur="0.2s" values="13;1" />
                  </rect>
                  <rect width="10" height="10" x="13" y="13" fill="currentColor" rx="1">
                    <animate id="SVGFpk9ncYc" fill="freeze" attributeName="x" begin="SVGUiS2jeZq.end" dur="0.2s" values="13;1" />
                    <animate id="SVGaI8owdNK" fill="freeze" attributeName="y" begin="SVGU0vu2GEM.end" dur="0.2s" values="13;1" />
                    <animate id="SVG28A4To9L" fill="freeze" attributeName="x" begin="SVGOIboFeLf.end" dur="0.2s" values="1;13" />
                    <animate id="SVGo3aOUHlJ" fill="freeze" attributeName="y" begin="SVG14lAaeuv.end" dur="0.2s" values="13;1" />
                  </rect>
                </svg>
              ) : (
                "Continue"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
