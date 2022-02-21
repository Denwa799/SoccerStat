import React, { useEffect } from 'react';
import styles from './MatchList.module.css';
import { Card, Col, Row } from 'antd';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { fetchMatches } from '../../../../store/action-creators/MatchList';
import noImage from '../../../../assets/img/noImage.jpg';
import { Link } from 'react-router-dom';
import ErrorLoading from '../../../UI/ErrorLoading/ErrorLoading';
import { matchListSelector } from '../../../../store/selectors/selectors';

const { Meta } = Card;

const MatchList: React.FC = () => {
  const { matches, error, loading } = useTypedSelector(matchListSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMatches());
  }, []);

  function renderCards() {
    if (matches.length != 0) {
      return matches.map((match) => (
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
                    : 'Статус: ' + match.status
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

  if (loading || error) {
    return <ErrorLoading loading={loading} error={error} />;
  }

  return (
    <div className={styles.MatchList}>
      <Row className={styles.Cards} gutter={[16, 16]}>
        {renderCards()}
      </Row>
    </div>
  );
};

export default MatchList;
