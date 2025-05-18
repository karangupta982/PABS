"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SideNav from "@/Components/SideNav";
import SubNav from "@/Components/SubNav";
import MobileNavigationBar from "@/Components/MobileNavigationBar";
import InnerWebsiteNavbar from "@/Components/InnerWebsiteNavbar";

import ConfirmationModal, { ConfirmationModalTrigger } from "@/Components/ui/ConfirmationModal";
import Button from "@/Components/ui/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";

// export const metadata: Metadata = {
//   title: "",
//   description: "",
// };

const inter = Inter({ subsets: ["latin"] });

export default function AMSLayout({ children }: { children: React.ReactNode }) {
    const role = JSON.parse(localStorage.getItem("role"));
  var links = [
    {
      href: "/dashboard/admin/assign",
      text: "Assign",
      icon: "Compiler",
      excludeRoles: [], // u can leave this empty
    },
    {
      href: `/dashboard/${role}/courses`,
      text: "Courses",
      icon: "Compiler",
      excludeRoles: [], // u can leave this empty
    },
    
  ];

  


  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleConfirm = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.replace("/login");
    // console.log("Action confirmed!");
    setIsOpen(false);
  };

  return (
    <div
      className={`${inter.className} flex flex-col h-screen overflow-hidden bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100`}
    >
      <div className="relative z-NavBar" id="secondaryNav">
        <InnerWebsiteNavbar />
      </div>
      <main className="flex flex-1 w-full max-w-full overflow-hidden rounded-lg mb-3">
        <SideNav links={links} />
        <div className="shadow m-0 lg:m-3 w-full h-full flex flex-col p-0.5 rounded-md bg-white dark:bg-gray-900 overflow-hidden">
          <SubNav />
          <div className="p-0 lg:p-1.5 my-1.5 bg-gray-50 dark:bg-gray-800 flex-1 rounded-md overflow-auto">
            {children}

            <div className="relative left-[63vw] top-[2vh]">
            <Button onClick={() => setIsOpen(true)}>Logout</Button>
            </div>
      
      <ConfirmationModal
        isOpen={isOpen}
        title="Logout"
        message="Are you sure you want to Logout? This action cannot be undone."
        confirmText="Logout"
        onCancel={() => setIsOpen(false)}
        onConfirm={handleConfirm}
      />
          </div>
          {/* <div className="w-full h-14 block lg:hidden absolute bottom-0">
            <MobileNavigationBar navItems={links} />
          </div> */}
        </div>
      </main>
    </div>
  );
}
