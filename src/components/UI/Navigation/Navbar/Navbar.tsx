import React from 'react';
import styles from './Navbar.module.css';
import Container from '../../Container/Container';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import { MAIN_ROUTE, MATCHES_ROUTE } from '../../../../utils/routes';

const Navbar = () => {
  return (
    <div className={styles.Navbar}>
      <Container>
        <Menu className={styles.Menu} theme="light" mode="horizontal">
          <Menu.Item key={0}>
            <NavLink to={MAIN_ROUTE}>ГЛАВНАЯ</NavLink>
          </Menu.Item>
          <Menu.Item key={1}>
            <NavLink to={MAIN_ROUTE}>СОРЕВНОВАНИЯ</NavLink>
          </Menu.Item>
          <Menu.Item key={2}>
            <NavLink to={MATCHES_ROUTE}>МАТЧИ</NavLink>
          </Menu.Item>
          <Menu.Item key={3}>
            <NavLink to={MAIN_ROUTE}>КОМАНДЫ</NavLink>
          </Menu.Item>
        </Menu>
      </Container>
    </div>
  );
};

export default Navbar;
