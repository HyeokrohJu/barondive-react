import React from 'react';
import classNames from 'classnames';
import { withRouter, Switch } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';

import { RouteWithSubRoute } from '~/common/components';
import { getUUID, parseQuery } from '~/common/utils';

import { RevList, RevGet } from './modules';
import reservationStyle from './styles/reservationStyle';

@inject((stores) => ({
  menu: stores.menuStore,
}))
@withRouter
@withStyles(reservationStyle)
@observer
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    const { match } = props;
    this.subRoutes = [{
      menucd: 'revList',
      path: `${match.path}/revList`,
      exact: true,
      component: RevList,
      auth: 'role_admin',
    }, {
      menucd: 'revGet',
      path: `${match.path}/revGet`,
      exact: true,
      component: RevGet,
      auth: 'role_admin',
    }];
  }

  render() {
    const {
      classes, location, history, menu,
    } = this.props;
    const qparams = parseQuery(history.location.search);
    const menuArr = menu.getAdmMenuTree;
    const currtMenu = menu.admFindActiveMenu(menuArr, qparams.menucd);

    return (
      <div className={classNames(classes.main, classes.mainRaised)}>
        {currtMenu && (
          <h4 className={classes.pageTitle}>{currtMenu.menunm}</h4>
        )}
        <Switch location={location}>
          {this.subRoutes.map((route) => (
            <RouteWithSubRoute
              key={location.key || getUUID()}
              history={history}
              {...route}
            />
          ))}
        </Switch>
      </div>
    );
  }
}

export default Reservation;
