import React, { useEffect, useState } from 'react';
import styles from './CompetitionList.module.css';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { Card, Col, Pagination, Row } from 'antd';
import noImage from '../../../../assets/img/noImage.jpg';
import { useDispatch } from 'react-redux';
import { fetchCompetitions } from '../../../../store/action-creators/CompetitionList';
import { Link, useSearchParams } from 'react-router-dom';
import SearchBar from '../../../UI/SearchBar/SearchBar';
import ErrorLoading from '../../../UI/ErrorLoading/ErrorLoading';
import { competitionListSelector } from '../../../../store/selectors/selectors';

const { Meta } = Card;

const CompetitionList: React.FC = () => {
  const { competitions, error, loading } = useTypedSelector(competitionListSelector);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const paramsName = searchParams.get('name') || '';
  const [value, setValue] = useState(paramsName.replace(/-/g, ' '));

  const [currentPage, setCurrentPage] = useState(1);
  const [competitionsPerPage, setCompetitionsPerPage] = useState(6);

  const filteredCompetitions = competitions.filter((competition) => {
    return competition.name.toLowerCase().includes(value.toLocaleLowerCase());
  });

  useEffect(() => {
    dispatch(fetchCompetitions());
  }, []);

  useEffect(() => {
    setValue(paramsName.replace(/-/g, ' '));
  }, [paramsName]);

  const lastCompetitionIndex = currentPage * competitionsPerPage;
  const firstCompetitionIndex = lastCompetitionIndex - competitionsPerPage;
  const currentCompetition = filteredCompetitions.slice(
    firstCompetitionIndex,
    lastCompetitionIndex
  );

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

  const handlePageChange = (pageNumber: number, pageSize: any) => {
    setCurrentPage(pageNumber);
    setCompetitionsPerPage(pageSize);
  };

  function renderCards() {
    if (competitions.length != 0 && filteredCompetitions.length != 0) {
      return currentCompetition.map((competition) => (
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
      <Row className={styles.PaginationRow}>
        <Col span={24}>
          <Pagination
            defaultCurrent={1}
            defaultPageSize={6}
            size={window.innerWidth <= 420 ? 'small' : 'default'}
            responsive={false}
            total={filteredCompetitions.length}
            showSizeChanger={true}
            onChange={handlePageChange}
            pageSizeOptions={['6', '9', '15', '21']}
          />
        </Col>
      </Row>
    </div>
  );
};

export default CompetitionList;
