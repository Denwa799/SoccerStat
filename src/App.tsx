import React from 'react';
import 'antd/dist/antd.css';
import AppRouter from './components/AppRouter/AppRouter';
import styles from './App.module.css';
import Navigation from './components/UI/Navigation/Navigation';

const App: React.FC = () => {
  return (
    <div className={styles.App}>
      <Navigation />
      <AppRouter />
    </div>
  );
};

export default App;
