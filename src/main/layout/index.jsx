import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useOutlet } from 'react-router-dom';
import { Avatar, Dropdown, Menu, Switch, Tabs, notification } from 'antd';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import * as Icon from '@ant-design/icons';
import { LogoutOutlined, SettingOutlined, LockOutlined, UserOutlined, MenuFoldOutlined, MenuUnfoldOutlined, WindowsOutlined } from '@ant-design/icons';
import { find } from 'lodash-es';

const Container = () => {

  const location = useLocation();
  const outlet = useOutlet();
  const navigate = useNavigate();
  const [collapsed, setCollapsed,] = useState(false);

  const routes = [
    { name: '窗口管理', path: '/main/account', icon: <WindowsOutlined />, location: { pathname: '/main/account' } },
    // { name: '数据采集', path: '/collect' }
  ]

  const items = [
    // {
    //   label: '个人中心',
    //   key: 'minf',
    //   itemIcon: <UserOutlined />,
    // },
    // {
    //   label: '系统设置',
    //   key: 'system',
    //   itemIcon: <SettingOutlined />,
    // },
    // {
    //   label: '修改密码',
    //   key: 'modify',
    //   itemIcon: <LockOutlined />,
    //   onClick: () => setEditSubmitData({}),
    // },
    // {
    //   type: 'divider',
    // },
    {
      label: '退出登录',
      key: 'login',
      itemIcon: <LogoutOutlined />,
      onClick: () => {
        // dispatch(getLogoutAction());
      },
    },
  ];

  return (
    <>
      <ProLayout
        disableContentMargin
        route={{ path: '/', routes, }}
        location={{
          pathname: location.pathname,
        }}
        style={{ padding: '15px' }}
        headerRender={false}
        fixSiderbar
        title="abcd"
        // logo="https://gw.alipayobjects.com/mdn/rms_b5fcc5/afts/img/A*1NHAQYduQiQAAAAAAAAAAABkARQnAQ"
        collapsedButtonRender = {false}
        collapsed = {collapsed}
        menuItemRender={(item, dom) => (
          <a
            onClick={() => {
              navigate(item.path);
            }}
          >
            {item.icon}
            {dom}
          </a>
        )}
      >
        <div className="sider-wrapper">
          <Tabs
            hideAdd
            className="menu-tab"
            onChange={navigate}
            activeKey={location.pathname}
            type="editable-card"
            // onEdit={(path) => {
            //   const { draft, prev, next, } = removePanes(path as string);
            //   if (path === location.pathname) {
            //     const path = prev ? prev.path : next ? next.path : '/';
            //     navigate(path);
            //   }
            //   dispatch(setPaneListAction(draft));
            // }}
            tabBarExtraContent={{
              left: (
                <div
                  onClick={() => setCollapsed(!collapsed)}
                  className="menu-collapsed"
                >
                  {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </div>
              ),
              right: (
                <Dropdown
                  overlay={
                    <Menu
                      items={items}
                      style={{ minWidth: '160px', }}
                    />
                  }
                  placement="bottom"
                  arrow={{ pointAtCenter: true, }}>
                  <a
                    onClick={e => e.preventDefault()}
                    className="user-info"
                  >
                    <Avatar style={{ backgroundColor: '#87d068', }} icon={<UserOutlined />} />
                    <span>测试账户</span>
                  </a>
                </Dropdown>
              ),
            }}
          />
          { outlet }
        </div>
      </ProLayout>
    </>
  );
};
export default Container;
