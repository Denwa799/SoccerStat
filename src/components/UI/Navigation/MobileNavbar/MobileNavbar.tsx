import React, { FC, useState } from 'react';
import MenuToggle from './MenuToggle/MenuToggle';
import styles from './MobileNavbar.module.css';
import Container from '../../Container/Container';
import { Drawer, Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import { MAIN_ROUTE, MATCHES_ROUTE, TEAMS_ROUTE } from '../../../../utils/routes';

const MobileNavbar: FC = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div className={styles.MobileNavbar}>
      <Container>
        <Drawer
          className={styles.Drawer}
          visible={visible}
          placement={'left'}
          onClose={onClose}
          key={'left'}
        >
          <Menu className={styles.Menu} theme="light">
            <Menu.Item key={0}>
              <NavLink to={MAIN_ROUTE}>СОРЕВНОВАНИЯ</NavLink>
            </Menu.Item>
            <Menu.Item key={1}>
              <NavLink to={MATCHES_ROUTE}>МАТЧИ</NavLink>
            </Menu.Item>
            <Menu.Item key={2}>
              <NavLink to={TEAMS_ROUTE}>КОМАНДЫ</NavLink>
            </Menu.Item>
          </Menu>
        </Drawer>
        <MenuToggle onOpen={(event) => setVisible(true)} />
      </Container>
    </div>
  );
};

export default MobileNavbar;
