import React from 'react';
import { HashRouter as Router, useRoutes } from 'react-router-dom';
import Layout from '@/main/layout';
import Account from '@/main/account';

const Routes = () => {
  const element = useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/main/account',
          element: (
            <Account />
          ),
        },
      ],
    },
  ]);
  return element;
};

export default function App() {
  return (
    <Router>
      <Routes />
    </Router>
  );
}
