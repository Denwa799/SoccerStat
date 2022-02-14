import React from 'react';
import 'antd/dist/antd.css';
import AppRouter from './components/AppRouter/AppRouter';
import styles from './App.module.css';
import Navigation from './components/UI/Navigation/Navigation';
import { BackTop, ConfigProvider } from 'antd';
import 'moment/locale/ru';
import locale from 'antd/lib/locale/ru_RU';
import { ArrowUpOutlined } from '@ant-design/icons';

const App: React.FC = () => {
  return (
    <div className={styles.App}>
      <ConfigProvider locale={locale}>
        <Navigation />
        <AppRouter />
        <BackTop>
          <ArrowUpOutlined className={styles.BackTop} />
        </BackTop>
      </ConfigProvider>
    </div>
  );
};

export default App;
