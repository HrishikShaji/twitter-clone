"use client";
import Header from "@/components/Header";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import useUser from "@/hooks/useUser";
import { ClipLoader } from "react-spinners";
import UserHero from "@/components/UserHero";
import UserBio from "@/components/UserBio";
import EditModal from "@/app/modals/EditModal";
import { Toaster } from "react-hot-toast";
import PostFeed from "@/components/PostFeed";

const page = () => {
  const router = useRouter();
  const { userId } = useParams();

  const { data: fetchedUser, isLoading } = useUser(userId as string);

  if (isLoading || !fetchedUser) {
    return (
      <div className="flex justify-center items-center h-full ">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <>
      <Toaster />
      <EditModal />
      <Header showBackArrow label={fetchedUser?.name} />
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />
      <PostFeed onlyUser={true} userId={userId as string} />
    </>
  );
};

export default page;
