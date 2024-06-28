import React, { useState, useRef, useEffect } from 'react';
import { ProTable } from '@ant-design/pro-components';
import { Button, Dropdown, Space, Tag, Popconfirm, Switch } from 'antd';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import ModalSubmit from './components/ModalSubmit';
import ModalAutoSetting from './components/ModalAutoSetting';
import { filter, find, forEach, map } from 'lodash-es';

export default () => {

  const [testData, setTestData] = useState([{
    id: '123',
    name: '测试1',
    createTime: '2024-06-27',
    ip: '192.168.0.1:8080',
    winId: '',
    winHandle: '',
  }, {
    id: '456',
    name: '测试2',
    createTime: '2024-06-27',
    ip: '192.168.0.1:8088',
    winId: '',
    winHandle: '',
  }])

  const tableRef = useRef();

  useEffect(() => {
    mainContext.onProxyWinClose((e, { id, winId, winHandle }) => {
      const draft = map(testData, item => {
        if (item.id === id) return { ...item, winId, winHandle }
        else return item
      })
      console.log(draft)
      setTestData(draft)
    });
  }, [testData])

  const handleSubmitDone = (refresh) => {
    if (refresh) tableRef.current?.reload && tableRef?.current?.reload();
  };

  const columns = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '窗口名称',
      key: 'name',
      dataIndex: 'name',
      hideInSearch: true,
    },
    {
      title: '窗口标识',
      key: 'winHandle',
      dataIndex: 'winHandle',
      hideInSearch: true,
    },
    {
      title: '代理ip',
      key: 'ip',
      dataIndex: 'ip',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      key: 'createTime',
      dataIndex: 'createTime',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '养号',
      // align: 'center',
      key: 'option',
      valueType: 'option',
      render: (_, data) => {
        return [
          <Switch 
            checkedChildren="开启养号" 
            unCheckedChildren="关闭养号"
            disabled={!data.winHandle}
            size="small"
            onChange={async(status) => {
              const name = await mainContext.controlSelenium(status, data);
              const draft = map(testData, item => {
                if (item.id === data.id) return { ...item, name }
                else return item
              })
              setTestData(draft)
            }}
          />,
        ];
      },
    },
    {
      title: '操作',
      // align: 'center',
      key: 'option',
      valueType: 'option',
      render: (_, data) => {
        return [
          <a 
            key="open"
            onClick={async() => {
              const { winId, winHandle } = await mainContext.toggleWindow(data);
              const draft = map(testData, item => {
                if (item.id === data.id) return { ...item, winId, winHandle }
                else return item
              })
              setTestData(draft)
            }}
          >
            {data.winId ? '关闭' : '打开'}
          </a>,
          
          <ModalSubmit
            editData={data}
            onDone={handleSubmitDone}
            trigger={<a key="edit">编辑</a>}
          />,
          <ModalAutoSetting 
            onDone={() => {}}
            trigger={<a>自动化配置</a>}
          />,
          <Popconfirm
            title="确认删除"
            onConfirm={async() => {
              // handleUpdate({ id: data.id || '', })
              // const [success,] = await updateVisibleStatus({ id: data.id, showStatus: data.showStatus === 0 ? 1 : 0, });
              // if (!success) return;
              // message.success('操作成功');
              // handleSubmitDone(true);
            }}
            okText="确认"
            cancelText="取消"
          >
            <a key="delete">删除</a>
          </Popconfirm>,
        ];
      },
    },
  ];

  return (
    <>
      <ProTable
        columns={columns}
        actionRef={tableRef}
        cardBordered
        editable={{
          type: 'multiple',
        }}
        dataSource={testData}
        // columnsState={{
        //   persistenceKey: 'pro-table-singe-demos',
        //   persistenceType: 'localStorage',
        //   defaultValue: {
        //     option: { fixed: 'right', disable: true },
        //   },
        //   onChange(value) {
        //     console.log('value: ', value);
        //   },
        // }}
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
        // toolBarRender={null}
        toolBarRender={() => [
          // <Button 
          //   key="button" 
          //   icon={<PlusOutlined />} 
          //   type="primary" 
          //   onClick={() => {
          //     setEditSubmitData({})
          //   }
          // }>
          //   新建窗口
          // </Button>,
          <ModalSubmit
            onDone={handleSubmitDone}
            trigger={
              <Button type="primary" size="small">
                <PlusOutlined />
                新建窗口
              </Button>
            }
          />
        ]}
      />
    </>
  );
}
