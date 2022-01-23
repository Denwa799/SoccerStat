import React, { useEffect } from 'react';
import styles from './MatchResource.module.css';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { fetchMatch } from '../../../../store/action-creators/MatchResource';
import { useParams } from 'react-router-dom';
import { Row, Col, Typography } from 'antd';
import Container from '../../../UI/Container/Container';

const { Title } = Typography;

interface MatchResourceParams {
  id: string;
}

const MatchResource: React.FC = () => {
  const { match, error, loading } = useTypedSelector((state) => state.matchResource);
  const dispatch = useDispatch();

  // @ts-ignore
  const params = useParams<MatchResourceParams>();

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchMatch(params.id));
  }, []);

  if (loading) {
    return <h1 className={styles.loading}>Идет загрузка...</h1>;
  }

  if (error) {
    return <h1 className={styles.loading}>{error}</h1>;
  }

  return (
    <div className={styles.MatchResource}>
      <Container>
        {Object.keys(match).length != 0 ? (
          <div>
            <Title className={styles.Title}>
              {match.head2head.homeTeam.name} VS {match.head2head.awayTeam.name}
            </Title>
            <div className={styles.MatchDescription}>
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
                  <Title level={3}>Статус: {match.match.status}</Title>
                </Col>
                <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                  <Title level={3}>Место встречи: {match.match.venue}</Title>
                </Col>
              </Row>
              <Row className={styles.MatchDescriptionItems}>
                <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                  <Title level={3}>День матча: {match.match.matchday}</Title>
                </Col>
                <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                  <Title level={3}>
                    {match.match.status == 'FINISHED'
                      ? `${match.match.score.fullTime.homeTeam} VS ${match.match.score.fullTime.awayTeam}`
                      : 'Результаты матча еще не известны'}
                  </Title>
                </Col>
              </Row>
            </div>
          </div>
        ) : (
          <h1>Матч не найден</h1>
        )}
      </Container>
    </div>
  );
};

export default MatchResource;
