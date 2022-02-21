import React from 'react';
import { Table } from 'antd';
import { IAppTable, IAppTableColumn } from '../../../types/UI/UI';

const AppTable: React.FC<IAppTable> = ({ dataSource }) => {
  const columns: IAppTableColumn[] = [
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
