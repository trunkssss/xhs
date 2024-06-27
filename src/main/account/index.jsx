import React from 'react';
import { ProTable } from '@ant-design/pro-components';
import { Button, Dropdown, Space, Tag } from 'antd';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';

const columns = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '发布时间',
    key: 'createTime',
    dataIndex: 'createTime',
    valueType: 'date',
    hideInSearch: true,
  },
  {
    title: '标题',
    key: 'title',
    dataIndex: 'title',
    hideInSearch: true,
  },
  {
    title: '作品链接',
    key: 'link',
    dataIndex: 'link',
    hideInSearch: true,
  },
  {
    title: '点赞数量',
    key: 'likeCount',
    dataIndex: 'likeCount',
    hideInSearch: true,
  },
  {
    title: '评论数量',
    key: 'commentCount',
    dataIndex: 'commentCount',
    hideInSearch: true,
  },
  {
    title: '文章标签',
    key: 'tag',
    dataIndex: 'tag',
    hideInSearch: true,
  },
];


export default () => {


  return (
    <div>
      {/* <div>
        {`本应用正在使用 Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), 和 Electron (v${versions.electron()})`}
        <button 
          onClick={async() => {
            const text = await versions.runSelenium()
            console.log(text)
          }}
        >
          点击
        </button>
      </div> */}
      <ProTable
        columns={columns}
        // actionRef={actionRef}
        cardBordered
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          defaultValue: {
            option: { fixed: 'right', disable: true },
          },
          onChange(value) {
            console.log('value: ', value);
          },
        }}
        rowKey="id"
        search={false}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        pagination={{
          pageSize: 5,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="作品信息"
        toolBarRender={null}
      />
    </div>
  );
}
