import React, { useEffect, useState } from 'react';
import styles from './MatchList.module.css';
import { Card, Col, Pagination, Row } from 'antd';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { fetchMatches } from '../../../../store/action-creators/MatchList';
import noImage from '../../../../assets/img/noImage.jpg';
import { Link } from 'react-router-dom';
import ErrorLoading from '../../../UI/ErrorLoading/ErrorLoading';
import { matchListSelector } from '../../../../store/selectors/selectors';
import { matchStatusTranslation } from '../../../../utils/matchStatusTranslation';

const { Meta } = Card;

const MatchList: React.FC = () => {
  // Получение данных из store
  const { matches, error, loading } = useTypedSelector(matchListSelector);
  const dispatch = useDispatch();

  // Локальный стейт для реализации пагинации
  const [currentPage, setCurrentPage] = useState(1);
  const [matchesPerPage, setMatchesPerPage] = useState(6);

  // Диспатч списка матчей
  useEffect(() => {
    dispatch(fetchMatches());
  }, []);

  // Переменные для реализации пагинации
  const lastMatchIndex = currentPage * matchesPerPage;
  const firstMatchIndex = lastMatchIndex - matchesPerPage;
  const currentMatchList = matches.slice(firstMatchIndex, lastMatchIndex);

  // Обработка нажатия на кнопки смены страницы в пагинации
  const pageChangeHandler = (pageNumber: number, pageSize: number) => {
    setCurrentPage(pageNumber);
    setMatchesPerPage(pageSize);
  };

  // Отрисовка карточек матчей
  function renderCards() {
    if (matches.length != 0) {
      return currentMatchList.map((match) => (
        <Col key={match.id} xl={8} lg={12} md={24} sm={24} xs={24}>
          <Link to={`${match.id}`}>
            <Card
              hoverable
              cover={
                <img
                  className={styles.CardImg}
                  src={
                    match.competition.area.ensignUrl ? match.competition.area.ensignUrl : noImage
                  }
                  alt={match.competition.area.code}
                />
              }
            >
              <Meta
                title={`${match.homeTeam.name} vs ${match.awayTeam.name}`}
                description={
                  match.status == 'FINISHED'
                    ? match.score.fullTime.homeTeam + ' VS ' + match.score.fullTime.awayTeam
                    : 'Статус: ' + matchStatusTranslation(match.status)
                }
              />
            </Card>
          </Link>
        </Col>
      ));
    } else {
      return <h1>Сегодня нет матчей</h1>;
    }
  }

  // Обработка ошибки и загрузки
  if (loading || error) {
    return <ErrorLoading loading={loading} error={error} />;
  }

  return (
    <div className={styles.MatchList}>
      <Row className={styles.Cards} gutter={[16, 16]}>
        {renderCards()}
      </Row>
      <Row className={styles.PaginationRow}>
        <Col span={24}>
          <Pagination
            defaultCurrent={1}
            defaultPageSize={6}
            size={window.innerWidth <= 420 ? 'small' : 'default'}
            responsive={false}
            total={matches.length}
            showSizeChanger={true}
            onChange={pageChangeHandler}
            pageSizeOptions={['6', '9', '15', '21']}
          />
        </Col>
      </Row>
    </div>
  );
};

export default MatchList;
