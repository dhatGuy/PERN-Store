import clsx, { ClassValue } from "clsx";
import { UseFormSetError } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type FormFields = [{ error: string; id: string }];

export function addServerErrors(formFields: FormFields, setError: UseFormSetError<any>) {
  formFields.forEach((field) => {
    setError(
      field.id,
      {
        type: "server",
        message: field.error,
      },
      { shouldFocus: true }
    );
  });
}
