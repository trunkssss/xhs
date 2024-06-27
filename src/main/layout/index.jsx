import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useOutlet } from 'react-router-dom';
import { Avatar, Dropdown, Menu, Switch, Tabs, notification } from 'antd';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import * as Icon from '@ant-design/icons';
import { LogoutOutlined, SettingOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { find } from 'lodash-es';

const Container = () => {

  const location = useLocation();
  const outlet = useOutlet();
  const navigate = useNavigate();
  const [collapsed, setCollapsed,] = useState(false);

  const routes = [
    { name: '窗口管理', path: '/main/account' },
    // { name: '数据采集', path: '/collect' }
  ]

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
        title="可乐浏览器"
        // logo="https://gw.alipayobjects.com/mdn/rms_b5fcc5/afts/img/A*1NHAQYduQiQAAAAAAAAAAABkARQnAQ"
        collapsedButtonRender = {false}
        collapsed = {collapsed}
        menuItemRender={(item, dom) => (
          <a
            onClick={() => {
              navigate(item.path);
            }}
          >
            {/* {item.icon} */}
            {dom}
          </a>
        )}
      >
        <div className="sider-wrapper">
          { outlet }
        </div>
      </ProLayout>
    </>
  );
};
export default Container;
