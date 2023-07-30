"use client";
import React, { useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Button from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
}) => {
  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    onClose();
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [disabled, onSubmit]);

  if (!isOpen) {
    return null;
  }
  return (
    <>
      <div className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-10 outline-none focus:outline-none bg-neutral-700 bg-opacity-70">
        <div className="relative  w-full  mx-auto h-full ">
          <div className="h-full justify-center items-center border-0  rounded-lg shadow-lg relative flex flex-col w-full bg-block outline-none focus:outline-none">
            <div className="flex flex-col w-1/2 items-center gap-4 bg-black justify-between p-2 rounded-t">
              <div className="w-full flex justify-between items-center">
                <h3 className="text-3xl font-semibold text-white">{title}</h3>
                <button
                  onClick={handleClose}
                  className="p-1 ml-auto border-0 text-white hover:opacity-70 transition">
                  <AiOutlineClose size={20} />
                </button>
              </div>
              <div className="relative p-10 flex-auto">{body}</div>
              <div className="flex flex-col gap-2 ">
                <Button
                  disabled={disabled}
                  label={actionLabel}
                  secondary
                  fullWidth
                  large
                  onClick={handleSubmit}
                />
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
