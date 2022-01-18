import React, { useEffect, useState } from 'react';
import styles from './CompetitionResource.module.css';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { fetchCompetition } from '../../../../store/action-creators/CompetitionResource';
import { useParams } from 'react-router-dom';
import { Typography, Table } from 'antd';
import Container from '../../../UI/Container/Container';

const { Title } = Typography;

interface CompetitionResourceParams {
  id: string;
}

const CompetitionResource: React.FC = () => {
  const { competition, error, loading } = useTypedSelector((state) => state.competitionResource);
  const dispatch = useDispatch();
  const [dataSource, setDataSource] = useState<any[]>([]);

  // @ts-ignore
  const params = useParams<CompetitionResourceParams>();

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchCompetition(params.id));
  }, []);

  useEffect(() => {
    if (Object.keys(competition).length != 0) {
      const matches = competition.matches.map((match: any) => {
        return {
          status: match.status,
          date: `${new Date(match.utcDate).toLocaleString()} `,
          homeTeam: match.homeTeam.name,
          awayTeam: match.awayTeam.name,
          score: `${match.score.fullTime.homeTeam} : ${match.score.fullTime.awayTeam}`,
        };
      });
      setDataSource(matches);
    }
  }, [competition]);

  if (loading) {
    return <h1 className={styles.loading}>Идет загрузка...</h1>;
  }

  if (error) {
    return <h1 className={styles.loading}>{error}</h1>;
  }

  const columns = [
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Дата и время',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Домашняя команда',
      dataIndex: `homeTeam`,
      key: 'homeTeam',
    },
    {
      title: 'Команда противника',
      dataIndex: `awayTeam`,
      key: 'awayTeam',
    },
    {
      title: 'Счет',
      dataIndex: `score`,
      key: 'score',
    },
  ];

  return (
    <div className={styles.CompetitionResource}>
      <Container>
        {Object.keys(competition).length != 0 ? (
          <div>
            <Title className={styles.Title}>{competition.competition.name}</Title>
            <Table columns={columns} dataSource={dataSource} pagination={false} />
          </div>
        ) : (
          <h1>Соревнование не найдено</h1>
        )}
      </Container>
    </div>
  );
};

export default CompetitionResource;
