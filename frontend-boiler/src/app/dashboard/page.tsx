import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SideNav from "@/Components/SideNav";
import SubNav from "@/Components/SubNav";
import MobileNavigationBar from "@/Components/MobileNavigationBar";
import InnerWebsiteNavbar from "@/Components/InnerWebsiteNavbar";

export const metadata: Metadata = {
  title: "",
  description: "",
};

const inter = Inter({ subsets: ["latin"] });

export default function AMSLayout({ children }: { children: React.ReactNode }) {
  const links = [
    {
      href: "/test",
      text: "test",
      icon: "Compiler",
      excludeRoles: [], // u can leave this empty
    },
    {
      href: "/test",
      text: "test2",
      icon: "Compiler",
      excludeRoles: [], // u can leave this empty
    },
  ];
  return (
    <>
    
    </>
  );
}
