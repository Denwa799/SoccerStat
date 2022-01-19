import React, { useEffect, useState } from 'react';
import styles from './CompetitionList.module.css';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { Card, Col, Row } from 'antd';
import noImage from '../../../../assets/img/noImage.jpg';
import { useDispatch } from 'react-redux';
import { fetchCompetitions } from '../../../../store/action-creators/CompetitionList';
import { Link } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';

const { Meta } = Card;

const CompetitionList: React.FC = () => {
  const { competitions, error, loading } = useTypedSelector((state) => state.competitionList);
  const dispatch = useDispatch();

  const [value, setValue] = useState('');
  const [isOpen, setIsOpen] = useState(true);

  const filtredCompetitions = competitions.filter((competition) => {
    return competition.name.toLowerCase().includes(value.toLocaleLowerCase());
  });

  useEffect(() => {
    dispatch(fetchCompetitions());
  }, []);

  if (loading) {
    return <h1>Идет загрузка...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  const itemClickHandler = (e: any) => {
    setValue(e.target.textContent);
    setIsOpen(!isOpen);
  };

  const inputClickHandler = () => {
    setIsOpen(true);
  };

  return (
    <div className={styles.CompetitionList}>
      <Row>
        <Col span={7}>
          <form className={styles.searchForm}>
            <input
              type="text"
              placeholder="Введите название соревнования..."
              className={styles.searchInput}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              onClick={inputClickHandler}
            />
            <ul className={styles.autocomplete}>
              {competitions.length != 0 && value && isOpen
                ? filtredCompetitions.map((competition) => (
                    <li
                      key={competition.id}
                      className={styles.autocompleteItem}
                      onClick={itemClickHandler}
                    >
                      {competition.name}
                    </li>
                  ))
                : null}
            </ul>
            <SearchOutlined className={styles.searchIcn} />
          </form>
        </Col>
      </Row>
      <Row className={styles.Cards} gutter={[16, 16]}>
        {competitions.length != 0 ? (
          filtredCompetitions.map((competition) => (
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
