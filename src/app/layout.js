import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers/Providers";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Eon Assets Mining Dashboard",
  description: "Eon Assets Mining Dashboard Administration",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} font-sans h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
