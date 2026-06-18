import dns from "node:dns/promises";
dns.setServers(["1.1.1.1", "8.8.8.8"]);
import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
import MainNavbar from "@/components/sheare/Navbar";
import Footer from "@/components/sheare/Footer";
import Providers from "@/lib/provider/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BodySync || Auth",
  description: "Fitness & Gym Management Platform",
};

export default function RootLayout({ children }) {
  return (
 
      <div >
        {/* <Providers> */}

          <MainNavbar />
          <main className="">
            {children}
          </main>
          <Footer />
        {/* </Providers> */}
      </div>
    
  );
}
