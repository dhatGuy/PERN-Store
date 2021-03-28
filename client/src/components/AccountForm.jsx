import { Button, HelperText, Input, Label } from "@windmill/react-ui";
import { useUser } from "context/UserContext";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const AccountForm = ({ setShowSettings, userData }) => {
  const { register, handleSubmit, setValue } = useForm();
  const [validationError, setValidationError] = useState();
  const { updateUserData } = useUser();

  useEffect(() => {
    setValue("fullname", userData?.fullname);
    setValue("email", userData?.email);
    setValue("username", userData?.username);
    setValue("address", userData?.address);
    setValue("country", userData?.country);
    setValue("city", userData?.city);
    setValue("state", userData?.state);
  }, [setValue, userData]);

  const onSubmit = async ({ fullname, email, username }) => {
    setValidationError();
    try {
      await updateUserData(fullname, email, username);
      setShowSettings(false);
    } catch (error) {
      setValidationError(error.response.data);
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
            <span className="text-sm font-medium text-gray-500 w-1/4">
              Full name
            </span>
            <Input
              name="fullname"
              ref={register}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </Label>
          <Label className="bg-white px-4 py-5 ">
            <span className="text-sm font-medium text-gray-500">Username</span>
            <Input
              name="username"
              ref={register}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
            {validationError && (
              <HelperText valid={false}>{validationError.username}</HelperText>
            )}
          </Label>
          <div className="bg-gray-50 px-4 py-5 ">
            <span className="text-sm font-medium text-gray-500">
              Email address
            </span>
            <Input
              name="email"
              ref={register}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
            {validationError && (
              <HelperText valid={false}>{validationError.email}</HelperText>
            )}
          </div>
          <div className="bg-white px-4 py-5 ">
            <span className="text-sm font-medium text-gray-500">Address</span>
            <Input
              name="address"
              ref={register}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>
          <div className="bg-gray-50 px-4 py-5 ">
            <span className="text-sm font-medium text-gray-500">City</span>
            <Input
              name="city"
              ref={register}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>
          <div className="bg-white px-4 py-5 ">
            <span className="text-sm font-medium text-gray-500">State</span>
            <Input
              name="state"
              ref={register}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>
          <div className="bg-gray-50 px-4 py-5 ">
            <span className="text-sm font-medium text-gray-500">Country</span>
            <Input
              name="country"
              ref={register}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>
          <div className="px-4 py-5 ">
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AccountForm;
