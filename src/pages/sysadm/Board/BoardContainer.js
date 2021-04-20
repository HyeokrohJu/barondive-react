import React from 'react';
import classNames from 'classnames';
import { withRouter, Switch } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';

import { RouteWithSubRoute } from '~/common/components';
import { parseQuery } from '~/common/utils';
import {
  BoardGet, BoardIns, BoardLis, BoardUpd,
} from './modules';

import boardStyle from './styles/boardStyle';

@inject((stores) => ({
  menu: stores.menuStore,
  brd: stores.brdStore,
}))
@withRouter
@withStyles(boardStyle)
@observer
class Board extends React.Component {
  constructor(props) {
    super(props);
    const { match } = props;
    this.subRoutes = [{
      menucd: 'brdLis',
      path: match.path,
      exact: true,
      component: BoardLis,
    }, {
      menucd: 'brdIns',
      path: `${match.path}/ins`,
      exact: true,
      component: BoardIns,
      auth: 'role_user',
    }, {
      menucd: 'brdGet',
      path: `${match.path}/get`,
      exact: true,
      component: BoardGet,
    }, {
      menucd: 'brdUpd',
      path: `${match.path}/upd`,
      exact: true,
      component: BoardUpd,
      auth: 'role_user',
    }];
  }

  componentDidMount() {
    const {
      brd, history,
    } = this.props;
    const qparams = parseQuery(history.location.search);

    brd.apiBrdInfo({
      brdid: qparams.rid,
      ...qparams,
    });
  }

  render() {
    const {
      classes, location, menu, history,
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
              key={location.key}
              history={history}
              currentPage={qparams.currentPageNo}
              {...route}
            />
          ))}
        </Switch>
      </div>
    );
  }
}

export default Board;
