"use client";
import Header from "@/components/Header";
import Modal from "@/components/Modal";

import Image from "next/image";
import LoginModal from "./modals/LoginModal";
import RegisterModal from "./modals/RegisterModal";
import { useSession } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import EditModal from "./modals/EditModal";
import Form from "@/components/Form";
import PostFeed from "@/components/PostFeed";
import useCurrentUser from "@/hooks/useCurrentUser";

export default function Home() {
  const session = useSession();
  const { data: currentUser } = useCurrentUser();
  console.log(session);
  return (
    <>
      <Toaster />
      <EditModal />
      <LoginModal />
      <RegisterModal />
      <main className="">
        <Header label="Home" />
        <Form placeholder="What's happening" />
        <PostFeed onlyUser={false} />
      </main>
    </>
  );
}
