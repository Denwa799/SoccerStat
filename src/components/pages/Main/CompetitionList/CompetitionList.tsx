import React, { useEffect, useState } from 'react';
import styles from './CompetitionList.module.css';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { Card, Col, Row } from 'antd';
import noImage from '../../../../assets/img/noImage.jpg';
import { useDispatch } from 'react-redux';
import { fetchCompetitions } from '../../../../store/action-creators/CompetitionList';
import { Link, useSearchParams } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';

const { Meta } = Card;

const CompetitionList: React.FC = () => {
  const { competitions, error, loading } = useTypedSelector((state) => state.competitionList);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const paramsName = searchParams.get('name') || '';
  const [value, setValue] = useState(paramsName.replace(/-/g, ' '));

  const filtredCompetitions = competitions.filter((competition) => {
    return competition.name.toLowerCase().includes(value.toLocaleLowerCase());
  });

  useEffect(() => {
    dispatch(fetchCompetitions());
  }, []);

  useEffect(() => {
    setValue(paramsName.replace(/-/g, ' '));
  }, [paramsName]);

  if (loading) {
    return <h1>Идет загрузка...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  const itemChangeHandler = (e: any) => {
    setValue(e.target.value);
    setSearchParams({ name: e.target.value.replace(/ /g, '-') });
  };

  const itemClickHandler = (e: any) => {
    setSearchParams({ name: e.target.textContent.replace(/ /g, '-') });
    setValue(paramsName.replace(/-/g, ' '));
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
              onChange={itemChangeHandler}
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
