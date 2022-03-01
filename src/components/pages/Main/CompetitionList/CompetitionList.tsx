import React, { useEffect, useState } from 'react';
import styles from './CompetitionList.module.css';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { Card, Col, Pagination, Row } from 'antd';
import { useDispatch } from 'react-redux';
import { fetchCompetitions } from '../../../../store/action-creators/CompetitionList';
import { Link, useSearchParams } from 'react-router-dom';
import SearchBar from '../../../UI/SearchBar/SearchBar';
import ErrorLoading from '../../../UI/ErrorLoading/ErrorLoading';
import { competitionListSelector } from '../../../../store/selectors/selectors';

const { Meta } = Card;

const CompetitionList: React.FC = () => {
  // Получение данных из store
  const { competitions, error, loading } = useTypedSelector(competitionListSelector);
  const dispatch = useDispatch();

  // Локальный стейт для реализации поиска
  const [isOpen, setIsOpen] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const paramsName = searchParams.get('name') || '';
  const [value, setValue] = useState(paramsName.replace(/-/g, ' '));

  // Локальный стейт для реализации пагинации
  const [currentPage, setCurrentPage] = useState(1);
  const [competitionsPerPage, setCompetitionsPerPage] = useState(6);
  const paramsPage = searchParams.get('page') || '';

  // Объект параметров
  const params = { name: '', page: '1' };

  // Фильтрация данных исходя из поиска
  const filteredCompetitions = competitions.filter((competition) => {
    return competition.name.toLowerCase().includes(value.toLocaleLowerCase());
  });

  // Переменные для реализации пагинации
  const lastCompetitionIndex = currentPage * competitionsPerPage;
  const firstCompetitionIndex = lastCompetitionIndex - competitionsPerPage;
  const currentCompetitionList = filteredCompetitions.slice(
    firstCompetitionIndex,
    lastCompetitionIndex
  );
  const currentPageValue = parseInt(paramsPage);

  useEffect(() => {
    dispatch(fetchCompetitions());

    // Установка значения поиска из параметров и установка страницы пагинации на 1
    params.name = paramsName;
    params.page = '1';
    setSearchParams(params);
    setCurrentPage(1);
  }, []);

  // Установка значения в параметры строки url
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
    setCompetitionsPerPage(pageSize);
    params.name = paramsName;
    params.page = `${pageNumber}`;
    setSearchParams(params);
  };

  // Отрисовка карточек соревнований
  function renderCards() {
    if (competitions.length != 0 && filteredCompetitions.length != 0) {
      return currentCompetitionList.map((competition) => (
        <Col key={competition.id} xl={8} lg={12} md={24} sm={24} xs={24}>
          <Link to={`${competition.id}`}>
            <Card className={styles.Card} hoverable>
              <Meta
                className={styles.Meta}
                title={competition.name}
                description={competition.area.name}
              />
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

  // Обработка ошибки и загрузки
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
      <Row className={styles.PaginationRow}>
        <Col span={24}>
          <Pagination
            current={currentPageValue}
            defaultCurrent={1}
            defaultPageSize={6}
            size={window.innerWidth <= 420 ? 'small' : 'default'}
            responsive={false}
            total={filteredCompetitions.length}
            showSizeChanger={true}
            onChange={pageChangeHandler}
            pageSizeOptions={['6', '9', '15', '21']}
          />
        </Col>
      </Row>
    </div>
  );
};

export default CompetitionList;
