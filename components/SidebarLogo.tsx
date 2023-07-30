"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { BsTwitter } from "react-icons/bs";

const SidebarLogo = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/")}
      className="rounded-full h-14 w-14 p-4  flex items-center justify-center hover:bg-opacity-10 transition bg-blue-300 md:bg-transparent cursor-pointer ">
      <BsTwitter size={25} color="white" />
    </div>
  );
};

export default SidebarLogo;
