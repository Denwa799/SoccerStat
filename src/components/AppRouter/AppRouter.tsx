import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MAIN_ROUTE } from '../../utils/routes';
import Main from '../pages/Main/Main';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path={MAIN_ROUTE} element={<Main />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};

export default AppRouter;
