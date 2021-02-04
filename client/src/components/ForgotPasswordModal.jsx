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
import authService from "services/auth.service";

const ForgotPasswordModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const toggleModal = () => {
    setEmail("");
    setIsOpen(!isOpen);
  };

  const handleSubmit = () => {
    setMsg("");
    authService
      .forgotPassword(email)
      .then((data) => {
        if (data.data.status === "OK")
          setMsg("Email has been sent successfully.");
      })
      .catch((error) => {
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
          <ModalHeader>Forgot Password</ModalHeader>
          <ModalBody>
            <Label>
              <span className="font-semibold">Email</span>
              <Input
                className="mt-1 border py-2 pl-2"
                valid
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                inputMode="email"
              />
            </Label>
            {msg && <HelperText valid={false}>{msg}</HelperText>}
          </ModalBody>
          <ModalFooter>
            <Button
              className="w-full sm:w-auto"
              layout="outline"
              onClick={toggleModal}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="w-full sm:w-auto">
              Send mail
            </Button>
          </ModalFooter>
        </Modal>
      </>
    </div>
  );
};

export default ForgotPasswordModal;
