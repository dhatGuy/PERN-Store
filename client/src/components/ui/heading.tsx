import React from "react";

interface HeadingProps {
  order?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({ order = 1, children, className = "" }) => {
  const Tag = `h${order}` as keyof JSX.IntrinsicElements;

  const baseStyles = "font-bold leading-tight";
  const sizeStyles = {
    1: "text-4xl md:text-5xl",
    2: "text-3xl md:text-4xl",
    3: "text-2xl md:text-3xl",
    4: "text-xl md:text-2xl",
    5: "text-lg md:text-xl",
    6: "text-base md:text-lg",
  };

  const headingClass = `${baseStyles} ${sizeStyles[order]} ${className}`;

  return <Tag className={headingClass}>{children}</Tag>;
};

export default Heading;
