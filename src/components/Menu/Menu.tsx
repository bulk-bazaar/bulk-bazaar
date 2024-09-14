import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { menusActions } from "../../store/Menu.store";
import BtnAddTask from "../Utilities/BtnAddTask";
import Directories from "./Directories/Directories";
import NavLinks from "./NavLinks";
import LayoutMenus from "../Utilities/LayoutMenus";
import Footer from "../Footer";


const classLinkActive =
  "text-rose-600 bg-violet-100 border-r-4 border-rose-500 dark:bg-slate-700/[.2] dark:text-slate-200 dark:border-slate-200";

const Menu: React.FC = () => {
  const menuOpen = useAppSelector((state) => state.menu.menuHeaderOpened);
  const dispatch = useAppDispatch();

  const closeMenuHandler = () => {
    dispatch(menusActions.closeMenuHeader());
  };
  return (
    <LayoutMenus
      menuOpen={menuOpen}
      closeMenuHandler={closeMenuHandler}
      className="left-0"
    >
      {/*<header className="h-full flex flex-col">*/}
      {/*  <h1 className="font-bold text-center mt-8 text-lg tracking-wide">*/}
      {/*    Bulk-Bazaar*/}
      {/*  </h1>*/}
      {/*  <BtnAddTask className="my-8 mx-4" />*/}
      {/*  <NavLinks classActive={classLinkActive} />*/}
      {/*  <Directories classActive={classLinkActive} />*/}
      {/*</header>*/}
      {/*<Footer />*/}
      <div>
        <div className="flex items-center space-x-4 h-40 bg-slate-200 dark:bg-slate-900">
          <img
              className="w-12 h-12 rounded-full"
              src="https://cdn-icons-png.freepik.com/512/146/146035.png"
              alt="Profile"
          />
          <div>
            <h2 className="text-lg font-semibold">John Doe</h2>
            <p className="text-sm text-gray-400">johndoe@example.com</p>
          </div>
        </div>
        <ul className="space-y-2 pt-8">
          <li className="hover:bg-gray-700 rounded-lg p-2 px-4 cursor-pointer">
            Home
          </li>
          <li className="hover:bg-gray-700 rounded-lg p-2 px-4 cursor-pointer">
            My Account
          </li>
          <li className="hover:bg-gray-700 rounded-lg p-2 px-4 cursor-pointer">
            My Orders
          </li>
          <li className="hover:bg-gray-700 rounded-lg p-2 px-4 cursor-pointer">
            Refer & Earn
          </li>
        </ul>
      </div>
    </LayoutMenus>
  );
};

export default Menu;
