import React, { useEffect } from 'react';
import styles from './MatchResource.module.css';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { fetchMatch } from '../../../../store/action-creators/MatchResource';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Typography, Breadcrumb } from 'antd';
import Container from '../../../UI/Container/Container';
import ErrorLoading from '../../../UI/ErrorLoading/ErrorLoading';
import { matchResourceSelector } from '../../../../store/selectors/selectors';
import { matchStatusTranslation } from '../../../../utils/matchStatusTranslation';
import { MATCHES_ROUTE } from '../../../../utils/routes';

const { Title } = Typography;

const MatchResource: React.FC = () => {
  // Получение данных из store
  const { match, error, loading } = useTypedSelector(matchResourceSelector);
  const dispatch = useDispatch();

  const params = useParams();

  useEffect(() => {
    dispatch(fetchMatch(params.id));
  }, []);

  // Отрисовка содержимого страницы
  function renderPage() {
    if (Object.keys(match).length != 0 && match.match && match.head2head) {
      return (
        <div>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to={MATCHES_ROUTE}>Матчи</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {match.head2head.homeTeam.name} VS {match.head2head.awayTeam.name}
            </Breadcrumb.Item>
          </Breadcrumb>
          <Title className={styles.Title}>
            {match.head2head.homeTeam.name} VS {match.head2head.awayTeam.name}
          </Title>
          <div>
            <Row className={styles.MatchDescriptionItems}>
              <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                <Title level={3}>Соревнование: {match.match.competition.name}</Title>
              </Col>
              <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                <Title level={3}>Страна соревнования: {match.match.competition.area.name}</Title>
              </Col>
            </Row>
            <Row className={styles.MatchDescriptionItems}>
              <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                <Title level={3}>Старт сезона: {match.match.season.startDate}</Title>
              </Col>
              <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                <Title level={3}>Конец сезона: {match.match.season.endDate}</Title>
              </Col>
            </Row>
            <Row className={styles.MatchDescriptionItems}>
              <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                <Title level={3}>Статус: {matchStatusTranslation(match.match.status)}</Title>
              </Col>
              <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                <Title level={3}>
                  {match.match.venue
                    ? `Место встречи: ${match.match.venue}`
                    : 'Место встречи не указано'}
                </Title>
              </Col>
            </Row>
            <Row className={styles.MatchDescriptionItems}>
              <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                <Title level={3}>День матча: {match.match.matchday}</Title>
              </Col>
              <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                <Title level={3}>
                  {match.match.status == 'FINISHED'
                    ? `Счет: ${match.match.score.fullTime.homeTeam} VS ${match.match.score.fullTime.awayTeam}`
                    : 'Результаты матча еще не известны'}
                </Title>
              </Col>
            </Row>
          </div>
        </div>
      );
    } else {
      return <h1>Матч не найден</h1>;
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
    <div className={styles.MatchResource}>
      <Container>{renderPage()}</Container>
    </div>
  );
};

export default MatchResource;
