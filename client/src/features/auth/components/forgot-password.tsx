import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { addServerErrors } from "~/utils";
import Button from "../../../components/ui/Button";
import Label from "../../../components/ui/label";
import { Modal } from "../../../components/ui/modal";
import TextInput from "../../../components/ui/text-input";
import { useForgotPassword } from "../hooks/useForgotPassword";

const ForgotPasswordModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const [msg, setMsg] = useState("");
  const mutation = useForgotPassword();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<{ email: string }>({
    resolver: zodResolver(z.object({ email: z.string().email() })),
  });

  const toggleModal = () => {
    setMsg("");
    setIsOpen(!isOpen);
  };

  const onSubmitReset = (data: { email: string }) => {
    setMsg("");
    mutation.mutate(data, {
      onError: (error) => {
        if (isAxiosError(error)) {
          if (error.response?.data.status === "FIELD_ERROR") {
            return addServerErrors(error.response.data.formFields, setError);
          }
        }
        // setMsg("An error occurred. Please try again.");
        // toast.error("An error occurred. Please try again.");
      },
      onSettled: () => {
        toast.success("Email has been sent successfully.");
        setIsOpen(false);
      },
    });
  };
  return (
    <Modal show={isOpen} onClose={toggleModal}>
      <form onSubmit={handleSubmit(onSubmitReset)}>
        <Modal.Header>Forgot Password</Modal.Header>
        <Modal.Body>
          <Label htmlFor="email">Email</Label>
          <TextInput error={errors?.email?.message} {...register("email")} />
          {msg && <p className="mt-2 text-sm text-red-600">{msg}</p>}
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          <Button
            onClick={handleSubmit(onSubmitReset)}
            loading={mutation.isPending}
            className="w-full sm:w-auto"
          >
            Send email
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ForgotPasswordModal;
