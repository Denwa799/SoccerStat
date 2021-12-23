import React from 'react';
import 'antd/dist/antd.css';
import AppRouter from './components/AppRouter/AppRouter';
import styles from './App.module.css';

const App: React.FC = () => {
  return (
    <div className={styles.App}>
      <AppRouter />
    </div>
  );
};

export default App;
