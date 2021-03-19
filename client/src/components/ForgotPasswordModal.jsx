import {
  Backdrop,
  Button,
  HelperText,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@windmill/react-ui";
import React, { useState } from "react";
import toast from "react-hot-toast";
import authService from "services/auth.service";
import PulseLoader from "react-spinners/PulseLoader";
import { useForm } from "react-hook-form";

const ForgotPasswordModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { handleSubmit, register, errors } = useForm();

  const toggleModal = () => {
    setMsg("");
    setIsOpen(!isOpen);
  };

  const onSubmitReset = (data) => {
    setMsg("");
    setIsSending(true);
    authService
      .forgotPassword(data.email)
      .then((data) => {
        if (data.data.status === "OK") {
          setIsSending(false);
          toast.success("Email has been sent successfully.");
          setIsOpen(false);
        }
      })
      .catch((error) => {
        setIsSending(false);
        setMsg(error.response.data);
      });
  };
  return (
    <div>
      <>
        {isOpen && <Backdrop />}
        <span
          onClick={() => setIsOpen(!isOpen)}
          className="mb-1 text-sm text-purple-700 cursor-pointer"
        >
          Forgot password?
        </span>
        <Modal isOpen={isOpen} onClose={toggleModal}>
            <form onSubmit={handleSubmit(onSubmitReset)}>
          <ModalHeader>Forgot Password</ModalHeader>
          <ModalBody>
              
            <Label>
              <span className="font-semibold">Email</span>
              <Input
              name="email"
                className="mt-1 border py-2 pl-2"
                valid
                type="email"
                inputMode="email"
                ref={register({
                  required: "Email required",
                  pattern: {
                    // eslint-disable-next-line no-useless-escape
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Email not valid",
                  },
                })}
              />
            </Label>
            {errors.email && errors.email.type === "required" && (
              <HelperText className="mt-2" valid={false}>{errors.email.message}</HelperText>
            )}
            {errors.email && errors.email.type === "pattern" && (
              <HelperText className="mt-2" valid={false}>{errors.email.message}</HelperText>
            )}
            {msg && <HelperText className="mt-2" valid={false}>{msg}</HelperText>}
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={handleSubmit(onSubmitReset)}
              disabled={isSending}
              className="w-full sm:w-auto"
            >
              {isSending ? (
                <PulseLoader size={10} color={"#0a138b"} />
              ) : (
                "Send email"
              )}
            </Button>
          </ModalFooter>
          </form>
        </Modal>
      </>
    </div>
  );
};

export default ForgotPasswordModal;
