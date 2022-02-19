import React, { useEffect, useState } from 'react';
import styles from './TeamList.module.css';
import { Card, Col, Row } from 'antd';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { fetchTeams } from '../../../../store/action-creators/TeamList';
import noImage from '../../../../assets/img/noImage.jpg';
import SearchBar from '../../../UI/SearchBar/SearchBar';
import { Link, useSearchParams } from 'react-router-dom';

const { Meta } = Card;

const TeamList: React.FC = () => {
  const { teams, error, loading } = useTypedSelector((state) => state.teamList);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const paramsName = searchParams.get('name') || '';
  const [value, setValue] = useState(paramsName.replace(/-/g, ' '));

  const filteredTeams = teams.filter((team) => {
    return team.name.toLowerCase().includes(value.toLocaleLowerCase());
  });

  useEffect(() => {
    dispatch(fetchTeams());
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

  const inputClickHandler = () => {
    setIsOpen(true);
  };

  function renderCards() {
    if (teams.length != 0) {
      return filteredTeams.map((team) => (
        <Col key={team.id} xl={8} lg={12} md={24} sm={24} xs={24}>
          <Link to={`${team.id}`}>
            <Card
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
          </Link>
        </Col>
      ));
    } else {
      return <h1>Команды не найдены</h1>;
    }
  }

  return (
    <div className={styles.TeamList}>
      <Row>
        <Col span={24}>
          <SearchBar
            placeholder={'Введите название команды...'}
            value={value}
            inputOnChange={itemChangeHandler}
            inputOnClick={inputClickHandler}
            array={teams}
            isOpen={isOpen}
            filteredArray={filteredTeams}
            itemOnClick={itemClickHandler}
          />
        </Col>
      </Row>
      <Row className={styles.Cards} gutter={[16, 16]}>
        {renderCards()}
      </Row>
    </div>
  );
};

export default TeamList;
