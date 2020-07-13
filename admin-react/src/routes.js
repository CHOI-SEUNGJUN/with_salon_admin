import React from 'react';

/**
 * Added
 */
const Home = React.lazy(() => import('./views/Pages/Home'));
const Signin = React.lazy(() => import('./views/Pages/Signin'));
const Salon = React.lazy(() => import('./views/Pages/Salon'));
const Contents = React.lazy(() => import('./views/Pages/Contents'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  /**
   * Added
   */
  { path: '/sign-in', exact: true,  name: 'Signin', component: Signin },
  { path: '/home', exact: true,  name: 'Home', component: Home },
  { path: '/salon', exact: true,  name: 'Salon', component: Salon },
  { path: '/contents', exact: true,  name: 'Contents', component: Contents },
];

export default routes;
