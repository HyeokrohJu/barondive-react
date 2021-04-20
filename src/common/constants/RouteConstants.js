import React from 'react';

export const FrontDefRoutes = [{
  menucd: 'MainSS00',
  path: '/',
  exact: true,
  component: React.lazy(() => Promise.all([
      import('~/pages/Main/MainContainer'),
      new Promise((resolve) => setTimeout(resolve, 300)),
  ]).then(([moduleExports]) => moduleExports)),
}, {
  menucd: 'LoginSS00',
  path: '/login',
  exact: false,
  component: React.lazy(() => Promise.all([
    import('~/pages/Login/LoginContainer'),
    new Promise((resolve) => setTimeout(resolve, 300)),
  ]).then(([moduleExports]) => moduleExports)),
}, {
  menucd: 'JoinSS00',
  path: '/join',
  exact: false,
  component: React.lazy(() => Promise.all([
    import('~/pages/Login/JoinContainer'),
    new Promise((resolve) => setTimeout(resolve, 300)),
  ]).then(([moduleExports]) => moduleExports)),
}, {
  menucd: 'MypageSS00',
  path: '/mypage',
  exact: false,
  component: React.lazy(() => Promise.all([
    import('~/pages/Mypage/MypageContainer'),
    new Promise((resolve) => setTimeout(resolve, 300)),
  ]).then(([moduleExports]) => moduleExports)),
  auth: 'role_user',
}];


export const AdminDefRoutes = [{
  menucd: 'MainAA00',
  path: '/sysadm',
  exact: true,
  component: React.lazy(() => Promise.all([
      import('~/pages/sysadm/Main/MainContainer'),
      new Promise((resolve) => setTimeout(resolve, 300)),
  ]).then(([moduleExports]) => moduleExports)),
  auth: 'role_admin',
}, {
  menucd: 'LoginSS00',
  path: '/sysadm/login',
  exact: false,
  component: React.lazy(() => Promise.all([
    import('~/pages/sysadm/Login/LoginContainer'),
    new Promise((resolve) => setTimeout(resolve, 300)),
  ]).then(([moduleExports]) => moduleExports)),
}];
