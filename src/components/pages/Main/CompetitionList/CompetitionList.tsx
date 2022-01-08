import React, { useEffect } from 'react';
import styles from './CompetitionList.module.css';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { Card, Col, Row } from 'antd';
import noImage from '../../../../assets/img/noImage.jpg';
import { useDispatch } from 'react-redux';
import { fetchCompetitions } from '../../../../store/action-creators/CompetitionList';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const CompetitionList: React.FC = () => {
  const { competitions, error, loading } = useTypedSelector((state) => state.competitionList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCompetitions());
  }, []);

  if (loading) {
    return <h1>Идет загрузка...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div className={styles.CompetitionList}>
      <Row className={styles.Cards} gutter={[16, 16]}>
        {competitions.length != 0 ? (
          competitions.map((competition) => (
            <Col key={competition.id} span={8}>
              <Link to={`${competition.id}`}>
                <Card
                  hoverable
                  cover={
                    <img
                      className={styles.CardImg}
                      src={competition.emblemUrl ? competition.emblemUrl : noImage}
                      alt={competition.code}
                    />
                  }
                >
                  <Meta title={competition.name} />
                </Card>
              </Link>
            </Col>
          ))
        ) : (
          <h1>Соревнования не найдены</h1>
        )}
      </Row>
    </div>
  );
};

export default CompetitionList;
