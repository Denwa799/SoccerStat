import React, { FC, useState } from 'react';
import MenuToggle from './MenuToggle/MenuToggle';
import styles from './MobileNavbar.module.css';
import Container from '../../Container/Container';
import { Drawer, Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import { MAIN_ROUTE, MATCHES_ROUTE, TEAMS_ROUTE } from '../../../../utils/routes';

const MobileNavbar: FC = () => {
  const [visible, setVisible] = useState(false);

  const handleClose = () => {
    setVisible(false);
  };

  const handleOpen = () => {
    setVisible(true);
  };

  return (
    <div className={styles.MobileNavbar}>
      <Container>
        <Drawer
          className={styles.Drawer}
          visible={visible}
          placement={'left'}
          onClose={handleClose}
          key={'left'}
        >
          <Menu className={styles.Menu} theme="light">
            <Menu.Item key={0}>
              <NavLink to={MAIN_ROUTE} onClick={handleClose}>
                СОРЕВНОВАНИЯ
              </NavLink>
            </Menu.Item>
            <Menu.Item key={1}>
              <NavLink to={MATCHES_ROUTE} onClick={handleClose}>
                МАТЧИ
              </NavLink>
            </Menu.Item>
            <Menu.Item key={2}>
              <NavLink to={TEAMS_ROUTE} onClick={handleClose}>
                КОМАНДЫ
              </NavLink>
            </Menu.Item>
          </Menu>
        </Drawer>
        <MenuToggle onOpen={handleOpen} />
      </Container>
    </div>
  );
};

export default MobileNavbar;
