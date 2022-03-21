import { Menu } from 'antd'
import Link from 'next/link';
import {
  LoginOutlined,
  AppstoreOutlined,
  UserAddOutlined,
  CoffeeOutlined
} from '@ant-design/icons';
import { useEffect, useState, useContext } from 'react';

import { Context } from '../context/userContext'
import SubMenu from 'antd/lib/menu/SubMenu';

const { Item } = Menu;

const TopNav = () => {
  const { state, dispatch } = useContext(Context)
  const [current, setCurrent] = useState("");
  const {user} = state;
  useEffect(() => {
    process.browser && setCurrent(window.location.pathname)
  }, [process.browser && window.location.pathname]);

  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    // const { data } = await axios.get("/api/logout");
    // toast(data.message);
    // router.push("/login");
  };

  const preAuthNav = () => {
    return (
      <Menu mode='horizontal' selectedKeys={[current]}>
      
        <Item key="/login" onClick={(e) => setCurrent(e.key)} icon={<LoginOutlined />}>
          <Link href="/login">
            <a>Login</a>
          </Link>
        </Item>
        <Item key="/register" onClick={(e) => setCurrent(e.key)} icon={<UserAddOutlined />}>
          <Link href="/register">
            <a>Register</a>
          </Link>
        </Item>
      </Menu>
    )
  }

  const postAuthNav = () => {
    return (
      <SubMenu
        icon={<CoffeeOutlined />}
        title={user && user.name}
        className="float-right"
      >
        <Item onClick={logout} className="float-right">
          Logout
        </Item>
      </SubMenu>
    )
  }

  return (
    <Menu mode='horizontal' selectedKeys={[current]}>
      <Item key="/" onClick={(e) => setCurrent(e.key)} icon={<AppstoreOutlined />}>
        <Link href="/">
          <a>App</a>
        </Link>
      </Item>
      {
        user ? postAuthNav() : preAuthNav()
      }
    </Menu>
  )
}

export default TopNav