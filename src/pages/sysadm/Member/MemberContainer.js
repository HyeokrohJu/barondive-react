import React from 'react';
import classNames from 'classnames';
import { withRouter, Switch } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';

import { RouteWithSubRoute } from '~/common/components';
import { getUUID, parseQuery } from '~/common/utils';

import { MemberList, MemberGet } from './modules';
import memberStyle from './styles/memberStyle';

@inject((stores) => ({
  member: stores.memberStore,
  menu: stores.menuStore,
}))
@withRouter
@withStyles(memberStyle)
@observer
class Member extends React.Component {
  constructor(props) {
    super(props);
    const { match } = props;
    this.subRoutes = [{
      menucd: 'memberList',
      path: `${match.path}/memberList`,
      exact: true,
      component: MemberList,
      auth: 'role_admin',
    }, {
      menucd: 'memberGet',
      path: `${match.path}/memberGet`,
      exact: true,
      component: MemberGet,
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

export default Member;
