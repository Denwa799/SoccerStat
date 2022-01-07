import React from 'react';
import CompetitionList from './CompetitionList/CompetitionList';
import styles from './Main.module.css';
import Container from '../../UI/Container/Container';
import { Typography } from 'antd';

const { Title } = Typography;

const Main: React.FC = () => {
  return (
    <div className={styles.Main}>
      <Container>
        <Title className={styles.Title}>Список соревнований</Title>
        <CompetitionList />
      </Container>
    </div>
  );
};

export default Main;
