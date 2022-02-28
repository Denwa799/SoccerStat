import React, { useEffect, useState } from 'react';
import styles from './TeamList.module.css';
import { Card, Col, Pagination, Row } from 'antd';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { fetchTeams } from '../../../../store/action-creators/TeamList';
import noImage from '../../../../assets/img/noImage.jpg';
import SearchBar from '../../../UI/SearchBar/SearchBar';
import { Link, useSearchParams } from 'react-router-dom';
import ErrorLoading from '../../../UI/ErrorLoading/ErrorLoading';
import { teamListSelector } from '../../../../store/selectors/selectors';

const { Meta } = Card;

const TeamList: React.FC = () => {
  // Получение данных из store
  const { teams, error, loading } = useTypedSelector(teamListSelector);
  const dispatch = useDispatch();

  // Локальный стейт для реализации поиска
  const [isOpen, setIsOpen] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const paramsName = searchParams.get('name') || '';
  const [value, setValue] = useState(paramsName.replace(/-/g, ' '));

  // Локальный стейт для реализации пагинации
  const [currentPage, setCurrentPage] = useState(1);
  const [teamsPerPage, setTeamsPerPage] = useState(6);

  // Фильтрация данных исходя из поиска
  const filteredTeams = teams.filter((team) => {
    return team.name.toLowerCase().includes(value.toLocaleLowerCase());
  });

  // Диспатч списка команд
  useEffect(() => {
    dispatch(fetchTeams());
  }, []);

  // Установка значения в параметры строки url
  useEffect(() => {
    setValue(paramsName.replace(/-/g, ' '));
  }, [paramsName]);

  // Переменные для реализации пагинации
  const lastTeamIndex = currentPage * teamsPerPage;
  const firstTeamIndex = lastTeamIndex - teamsPerPage;
  const currentTeamList = filteredTeams.slice(firstTeamIndex, lastTeamIndex);

  // Обработка ввода в поисковой строке
  const itemChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setSearchParams({ name: e.target.value.replace(/ /g, '-') });
  };

  // Обработка нажатия на элемент автодополнения в поисковой строке
  const itemClickHandler = (e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.target as HTMLLIElement;
    setSearchParams({ name: target.textContent!.replace(/ /g, '-') });
    setValue(paramsName.replace(/-/g, ' '));
    setIsOpen(!isOpen);
  };

  // Обработка нажатия кнопки очищения поисковой строки
  const valueClearHandler = () => {
    setSearchParams({ name: '' });
    setValue('');
  };

  // Обработка нажатия на поисковую строку
  const inputClickHandler = () => {
    setIsOpen(true);
  };

  // Обработка нажатия на кнопки смены страницы в пагинации
  const pageChangeHandler = (pageNumber: number, pageSize: number) => {
    setCurrentPage(pageNumber);
    setTeamsPerPage(pageSize);
  };

  // Отрисовка карточек команд
  function renderCards() {
    if (teams.length != 0 && filteredTeams.length != 0) {
      return currentTeamList.map((team) => (
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
    } else if (teams.length != 0 && filteredTeams.length === 0) {
      return <h1>Команда с таким названием не найдена</h1>;
    } else {
      return <h1>Команды не найдены</h1>;
    }
  }

  // Обработка ошибки и загрузки
  if (loading || error) {
    return <ErrorLoading loading={loading} error={error} />;
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
            valueClearOnClick={valueClearHandler}
          />
        </Col>
      </Row>
      <Row className={styles.Cards} gutter={[16, 16]}>
        {renderCards()}
      </Row>
      <Row className={styles.PaginationRow}>
        <Col span={24}>
          <Pagination
            defaultCurrent={1}
            defaultPageSize={6}
            size={window.innerWidth <= 420 ? 'small' : 'default'}
            responsive={false}
            total={filteredTeams.length}
            showSizeChanger={true}
            onChange={pageChangeHandler}
            pageSizeOptions={['6', '9', '15', '21']}
          />
        </Col>
      </Row>
    </div>
  );
};

export default TeamList;
