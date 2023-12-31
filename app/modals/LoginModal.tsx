"use client";
import Modal from "@/components/Modal";
import useLoginModal from "@/hooks/useLoginModal";
import React, { useCallback, useState } from "react";
import RegisterModal from "./RegisterModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { signIn } from "next-auth/react";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isloading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    if (isloading) {
      return;
    }

    loginModal.onClose();
    registerModal.onOpen();
  }, [isloading, registerModal, loginModal]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await signIn("credentials", { email, password });
      loginModal.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [loginModal, email, password]);
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isloading}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isloading}
      />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        New User?{" "}
        <span
          onClick={onToggle}
          className="text-white cursor-pointer hover:underline">
          Sign Up
        </span>
      </p>
    </div>
  );
  return (
    <Modal
      disabled={isloading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Sign in"
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
