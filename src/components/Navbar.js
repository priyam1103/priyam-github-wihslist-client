import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Icon, Menu } from "semantic-ui-react";
import { GlobalContext } from "../context/GlobalState";
export default function Navbar() {
  const { logout } = useContext(GlobalContext);

  return (
    <div className="navbar">
      <Menu secondary>
        <Menu.Item className="pointer">
          <Link to="/">
            {" "}
            <Icon color="blue" name="home" size="large" />
          </Link>
        </Menu.Item>
        <Menu.Item className="pointer">
          <Link to="/findusers">
            <Icon name="users" color="blue" size="large" />
          </Link>
        </Menu.Item>
        <Menu.Item className="pointer">
          <Link to="/mylist">
            <Icon name="star" color="blue" size="large" />
          </Link>
        </Menu.Item>
        <Menu.Item className="pointer">
          <Link to="/">
            {" "}
            <Icon
              color="blue"
              onClick={() => {
                logout();
              }}
              name="power"
              size="large"
            />
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  );
}
