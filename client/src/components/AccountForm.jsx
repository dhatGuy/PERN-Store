import { Button, HelperText, Input, Label } from "@windmill/react-ui";
import { useUser } from "context/UserContext";
import { useState } from "react";
import { useForm } from "react-hook-form";
import PulseLoader from "react-spinners/PulseLoader";

const AccountForm = ({ setShowSettings, userData }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      fullname: userData?.fullname,
      email: userData?.email,
      username: userData?.username,
      address: userData?.address,
      country: userData?.country,
      city: userData?.city,
      state: userData?.state,
    },
  });
  const [validationError, setValidationError] = useState();
  const [isSaving, setIsSaving] = useState(false);
  const { updateUserData } = useUser();

  const onSubmit = async (data) => {
    setValidationError();
    setIsSaving(true);
    try {
      await updateUserData(data);
      setShowSettings(false);
      setIsSaving(false);
    } catch (error) {
      setIsSaving(false);
      setValidationError(error.response.data.message);
    }
  };

  return (
    <section className="grid place-items-center pt-4 mt-10">
      <div className="w-full md:w-1/2 shadow-md overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 capitalize">
            Account settings
          </h3>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border-t border-gray-200 grid grid-cols-1"
        >
          <Label className="bg-gray-50 px-4 py-5">
            <span className="text-sm font-medium text-gray-500 w-1/4">Full name</span>
            <Input
              name="fullname"
              {...register("fullname")}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </Label>
          <Label className="bg-white px-4 py-5 ">
            <span className="text-sm font-medium text-gray-500">Username</span>
            <Input
              name="username"
              {...register("username")}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
            {validationError && <HelperText valid={false}>{validationError.username}</HelperText>}
          </Label>
          <div className="bg-gray-50 px-4 py-5 ">
            <span className="text-sm font-medium text-gray-500">Email address</span>
            <Input
              name="email"
              {...register("email", {
                required: "Email required",
                pattern: {
                  // eslint-disable-next-line no-useless-escape
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Email not valid",
                },
              })}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
            {validationError && <HelperText valid={false}>{validationError.email}</HelperText>}
          </div>
          <div className="bg-white px-4 py-5 ">
            <span className="text-sm font-medium text-gray-500">Address</span>
            <Input
              name="address"
              {...register("address")}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>
          <div className="bg-gray-50 px-4 py-5 ">
            <span className="text-sm font-medium text-gray-500">City</span>
            <Input
              name="city"
              {...register("city")}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>
          <div className="bg-white px-4 py-5 ">
            <span className="text-sm font-medium text-gray-500">State</span>
            <Input
              name="state"
              {...register("state")}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>
          <div className="bg-gray-50 px-4 py-5 ">
            <span className="text-sm font-medium text-gray-500">Country</span>
            <Input
              name="country"
              {...register("country")}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>
          <div className="px-4 py-5 space-x-4">
            <Button disabled={isSaving} type="submit">
              {isSaving ? <PulseLoader color={"#0a138b"} size={10} loading={isSaving} /> : "Save"}
            </Button>
            <Button disabled={isSaving} onClick={() => setShowSettings(false)} layout="outline">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AccountForm;
