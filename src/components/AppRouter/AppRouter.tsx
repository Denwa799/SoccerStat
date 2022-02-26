import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import {
  MAIN_ROUTE,
  MATCHES_ROUTE,
  TEAMS_ROUTE,
  COMPETITION_ID_ROUTE,
  TEAM_ID_ROUTE,
  MATCH_ID_ROUTE,
} from '../../utils/routes';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styles from '../UI/ErrorLoading/ErrorLoading.module.css';

const Main = React.lazy(() => import('../pages/Main/Main'));
const Matches = React.lazy(() => import('../pages/Matches/Matches'));
const Teams = React.lazy(() => import('../pages/Teams/Teams'));
const CompetitionResource = React.lazy(
  () => import('../pages/Main/CompetitionResource/CompetitionResource')
);
const MatchResource = React.lazy(() => import('../pages/Matches/MatchResource/MatchResource'));
const TeamResource = React.lazy(() => import('../pages/Teams/TeamResource/TeamResource'));

const antIcon = <LoadingOutlined className={styles.Loader} spin />;

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route
        path={MAIN_ROUTE}
        element={
          <Suspense fallback={<Spin indicator={antIcon} />}>
            <Main />
          </Suspense>
        }
      />
      <Route
        path={MATCHES_ROUTE}
        element={
          <Suspense fallback={<Spin indicator={antIcon} />}>
            <Matches />
          </Suspense>
        }
      />
      <Route
        path={TEAMS_ROUTE}
        element={
          <Suspense fallback={<Spin indicator={antIcon} />}>
            <Teams />
          </Suspense>
        }
      />
      <Route
        path={COMPETITION_ID_ROUTE}
        element={
          <Suspense fallback={<Spin indicator={antIcon} />}>
            <CompetitionResource />
          </Suspense>
        }
      />
      <Route
        path={MATCH_ID_ROUTE}
        element={
          <Suspense fallback={<Spin indicator={antIcon} />}>
            <MatchResource />
          </Suspense>
        }
      />
      <Route
        path={TEAM_ID_ROUTE}
        element={
          <Suspense fallback={<Spin indicator={antIcon} />}>
            <TeamResource />
          </Suspense>
        }
      />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};

export default AppRouter;
