import React, { useEffect, useState } from 'react';
import styles from './CompetitionList.module.css';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { Card, Col, Row } from 'antd';
import noImage from '../../../../assets/img/noImage.jpg';
import { useDispatch } from 'react-redux';
import { fetchCompetitions } from '../../../../store/action-creators/CompetitionList';
import { Link, useSearchParams } from 'react-router-dom';
import SearchBar from '../../../UI/SearchBar/SearchBar';

const { Meta } = Card;

const CompetitionList: React.FC = () => {
  const { competitions, error, loading } = useTypedSelector((state) => state.competitionList);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const paramsName = searchParams.get('name') || '';
  const [value, setValue] = useState(paramsName.replace(/-/g, ' '));

  const filteredCompetitions = competitions.filter((competition) => {
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
          <SearchBar
            placeholder={'Введите название соревнования...'}
            value={value}
            inputOnChange={itemChangeHandler}
            inputOnClick={inputClickHandler}
            array={competitions}
            isOpen={isOpen}
            filteredArray={filteredCompetitions}
            itemOnClick={itemClickHandler}
          />
        </Col>
      </Row>
      <Row className={styles.Cards} gutter={[16, 16]}>
        {competitions.length != 0 ? (
          filteredCompetitions.map((competition) => (
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
