import React, { useEffect } from 'react';
import styles from './TeamList.module.css';
import { Card, Col, Row } from 'antd';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { fetchTeams } from '../../store/action-creators/TeamList';
import noImage from '../../assets/img/noImage.jpg';

const { Meta } = Card;

const TeamList: React.FC = () => {
  const { teams, error, loading } = useTypedSelector((state) => state.teamList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTeams());
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
    <div className={styles.TeamList}>
      <Row className={styles.Cards} gutter={[16, 16]}>
        {teams.length != 0 ? (
          teams.map((team) => (
            <Col key={team.id} span={8}>
              <Card
                className={styles.Card}
                hoverable
                cover={
                  <img
                    className={styles.CardImg}
                    src={team.crestUrl ? team.crestUrl : noImage}
                    alt={team.tla}
                  />
                }
              >
                <Meta title={team.name} />
              </Card>
            </Col>
          ))
        ) : (
          <h1>Команды не найдены</h1>
        )}
      </Row>
    </div>
  );
};

export default TeamList;
