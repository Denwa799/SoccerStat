import React, { useEffect } from 'react';
import styles from './CompetitionResource.module.css';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { fetchCompetition } from '../../../../store/action-creators/CompetitionResource';
import { useParams } from 'react-router-dom';
import { Typography } from 'antd';
import Container from '../../../UI/Container/Container';

const { Title } = Typography;

interface CompetitionResourceParams {
  id: string;
}

const CompetitionResource: React.FC = () => {
  const { competition, error, loading } = useTypedSelector((state) => state.competitionResource);
  const dispatch = useDispatch();

  // @ts-ignore
  const params = useParams<CompetitionResourceParams>();
  useEffect(() => {
    // @ts-ignore
    dispatch(fetchCompetition(params.id));
  }, []);

  if (loading) {
    return <h1 className={styles.loading}>Идет загрузка...</h1>;
  }

  if (error) {
    return <h1 className={styles.loading}>{error}</h1>;
  }

  console.log(competition);

  return (
    <div className={styles.CompetitionResource}>
      <Container>
        {Object.keys(competition).length != 0 ? (
          <Title className={styles.Title}>{competition.competition.name}</Title>
        ) : (
          <h1>Соревнование не найдено</h1>
        )}
      </Container>
    </div>
  );
};

export default CompetitionResource;
