import React from 'react';
import { Table } from 'antd';
import { IAppTable, IAppTableColumn } from '../../../types/UI/UI';

const AppTable: React.FC<IAppTable> = ({ dataSource }) => {
  const columns: IAppTableColumn[] = [
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      responsive: ['sm'],
    },
    {
      title: 'Дата и время',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Хозяева VS Гости',
      dataIndex: `teams`,
      key: 'teams',
    },
    {
      title: 'Счет',
      dataIndex: `score`,
      key: 'score',
    },
  ];
  return <Table columns={columns} dataSource={dataSource} scroll={{ x: '320px' }} />;
};

export default AppTable;
