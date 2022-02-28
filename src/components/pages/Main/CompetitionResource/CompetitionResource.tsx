import React, { useEffect, useState } from 'react';
import styles from './CompetitionResource.module.css';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { fetchCompetition } from '../../../../store/action-creators/CompetitionResource';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Typography, DatePicker, Breadcrumb } from 'antd';
import Container from '../../../UI/Container/Container';
import AppTable from '../../../UI/AppTable/AppTable';
import moment from 'moment';
import ErrorLoading from '../../../UI/ErrorLoading/ErrorLoading';
import { competitionResourceSelector } from '../../../../store/selectors/selectors';
import { IDataSource } from '../../../../types/pages/pages';
import { matchStatusTranslation } from '../../../../utils/matchStatusTranslation';
import { MAIN_ROUTE } from '../../../../utils/routes';

const { Title } = Typography;
const { RangePicker } = DatePicker;

const CompetitionResource: React.FC = () => {
  // Получение данных из store
  const { competition, error, loading } = useTypedSelector(competitionResourceSelector);
  const dispatch = useDispatch();

  // Локальный стейт для таблицы
  const [dataSource, setDataSource] = useState<IDataSource[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();

  // Получение матчей и данных фильтрации из параметров строки url
  useEffect(() => {
    const dateFromParam = searchParams.get('dateFrom') || '';
    const dateToParam = searchParams.get('dateTo') || '';
    dispatch(fetchCompetition(params.id, dateFromParam, dateToParam));
  }, []);

  // Отправка полученных данных в таблицу
  useEffect(() => {
    if (Object.keys(competition).length != 0 && competition.matches) {
      const matches = competition.matches.map((match) => {
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
  }, [competition]);

  // Обработка изменении дат для фильтрации
  function onFilterChange(dates: any, dateStrings: string[]) {
    // Невозможно определить dates, так как в него приходит объект даты moment
    setSearchParams({ dateFrom: dateStrings[0], dateTo: dateStrings[1] });
    dispatch(fetchCompetition(params.id, dateStrings[0], dateStrings[1]));
  }

  // Отрисовка содержимого страницы
  function renderPage() {
    if (Object.keys(competition).length != 0 && competition.competition) {
      return (
        <div>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to={MAIN_ROUTE}>Соревнования</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{competition.competition.name}</Breadcrumb.Item>
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
          <AppTable dataSource={dataSource} />
        </div>
      );
    } else {
      return <h1>Соревнование не найдено</h1>;
    }
  }

  // Обработка ошибки и загрузки
  if (loading || error) {
    return (
      <Container>
        <ErrorLoading loading={loading} error={error} />
      </Container>
    );
  }

  return (
    <div className={styles.CompetitionResource}>
      <Container>{renderPage()}</Container>
    </div>
  );
};

export default CompetitionResource;
