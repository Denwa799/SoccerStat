import React, { useEffect, useState } from 'react';
import styles from './TeamResource.module.css';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { fetchTeamMatches } from '../../../../store/action-creators/TeamMatchesResource';
import { fetchTeam } from '../../../../store/action-creators/TeamResource';
import { useParams, useSearchParams } from 'react-router-dom';
import { Typography, DatePicker } from 'antd';
import Container from '../../../UI/Container/Container';
import AppTable from '../../../UI/AppTable/AppTable';
import moment from 'moment';
import ErrorLoading from '../../../UI/ErrorLoading/ErrorLoading';
import {
  teamMatchesResourceSelector,
  teamResourceSelector,
} from '../../../../store/selectors/selectors';

const { Title } = Typography;
const { RangePicker } = DatePicker;

interface IDataSource {
  key: number;
  status: string;
  date: string;
  homeTeam: string;
  awayTeam: string;
  score: string;
}

const TeamResource: React.FC = () => {
  const { teamMatches, errorTeamMatches, loadingTeamMatches } = useTypedSelector(
    teamMatchesResourceSelector
  );
  const { team, errorTeam, loadingTeam } = useTypedSelector(teamResourceSelector);
  const dispatch = useDispatch();
  const [dataSource, setDataSource] = useState<IDataSource[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();

  useEffect(() => {
    const dateFromParam = searchParams.get('dateFrom') || '';
    const dateToParam = searchParams.get('dateTo') || '';
    dispatch(fetchTeamMatches(params.id, dateFromParam, dateToParam));
    dispatch(fetchTeam(params.id));
  }, []);

  useEffect(() => {
    if (Object.keys(teamMatches).length != 0 && teamMatches.matches) {
      const matches = teamMatches.matches.map((match) => {
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

  function onFilterChange(dates: any, dateStrings: string[]) {
    // Невозможно определить dates, так как в него приходит объект даты moment
    setSearchParams({ dateFrom: dateStrings[0], dateTo: dateStrings[1] });
    dispatch(fetchTeamMatches(params.id, dateStrings[0], dateStrings[1]));
  }

  function renderTable() {
    if (loadingTeamMatches || errorTeamMatches) {
      return <ErrorLoading loading={loadingTeamMatches} error={errorTeamMatches} />;
    } else if (teamMatches.count === 0) {
      return <h1>Список матчей пуст</h1>;
    } else {
      return <AppTable dataSource={dataSource} />;
    }
  }

  function renderPage() {
    if (Object.keys(team).length != 0 && Object.keys(teamMatches).length != 0) {
      return (
        <div>
          <Title className={styles.Title}>{team.name}</Title>
          <RangePicker
            className={styles.rangeFilter}
            onChange={onFilterChange}
            value={[
              searchParams.get('dateFrom') ? moment(searchParams.get('dateFrom')) : null,
              searchParams.get('dateTo') ? moment(searchParams.get('dateTo')) : null,
            ]}
          />
          {renderTable()}
        </div>
      );
    } else {
      return <h1>Информация о команде не найдена</h1>;
    }
  }

  if (loadingTeam || errorTeam) {
    return (
      <Container>
        <ErrorLoading loading={loadingTeam} error={errorTeam} />
      </Container>
    );
  }

  return (
    <div className={styles.TeamResource}>
      <Container>{renderPage()}</Container>
    </div>
  );
};

export default TeamResource;
