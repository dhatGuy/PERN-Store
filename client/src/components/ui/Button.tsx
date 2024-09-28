import { PulseLoader } from "react-spinners";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  spinner?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  spinner,
  ...props
}) => {
  const baseStyles =
    "font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 ease-in-out";

  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500",
    outline:
      "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const spinnerSizes = {
    sm: 8,
    md: 10,
    lg: 12,
  };

  const buttonClasses = `
      ${baseStyles} 
      ${variantStyles[variant]} 
      ${sizeStyles[size]} 
      ${className || ""}
      ${loading || disabled ? "opacity-50 cursor-not-allowed" : ""}
    `;

  const SpinnerComponent = spinner || <PulseLoader size={spinnerSizes[size]} className="mr-2" />;

  return (
    <button className={buttonClasses} disabled={loading || disabled} {...props}>
      <span>
        {loading ? (
          <span className="flex items-center justify-center">{SpinnerComponent}</span>
        ) : (
          children
        )}
      </span>
    </button>
  );
};

export default Button;
