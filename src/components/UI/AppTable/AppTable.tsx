import React from 'react';
import { Table } from 'antd';

interface AppTable {
  dataSource: Array<{
    key: number;
    status: string;
    date: string;
    awayTeam: string;
    homeTeam: string;
    score: string;
  }>;
}

interface AppTableColumn {
  title: string;
  dataIndex: string;
  key: string;
}

const AppTable: React.FC<AppTable> = ({ dataSource }) => {
  const columns: AppTableColumn[] = [
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Дата и время',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Домашняя команда',
      dataIndex: `homeTeam`,
      key: 'homeTeam',
    },
    {
      title: 'Команда противника',
      dataIndex: `awayTeam`,
      key: 'awayTeam',
    },
    {
      title: 'Счет',
      dataIndex: `score`,
      key: 'score',
    },
  ];
  return <Table columns={columns} dataSource={dataSource} scroll={{ x: '550px' }} />;
};

export default AppTable;
