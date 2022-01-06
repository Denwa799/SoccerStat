import React from 'react';
import styles from './Navigation.module.css';
import Navbar from './Navbar/Navbar';

const Navigation: React.FC = () => {
  return (
    <div className={styles.Navigation}>
      <div className={styles.desktop}>
        <Navbar />
      </div>
      <div className={styles.mobile}></div>
    </div>
  );
};

export default Navigation;
