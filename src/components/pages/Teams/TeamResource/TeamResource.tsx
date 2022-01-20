import React, { useEffect, useState } from 'react';
import styles from './TeamResource.module.css';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { fetchTeamMatches } from '../../../../store/action-creators/TeamMatchesResource';
import { fetchTeam } from '../../../../store/action-creators/TeamResource';
import { useParams, useSearchParams } from 'react-router-dom';
import { Typography, Table, DatePicker } from 'antd';
import Container from '../../../UI/Container/Container';
import moment from 'moment';

const { Title } = Typography;
const { RangePicker } = DatePicker;

interface TeamResourceParams {
  id: string;
}

const TeamResource: React.FC = () => {
  const { teamMatches } = useTypedSelector((state) => state.teamMatchesResource);
  const { team, error, loading } = useTypedSelector((state) => state.teamResource);
  const dispatch = useDispatch();
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  // @ts-ignore
  const params = useParams<TeamResourceParams>();

  useEffect(() => {
    const dateFromParam = searchParams.get('dateFrom') || '';
    const dateToParam = searchParams.get('dateTo') || '';
    // @ts-ignore
    dispatch(fetchTeamMatches(params.id, dateFromParam, dateToParam));
    // @ts-ignore
    dispatch(fetchTeam(params.id));
  }, []);

  useEffect(() => {
    if (Object.keys(teamMatches).length != 0) {
      const matches = teamMatches.matches.map((match: any) => {
        return {
          key: match.id,
          status: match.status,
          date: `${new Date(match.utcDate).toLocaleString()} `,
          homeTeam: match.homeTeam.name,
          awayTeam: match.awayTeam.name,
          score: `${match.score.fullTime.homeTeam} : ${match.score.fullTime.awayTeam}`,
        };
      });
      setDataSource(matches);
    }
  }, [teamMatches]);

  function onFilterChange(dates: any, dateStrings: any) {
    setSearchParams({ dateFrom: dateStrings[0], dateTo: dateStrings[1] });

    // @ts-ignore
    dispatch(fetchTeamMatches(params.id, dateStrings[0], dateStrings[1]));
  }

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
    <div className={styles.TeamResource}>
      <Container>
        {Object.keys(team).length != 0 && Object.keys(teamMatches).length != 0 ? (
          <div>
            <Title className={styles.Title}>{team.name}</Title>
            <RangePicker
              className={styles.rangeFilter}
              ranges={{
                Today: [moment(), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
              }}
              onChange={onFilterChange}
            />
            <Table columns={columns} dataSource={dataSource} pagination={false} />
          </div>
        ) : (
          <h1>Информация о команде не найдена</h1>
        )}
      </Container>
    </div>
  );
};

export default TeamResource;
