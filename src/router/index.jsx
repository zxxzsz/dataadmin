import { createBrowserRouter, Navigate } from 'react-router-dom';
import LayoutIndex from '../layout';
import DataView from '../pages/DataView';
import MyTable from '@/pages/Test';

export const routers = [
  {
    path: "/",
    element: <LayoutIndex />,
    children: [
      {
        path: '/',
        element: <Navigate to="/test" replace />
      },
      {
        path: "/dataView",
        title: '数据视图查询',
        isMenu: true,
        element: < DataView />,
      },
      {
        path: "/test",
        title: '测试',
        isMenu: true,
        element: <MyTable />,
      },
    ],
  },
];

const Router = createBrowserRouter(routers, { basename: '/dataadmin' });
export default Router;