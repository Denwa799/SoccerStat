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
      title: 'Счет (доп время) (пенальти)',
      dataIndex: `score`,
      key: 'score',
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      scroll={{ x: '320px' }}
      pagination={{
        size: window.innerWidth <= 420 ? 'small' : 'default',
        position: ['bottomLeft'],
        showSizeChanger: true,
      }}
    />
  );
};

export default AppTable;
