import React, { createContext, PropsWithChildren, useContext } from "react";
import { X } from "react-feather";
import { cn } from "~/utils";

type ThemeType = {
  root: {
    base: string;
    show: {
      on: string;
      off: string;
    };
    sizes: {
      [key: string]: string;
    };
    positions: {
      [key: string]: string;
    };
  };
  content: {
    base: string;
    inner: string;
  };
  body: {
    base: string;
    popup: string;
  };
  header: {
    base: string;
    popup: string;
    title: string;
    close: {
      base: string;
      icon: string;
    };
  };
  footer: {
    base: string;
    popup: string;
  };
};

type ModalContextType = {
  onClose: () => void;
  theme: ThemeType;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

type ModalProps = {
  show: boolean;
  onClose: () => void;
  size?: keyof ThemeType["root"]["sizes"];
  position?: keyof ThemeType["root"]["positions"];
};

type ModalHeaderProps = {
  className?: string;
};

type ModalBodyProps = {
  className?: string;
};

type ModalFooterProps = {
  className?: string;
};

const theme: ThemeType = {
  root: {
    base: "fixed inset-x-0 top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
    show: {
      on: "flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80",
      off: "hidden",
    },
    sizes: {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
      "2xl": "max-w-2xl",
      "3xl": "max-w-3xl",
      "4xl": "max-w-4xl",
      "5xl": "max-w-5xl",
      "6xl": "max-w-6xl",
      "7xl": "max-w-7xl",
    },
    positions: {
      "top-left": "items-start justify-start",
      "top-center": "items-start justify-center",
      "top-right": "items-start justify-end",
      "center-left": "items-center justify-start",
      center: "items-center justify-center",
      "center-right": "items-center justify-end",
      "bottom-right": "items-end justify-end",
      "bottom-center": "items-end justify-center",
      "bottom-left": "items-end justify-start",
    },
  },
  content: {
    base: "relative h-full w-full p-4 md:h-auto",
    inner: "relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700",
  },
  body: {
    base: "flex-1 overflow-auto p-6",
    popup: "pt-0",
  },
  header: {
    base: "flex items-start justify-between rounded-t border-b p-5 dark:border-gray-600",
    popup: "border-b-0 p-2",
    title: "text-xl font-medium text-gray-900 dark:text-white",
    close: {
      base: "ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
      icon: "h-5 w-5",
    },
  },
  footer: {
    base: "flex items-center space-x-2 rounded-b border-gray-200 p-6 dark:border-gray-600",
    popup: "border-t",
  },
};

export const Modal: React.FC<PropsWithChildren<ModalProps>> & {
  Header: React.FC<PropsWithChildren<ModalHeaderProps>>;
  Body: React.FC<PropsWithChildren<ModalBodyProps>>;
  Footer: React.FC<PropsWithChildren<ModalFooterProps>>;
} = ({ children, show, onClose, size = "md", position = "center" }) => {
  return (
    <div
      className={`${theme.root.base} ${show ? theme.root.show.on : theme.root.show.off} ${theme.root.positions[position]}`}
    >
      <div className={`${theme.content.base} ${theme.root.sizes[size]}`}>
        <div className={theme.content.inner}>
          <ModalContext.Provider value={{ onClose, theme }}>{children}</ModalContext.Provider>
        </div>
      </div>
    </div>
  );
};

const ModalHeader: React.FC<PropsWithChildren<ModalHeaderProps>> = ({ children, className }) => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("ModalHeader must be used within a Modal");
  const { onClose, theme } = context;

  return (
    <div className={cn(theme.header.base, className)}>
      <h3 className={theme.header.title}>{children}</h3>
      <button type="button" className={theme.header.close.base} onClick={onClose}>
        <X className={theme.header.close.icon} />
      </button>
    </div>
  );
};

const ModalBody: React.FC<PropsWithChildren<ModalBodyProps>> = ({ children, className }) => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("ModalBody must be used within a Modal");
  const { theme } = context;

  return <div className={cn(theme.body.base, className)}>{children}</div>;
};

const ModalFooter: React.FC<PropsWithChildren<ModalFooterProps>> = ({ className, children }) => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("ModalFooter must be used within a Modal");
  const { theme } = context;

  return <div className={cn(theme.footer.base, className)}>{children}</div>;
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
