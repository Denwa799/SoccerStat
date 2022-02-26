import React from 'react';

export interface IAppTable {
  dataSource: Array<{
    key: number;
    status: string;
    date: string;
    teams: string;
    score: string;
  }>;
}

export interface IAppTableColumn {
  title: string;
  dataIndex: string;
  key: string;
  responsive?: any; // Сюда приходят брейкпоинты от библиотеки ant design
}

export interface IErrorLoading {
  loading: boolean;
  error: null | string;
}

export interface ISearchBar {
  placeholder: string;
  value: string;
  inputOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputOnClick: () => void;
  array: any[]; // Может приходит любой массив, будь то соревнования или команды
  isOpen: boolean;
  filteredArray: any[]; // Может приходит любой массив, будь то соревнования или команды
  itemOnClick: (e: React.MouseEvent<HTMLLIElement>) => void;
  valueClearOnClick: () => void;
}
