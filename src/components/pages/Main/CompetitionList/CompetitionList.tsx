import React, { useEffect, useState } from 'react';
import styles from './CompetitionList.module.css';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { Card, Col, Row } from 'antd';
import noImage from '../../../../assets/img/noImage.jpg';
import { useDispatch } from 'react-redux';
import { fetchCompetitions } from '../../../../store/action-creators/CompetitionList';
import { Link, useSearchParams } from 'react-router-dom';
import SearchBar from '../../../UI/SearchBar/SearchBar';
import ErrorLoading from '../../../UI/ErrorLoading/ErrorLoading';

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

  const itemChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setSearchParams({ name: e.target.value.replace(/ /g, '-') });
  };

  const itemClickHandler = (e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.target as HTMLLIElement;
    setSearchParams({ name: target.textContent!.replace(/ /g, '-') });
    setValue(paramsName.replace(/-/g, ' '));
    setIsOpen(!isOpen);
  };

  const valueClearHandler = () => {
    setSearchParams({ name: '' });
    setValue('');
  };

  const inputClickHandler = () => {
    setIsOpen(true);
  };

  function renderCards() {
    if (competitions.length != 0 && filteredCompetitions.length != 0) {
      return filteredCompetitions.map((competition) => (
        <Col key={competition.id} xl={8} lg={12} md={24} sm={24} xs={24}>
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
      ));
    } else if (competitions.length != 0 && filteredCompetitions.length === 0) {
      return <h1>Соревнование с таким названием не найдено</h1>;
    } else {
      return <h1>Соревнования не найдены</h1>;
    }
  }

  if (loading || error) {
    return <ErrorLoading loading={loading} error={error} />;
  }

  return (
    <div className={styles.CompetitionList}>
      <Row>
        <Col span={24}>
          <SearchBar
            placeholder={'Введите название соревнования...'}
            value={value}
            inputOnChange={itemChangeHandler}
            inputOnClick={inputClickHandler}
            array={competitions}
            isOpen={isOpen}
            filteredArray={filteredCompetitions}
            itemOnClick={itemClickHandler}
            valueClearOnClick={valueClearHandler}
          />
        </Col>
      </Row>
      <Row className={styles.Cards} gutter={[16, 16]}>
        {renderCards()}
      </Row>
    </div>
  );
};

export default CompetitionList;
