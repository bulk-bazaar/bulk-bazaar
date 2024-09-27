import React from "react";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {menusActions} from "../../store/Menu.store";
import LayoutMenus from "../Utilities/LayoutMenus";
import {useNavigate} from "react-router-dom";


const classLinkActive =
  "text-rose-600 bg-violet-100 border-r-4 border-rose-500 dark:bg-slate-700/[.2] dark:text-slate-200 dark:border-slate-200";

const Menu: React.FC = () => {
  const menuOpen = useAppSelector((state) => state.menu.menuHeaderOpened);
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
            <h2 className="text-lg font-semibold">{user.firstName}.{user.lastName}</h2>
            <p className="text-sm text-gray-400 break-all">{user.email}</p>
          </div>
        </div>
        <ul className="space-y-2 pt-8">
          <li className="hover:bg-gray-700 rounded-lg p-2 px-4 cursor-pointer" onClick={() => {
            navigate("/")
            closeMenuHandler()
          }}>
            Home
          </li>
          <li className="hover:bg-gray-700 rounded-lg p-2 px-4 cursor-pointer">
            My Account
          </li>
          <li className="hover:bg-gray-700 rounded-lg p-2 px-4 cursor-pointer" onClick={() => {
            navigate("/orders")
            closeMenuHandler()
          }}>
            My Orders
          </li>
          <li className="hover:bg-gray-700 rounded-lg p-2 px-4 cursor-pointer" onClick={() => {
            navigate("/becomeSeller")
            closeMenuHandler()
          }}>
            Become a seller
          </li>
        </ul>
      </div>
    </LayoutMenus>
  );
};

export default Menu;
