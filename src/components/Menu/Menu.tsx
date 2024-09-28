import React from "react";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {menusActions} from "../../store/Menu.store";
import LayoutMenus from "../Utilities/LayoutMenus";
import {useNavigate} from "react-router-dom";


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
      <div>
        <ul className="space-y-2 pt-8">
          <li className="hover:bg-gray-300 rounded-lg p-2 px-4 cursor-pointer" onClick={() => {
            navigate("/")
            closeMenuHandler()
          }}>
            Home
          </li>
          <li className="hover:bg-gray-300 rounded-lg p-2 px-4 cursor-pointer" onClick={() => {
            navigate("/myproducts")
            closeMenuHandler()
          }}>
            My Products
          </li>
          <li className="hover:bg-gray-300 rounded-lg p-2 px-4 cursor-pointer" onClick={() => {
            navigate("/orders")
            closeMenuHandler()
          }}>
            My Orders
          </li>
          {user.isSeller !== 'approved' && <li className="hover:bg-gray-700 rounded-lg p-2 px-4 cursor-pointer" onClick={() => {
            navigate("/becomeSeller")
            closeMenuHandler()
          }}>
            Become a seller
          </li>}
          <li className="hover:bg-gray-300 rounded-lg p-2 px-4 cursor-pointer" onClick={() => {
            closeMenuHandler()
            // dispatch(commonActions.showNotification({
            //   type:'Notification',
            //   visibility: true,
            //   message: 'Notification1'
            // }))
            navigate("/settings")
          }}>
            Settings
          </li>
        </ul>
      </div>
    </LayoutMenus>
  );
};

export default Menu;
