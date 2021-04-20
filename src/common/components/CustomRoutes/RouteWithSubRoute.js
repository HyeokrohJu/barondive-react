import React, { Suspense } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { isToken, getAccessToken } from '~/common/utils';

const Loading = () => (
  <>
    <div className="loading-dimed" />
    <div className="loading-container">
      <div className="loading" />
      <div id="loading-text">loading</div>
    </div>
  </>
);

const RouteWithSubRoute = (route) => {
  const { location } = route.history;
  const retPath = location.pathname + location.search;
  return (
    <Route
      key={route.menucd}
      exact={route.exact}
      path={route.path}
      render={(props) => {
        console.log(location.pathname);
        if (route.auth) {
          if (location.pathname.indexOf('sysadm') > -1) {
            if (!isToken()) {
              return <Redirect to={`/sysadm/login?returnUrl=${retPath}`} />;
            }

            const authorities = getAccessToken().authorities.filter(
              (value) => value === 'role_admin',
            );
            if (authorities.length === 0) {
              return <Redirect to={`/sysadm/login?returnUrl=${retPath}`} />;
            }
          } else {
            if (!isToken()) {
              return <Redirect to={`/login?returnUrl=${retPath}`} />;
            }

            if (route.auth === 'role_admin') {
              const authorities = getAccessToken().authorities.filter(
                (value) => value === 'role_admin',
              );
              if (authorities.length === 0) {
                return <Redirect to={`/login?returnUrl=${retPath}`} />;
              }
            }
          }
        }
        if (route.dynamic) {
          return (
            <Suspense fallback={<Loading />}>
              <route.component
                {...props}
                routes={route.routes}
                action={route.actions}
              />
            </Suspense>
          );
        }
        return (
          <route.component
            {...props}
            routes={route.routes}
            action={route.actions}
          />
        );
      }}
    />
  );
};

export default RouteWithSubRoute;
