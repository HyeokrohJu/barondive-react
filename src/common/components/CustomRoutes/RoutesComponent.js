import React from 'react';
import { observer } from 'mobx-react';
import { Switch } from 'react-router-dom';

import { getUUID } from '~/common/utils';

import RouteWithSubRoute from './RouteWithSubRoute';

const Routes = observer(({ location, history, routesList }) => (
  <Switch location={location}>
    {routesList.map((route) => (
      <RouteWithSubRoute
        key={location.key || getUUID()}
        history={history}
        dynamic
        {...route}
      />
    ))}
  </Switch>
));

export default Routes;
