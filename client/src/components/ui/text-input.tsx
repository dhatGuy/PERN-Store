import React, { forwardRef } from "react";
import { cn } from "~/utils";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  addon?: React.ReactNode;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  shadow?: boolean;
  sizing?: "sm" | "md" | "lg";
  color?: "gray" | "info" | "failure" | "warning" | "success";
  error?: string;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    { className, addon, icon, rightIcon, shadow, sizing = "md", color = "gray", error, ...props },
    ref
  ) => {
    return (
      <div className={cn("flex flex-col", className)}>
        <div className="flex">
          {addon && <span className={styles.addon}>{addon}</span>}
          <div className={styles.field.base}>
            {icon && <div className={styles.field.icon.base}>{icon}</div>}
            <input
              ref={ref}
              className={cn(
                styles.field.input.base,
                styles.field.input.sizes[sizing],
                styles.field.input.colors[color],
                styles.field.input.withIcon[icon ? "on" : "off"],
                styles.field.input.withRightIcon[rightIcon ? "on" : "off"],
                styles.field.input.withAddon[addon ? "on" : "off"],
                styles.field.input.withShadow[shadow ? "on" : "off"],
                error && styles.field.input.colors.failure
              )}
              {...props}
            />
            {rightIcon && <div className={styles.field.rightIcon.base}>{rightIcon}</div>}
          </div>
        </div>
        {error && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{error}</p>}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;

const styles = {
  base: "flex",
  addon:
    "inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400",
  field: {
    base: "relative w-full",
    icon: {
      base: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3",
      svg: "h-5 w-5 text-gray-500 dark:text-gray-400",
    },
    rightIcon: {
      base: "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3",
      svg: "h-5 w-5 text-gray-500 dark:text-gray-400",
    },
    input: {
      base: "block w-full border disabled:cursor-not-allowed disabled:opacity-50",
      sizes: {
        sm: "p-2 sm:text-xs",
        md: "p-2.5 text-sm",
        lg: "p-4 sm:text-base",
      },
      colors: {
        gray: "border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
        info: "border-cyan-500 bg-cyan-50 text-cyan-900 placeholder-cyan-700 focus:border-cyan-500 focus:ring-cyan-500 dark:border-cyan-400 dark:bg-cyan-100 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
        failure:
          "border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-100 dark:focus:border-red-500 dark:focus:ring-red-500",
        warning:
          "border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500",
        success:
          "border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100 dark:focus:border-green-500 dark:focus:ring-green-500",
      },
      withRightIcon: {
        on: "pr-10",
        off: "",
      },
      withIcon: {
        on: "pl-10",
        off: "",
      },
      withAddon: {
        on: "rounded-r-lg",
        off: "rounded-lg",
      },
      withShadow: {
        on: "shadow-sm dark:shadow-sm-light",
        off: "",
      },
    },
  },
};
