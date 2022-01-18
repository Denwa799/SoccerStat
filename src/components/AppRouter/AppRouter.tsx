import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MAIN_ROUTE, MATCHES_ROUTE, TEAMS_ROUTE, COMPETITION_ID_ROUTE } from '../../utils/routes';
import CompetitionResource from '../pages/Main/CompetitionResource/CompetitionResource';
import Main from '../pages/Main/Main';
import Matches from '../pages/Matches/Matches';
import Teams from '../pages/Teams/Teams';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path={MAIN_ROUTE} element={<Main />} />
      <Route path={MATCHES_ROUTE} element={<Matches />} />
      <Route path={TEAMS_ROUTE} element={<Teams />} />
      <Route path={COMPETITION_ID_ROUTE} element={<CompetitionResource />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};

export default AppRouter;
