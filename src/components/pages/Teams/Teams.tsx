import React from 'react';
import styles from './Teams.module.css';
import Container from '../../UI/Container/Container';
import { Typography } from 'antd';
import TeamList from './TeamList/TeamList';

const { Title } = Typography;

const Teams: React.FC = () => {
  return (
    <div className={styles.Teams}>
      <Container>
        <Title className={styles.Title}>Список команд</Title>
        <TeamList />
      </Container>
    </div>
  );
};

export default Teams;
