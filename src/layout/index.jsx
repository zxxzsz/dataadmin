
import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import logo from '@/assets/logo.svg'
import Test from '../pages/Test';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { routers } from '../router';

const { Header, Content, Footer, Sider } = Layout;

const LayoutIndex = () => {
  console.log(routers);
  const location = useLocation();

  const getItem = (label, key, children, icon,) => {
    return { key, children, label, icon, };
  };

  const getMenuItems = (routes, menuItems = []) => {
    routes.forEach(route => {
      if (!route?.children?.length) {
        menuItems.push(getItem(<Link to={route.path}>{route.title}</Link>, route.path, route?.children))
      }
      if (route.children && Array.isArray(route.children)) {
        route.children.forEach(childRoute => {
          if (childRoute.isMenu) {
            menuItems.push(
              getItem(
                <Link to={childRoute.path}>{childRoute.title}</Link>,
                childRoute.path,
                Array.isArray(childRoute?.children) && getMenuItems(childRoute?.children)
              )
            );
          }
        });
      }
    });
    return menuItems;
  };

  return (
    <Layout className='min-h-screen'>
      <Sider
        theme="light"
        className='!bg-[#f5f7fc] my-sider'
      >
        <div className="flex justify-center items-center w-full h-16 leading-[64px]" >
          <img
            className='w-8 h-8 mr-4'
            src={logo}
          />
          <div className='text-2xl font-medium '>dataadmin</div>
        </div>
        <Menu
          className='!bg-[#f5f7fc]'
          defaultSelectedKeys={[location.pathname]}
          mode="inline"
          items={getMenuItems(routers)}
        />
      </Sider>
      <Layout>
        <Header className='p-0 bg-white' />
        <Content className='size-full  p-6 '>
          <div className='h-[calc(100vh-112px)]'>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutIndex