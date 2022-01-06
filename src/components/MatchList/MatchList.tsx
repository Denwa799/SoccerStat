import React, { useEffect } from 'react';
import styles from './MatchList.module.css';
import { Card, Col, Row } from 'antd';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { fetchMatches } from '../../store/action-creators/MatchList';

const { Meta } = Card;

const MatchList: React.FC = () => {
  const { matches, error, loading } = useTypedSelector((state) => state.matchList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMatches());
  }, []);

  if (loading) {
    return <h1>Идет загрузка...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }
  /*
  Статусы:
  POSTPONED
  IN_PLAY
  SCHEDULED
  */

  return (
    <div className={styles.MatchList}>
      <Row className={styles.Cards} gutter={[16, 16]}>
        {matches.length != 0 ? (
          matches.map((match) => (
            <Col key={match.id} span={8}>
              <Card hoverable>
                <Meta
                  title={`${match.homeTeam.name} vs ${match.awayTeam.name}`}
                  description={
                    match.status == 'FINISHED'
                      ? match.score.fullTime.homeTeam + ' VS ' + match.score.fullTime.awayTeam
                      : 'Статус: ' + match.status
                  }
                />
              </Card>
            </Col>
          ))
        ) : (
          <h1>Сегодня нет матчей</h1>
        )}
      </Row>
    </div>
  );
};

export default MatchList;
