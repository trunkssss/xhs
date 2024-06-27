import React from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import Layout from '@/frame/layout';
import Account from '@/pages/account';

const Routes = () => {
  const element = useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/account',
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
    <>
      ss
      <Router>
        <Routes />
      </Router>
    </>
  );
}