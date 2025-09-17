import { Navigate } from "react-router";
import { Menu, Button } from "antd";

const Navbar = () => {
  return (
    <div className="bg-red-600 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white">
          Khoon <span className="text-yellow-300">Connect</span>
        </Link>

        {/* Menu */}
        <Menu
          mode="horizontal"
          theme="dark"
          className="bg-red-600 border-none hidden md:flex"
        >
          <Menu.Item key="1">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/findblood">Find Blood</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/requestblood">Request Blood</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/events">Events</Link>
          </Menu.Item>
        </Menu>

        {/* Auth buttons */}
        <div className="space-x-2">
          <Link to="/login">
            <Button type="default" className="text-red-600">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button type="primary" className="bg-yellow-400 text-red-900 border-none">
              Register
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
