"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { IconType } from "react-icons";

interface SidebarItemProps {
  label: string;
  href?: string;
  icon: IconType;
  onClick?: () => void;
  auth?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  href,
  icon: Icon,
  onClick,
  auth,
}) => {
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();
  const router = useRouter();
  const handleClick = useCallback(async () => {
    if (onClick) {
      return onClick();
    }

    if (auth && !currentUser.id) {
      loginModal.onOpen();
    } else if (href) {
      router.push(href);
    }
  }, [router, onClick, href, currentUser, auth, loginModal]);
  return (
    <div onClick={handleClick} className="flex flex-row items-center">
      <div className="relative md:hidden rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg--opacity-10 bg-slate-300 cursor-pointer">
        <Icon size={28} color="white" />
      </div>
      <div className="relative hidden md:flex items-center gap-4 p-4 rounded-full hover:bg-slate-300 cursor-pointer ">
        <Icon size={24} color="white" />
        <p className="text-white ">{label}</p>
      </div>
    </div>
  );
};

export default SidebarItem;
