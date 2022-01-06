import React from 'react';
import styles from './Matches.module.css';
import Container from '../../UI/Container/Container';
import { Typography } from 'antd';
import MatchList from '../../MatchList/MatchList';

const { Title } = Typography;

const Matches: React.FC = () => {
  return (
    <div className={styles.Matches}>
      <Container>
        <Title className={styles.Title}>Список матчей на данный момент</Title>
        <MatchList />
      </Container>
    </div>
  );
};

export default Matches;
