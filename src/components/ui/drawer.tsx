
"use client";

import React, { createContext, useContext } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const drawerVariants = cva(
  "fixed bg-card text-card-foreground shadow-xl flex flex-col",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 h-1/3",
        bottom: "inset-x-0 bottom-0 h-1/3",
        left: "inset-y-0 left-0 w-80",
        right: "inset-y-0 right-0 w-80",
      },
    },
    defaultVariants: {
      side: "left",
    },
  }
);

interface DrawerContextProps {
  open: boolean;
  onClose: () => void;
}

const DrawerContext = createContext<DrawerContextProps | undefined>(undefined);

const useDrawer = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error("useDrawer must be used within a DrawerProvider");
  }
  return context;
};

interface DrawerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof drawerVariants> {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Drawer = ({
  open,
  onClose,
  side = "left",
  children,
  className,
  ...props
}: DrawerProps) => {
  const variants = {
    left: { x: "-100%" },
    right: { x: "100%" },
    top: { y: "-100%" },
    bottom: { y: "100%" },
  };

  const dragConstraints = {
    left: { left: 0, right: 0 },
    right: { left: 0, right: 0 },
    top: { top: 0, bottom: 0 },
    bottom: { top: 0, bottom: 0 },
  };

  const dragElastic = {
    left: 0.2,
    right: 0.2,
    top: 0.2,
    bottom: 0.2,
  };

  const onDragEnd = (event: any, info: any) => {
    const threshold = 100; // pixels
    if (side === "left" && info.offset.x < -threshold) {
      onClose();
    } else if (side === "right" && info.offset.x > threshold) {
      onClose();
    } else if (side === "top" && info.offset.y < -threshold) {
      onClose();
    } else if (side === "bottom" && info.offset.y > threshold) {
      onClose();
    }
  };

  return (
    <DrawerContext.Provider value={{ open, onClose }}>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          <motion.div
            className={cn(drawerVariants({ side }), className, "z-50")}
            initial={side ? variants[side] : false}
            animate={{ x: 0, y: 0 }}
            exit={side ? variants[side] : false}
            transition={{ duration: 0.3, ease: "easeOut" }}
            drag={side === "left" || side === "right" ? "x" : "y"}
            dragConstraints={
              side ? dragConstraints[side as keyof typeof dragConstraints] : {}
            }
            dragElastic={side ? dragElastic[side as keyof typeof dragElastic] : 0}
            onDragEnd={onDragEnd}
            {...props}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </DrawerContext.Provider>
  );
};

interface DrawerHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const DrawerHeader = ({ children, className, ...props }: DrawerHeaderProps) => {
  return (
    <div
      className={cn("flex flex-col space-y-2 p-4 text-center sm:text-left", className)}
      {...props}
    >
      {children}
    </div>
  );
};

interface DrawerTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

const DrawerTitle = ({ children, className, ...props }: DrawerTitleProps) => {
  return (
    <h2 className={cn("text-lg font-semibold", className)} {...props}>
      {children}
    </h2>
  );
};

interface DrawerDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

const DrawerDescription = ({
  children,
  className,
  ...props
}: DrawerDescriptionProps) => {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props}>
      {children}
    </p>
  );
};

interface DrawerContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const DrawerContent = ({ children, className, ...props }: DrawerContentProps) => {
  return (
    <div className={cn("flex-1 p-4 overflow-auto", className)} {...props}>
      {children}
    </div>
  );
};

interface DrawerFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const DrawerFooter = ({ children, className, ...props }: DrawerFooterProps) => {
  return (
    <div
      className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 p-4", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export {
  Drawer,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerContent,
  DrawerFooter,
  useDrawer,
};
