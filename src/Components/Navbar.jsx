// src/Components/Navbar.jsx
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { logout } from "../slices/authSlice";
import logo from '../assets/logo.png'

const Navbar = () => {
  const { isLoggedIn, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="shadow-md bg-red-200">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <span
          className="text-xl font-bold text-red-600 cursor-pointer"
          onClick={() => handleClick("/")}
        >
        
        <img src={logo} alt="" className="w-20 h-15"/>
        
        </span>

        {/* Menu */}
        <Menu mode="horizontal" selectable={false} 
        className="border-0 bg-red-20">
          {!isLoggedIn ? (
            <>
              <Menu.Item key="home" 
              className="!bg-red-300 hover:!bg-red-400"
              onClick={() => handleClick("/")}>
                Home
              </Menu.Item>
              <Menu.Item key="Find Blood" 
              className="!bg-red-300 hover:!bg-red-400"
              onClick={() => handleClick("/FindBlood")}>
                Login
              </Menu.Item>
              <Menu.Item key="Donate" 
              className="!bg-red-300 hover:!bg-red-400"
              onClick={() => handleClick("/RequestBlood")}>
                Register
              </Menu.Item>
            </>
          ) : (
            <>
              <Menu.Item key="dashboard" onClick={() => handleClick("/dashboard")}>
                Dashboard
              </Menu.Item>
              <Menu.Item key="findblood" onClick={() => handleClick("/findblood")}>
                Find Blood
              </Menu.Item>
              <Menu.Item key="requestblood" onClick={() => handleClick("/requestblood")}>
                Request Blood
              </Menu.Item>
              <Menu.Item key="logout" onClick={handleLogout}>
                Logout ({role})
              </Menu.Item>
            </>
          )}
        </Menu>
      </div>
    </div>
  );
};

export default Navbar;
