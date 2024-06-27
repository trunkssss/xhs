/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect } from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-form';

const Login = () => {

  const handleLogin = async(paramas) => {
    loginContext.loginSuccess()
  };

  return (
    <div className="login">
      <LoginForm
        // logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
        title="登录测试"
        subTitle=" "
        onFinish={handleLogin}
        initialValues={{
          username: 'admin',
          password: '123456',
          autoLogin: true,
        }}
        submitter={{
          submitButtonProps: {
            // loading: loadingGlobal,
            size: 'large',
            block: true,
          },
        }}
      >
        <ProFormText
          name="username"
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined className={'prefixIcon'} />,
          }}
          placeholder={'用户名'}
          rules={[
            {
              required: true,
              message: '请输入用户名!',
            },
          ]}
        />
        <ProFormText.Password
          name="password"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className={'prefixIcon'} />,
          }}
          placeholder={'密码'}
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
          ]}
        />
        <div style={{ marginBottom: 24, }}>
          <ProFormCheckbox noStyle name="autoLogin">记住密码</ProFormCheckbox>
          <a style={{ float: 'right', }}>忘记密码</a>
        </div>
      </LoginForm>
    </div>
  );
};

export default Login;
