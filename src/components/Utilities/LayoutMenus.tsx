import React, { ReactNode } from "react";
import useScreenMedia from "../hooks/useScreenMedia";

const LayoutMenus: React.FC<{
  menuOpen: boolean;
  children: ReactNode;
  closeMenuHandler: () => void;
  className?: string;
}> = ({ menuOpen, children, closeMenuHandler, className }) => {
  const mediaQueries = useScreenMedia();

  return (
    <>
      <div
        className={`h-screen w-60 xl:w-2/12 fixed bg-white dark:bg-slate-800 z-20 ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        {children}
      </div>
      {menuOpen && (
        <div
          className="fixed bg-slate-600/[.2] w-full h-full z-10 top-0 left-0"
          onClick={closeMenuHandler}
        ></div>
      )}
    </>
  );
};

export default LayoutMenus;
