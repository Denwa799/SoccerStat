import React from 'react';
import styles from './ErrorLoading.module.css';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { IErrorLoading } from '../../../types/UI/UI';

const antIcon = <LoadingOutlined className={styles.Loader} spin />;

const ErrorLoading: React.FC<IErrorLoading> = ({ loading, error }) => {
  if (error) {
    return <h1>{error}</h1>;
  } else if (loading) {
    return <Spin indicator={antIcon} />;
  } else {
    return null;
  }
};

export default ErrorLoading;
