import React, { useEffect, useState } from 'react';
import styles from './TeamResource.module.css';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { fetchTeamMatches } from '../../../../store/action-creators/TeamMatchesResource';
import { fetchTeam } from '../../../../store/action-creators/TeamResource';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Typography, DatePicker, Breadcrumb } from 'antd';
import Container from '../../../UI/Container/Container';
import AppTable from '../../../UI/AppTable/AppTable';
import moment from 'moment';
import ErrorLoading from '../../../UI/ErrorLoading/ErrorLoading';
import {
  teamMatchesResourceSelector,
  teamResourceSelector,
} from '../../../../store/selectors/selectors';
import { IDataSource } from '../../../../types/pages/pages';
import { matchStatusTranslation } from '../../../../utils/matchStatusTranslation';
import { TEAMS_ROUTE } from '../../../../utils/routes';

const { Title } = Typography;
const { RangePicker } = DatePicker;

const TeamResource: React.FC = () => {
  // Получение данных из store
  const { teamMatches, errorTeamMatches, loadingTeamMatches } = useTypedSelector(
    teamMatchesResourceSelector
  );
  const { team, errorTeam, loadingTeam } = useTypedSelector(teamResourceSelector);
  const dispatch = useDispatch();

  // Локальный стейт для таблицы
  const [dataSource, setDataSource] = useState<IDataSource[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();

  // Получение команды, матчей и данных фильтрации из параметров строки url
  useEffect(() => {
    const dateFromParam = searchParams.get('dateFrom') || '';
    const dateToParam = searchParams.get('dateTo') || '';
    dispatch(fetchTeamMatches(params.id, dateFromParam, dateToParam));
    dispatch(fetchTeam(params.id));
  }, []);

  // Отправка полученных данных в таблицу
  useEffect(() => {
    if (Object.keys(teamMatches).length != 0 && teamMatches.matches) {
      const matches = teamMatches.matches.map((match) => {
        let score = `${match.score.fullTime.homeTeam} : ${match.score.fullTime.awayTeam}`;
        if (match.score.fullTime.homeTeam === null && match.score.fullTime.awayTeam === null) {
          score = 'Неизвестно';
        }
        return {
          key: match.id,
          status: matchStatusTranslation(match.status),
          date: `${new Date(match.utcDate).toLocaleString()} `,
          teams: `${match.homeTeam.name} VS ${match.awayTeam.name}`,
          score: score,
        };
      });
      setDataSource(matches);
    }
  }, [teamMatches]);

  // Обработка изменении дат для фильтрации
  function onFilterChange(dates: any, dateStrings: string[]) {
    // Невозможно определить dates, так как в него приходит объект даты moment
    setSearchParams({ dateFrom: dateStrings[0], dateTo: dateStrings[1] });
    dispatch(fetchTeamMatches(params.id, dateStrings[0], dateStrings[1]));
  }

  // Отрисовка содержимого таблицы
  function renderTable() {
    if (loadingTeamMatches || errorTeamMatches) {
      return <ErrorLoading loading={loadingTeamMatches} error={errorTeamMatches} />;
    } else if (teamMatches.count === 0) {
      return <h1>Список матчей пуст</h1>;
    } else {
      return <AppTable dataSource={dataSource} />;
    }
  }

  // Отрисовка содержимого страницы
  function renderPage() {
    if (Object.keys(team).length != 0 && Object.keys(teamMatches).length != 0) {
      return (
        <div>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to={TEAMS_ROUTE}>Команды</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{team.name}</Breadcrumb.Item>
          </Breadcrumb>
          <Title className={styles.Title}>Матчи</Title>
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

  // Обработка ошибки и загрузки
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
