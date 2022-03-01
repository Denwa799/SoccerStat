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
  const paramsPage = searchParams.get('page') || '';

  // Объект параметров
  const params = { name: '', page: '1' };

  // Фильтрация данных исходя из поиска
  const filteredTeams = teams.filter((team) => {
    return team.name.toLowerCase().includes(value.toLocaleLowerCase());
  });

  // Переменные для реализации пагинации
  const lastTeamIndex = currentPage * teamsPerPage;
  const firstTeamIndex = lastTeamIndex - teamsPerPage;
  const currentTeamList = filteredTeams.slice(firstTeamIndex, lastTeamIndex);
  const currentPageValue = parseInt(paramsPage);

  useEffect(() => {
    dispatch(fetchTeams());

    // Установка значения поиска из параметров и установка страницы пагинации на 1
    params.name = paramsName;
    params.page = '1';
    setSearchParams(params);
    setCurrentPage(1);
  }, []);

  // Установка значения в поисковую строку из параметров url
  useEffect(() => {
    setValue(paramsName.replace(/-/g, ' '));
  }, [paramsName]);

  // При обнулении параметра страницы в url устанавливает значение на 1
  useEffect(() => {
    if (!paramsPage) {
      params.name = paramsName;
      params.page = '1';
      setCurrentPage(1);
      setSearchParams(params);
    }
  }, [paramsPage]);

  // Обработка ввода в поисковой строке
  const itemChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    params.name = e.target.value.replace(/ /g, '-');
    params.page = paramsPage;
    setSearchParams(params);

    // Условие необходимо, чтобы небыло бага с поиском при активной пагинации
    if (params.name) {
      setCurrentPage(1);
    } else {
      setCurrentPage(parseInt(paramsPage));
    }
  };

  // Обработка нажатия на элемент автодополнения в поисковой строке
  const itemClickHandler = (e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.target as HTMLLIElement;
    params.name = target.textContent!.replace(/ /g, '-');
    params.page = paramsPage;
    setSearchParams(params);
    setValue(paramsName.replace(/-/g, ' '));
    setIsOpen(!isOpen);
  };

  // Обработка нажатия кнопки очищения поисковой строки
  const valueClearHandler = () => {
    params.name = '';
    params.page = paramsPage;
    setSearchParams(params);
    setCurrentPage(parseInt(paramsPage));
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
    params.name = paramsName;
    params.page = `${pageNumber}`;
    setSearchParams(params);
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
            current={currentPageValue}
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
