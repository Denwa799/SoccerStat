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
    <div className={styles.TeamList}>
      <Row>
        <Col span={7}>
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
        {teams.length != 0 ? (
          filteredTeams.map((team) => (
            <Col key={team.id} span={8}>
              <Link to={`${team.id}`}>
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
              </Link>
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
