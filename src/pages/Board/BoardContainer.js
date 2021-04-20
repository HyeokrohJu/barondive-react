import React from 'react';
import classNames from 'classnames';
import { withRouter, Switch } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';

import {
  RouteWithSubRoute, HeaderPr, NavSubPr,
} from '~/common/components';
import { parseQuery } from '~/common/utils';
import {
  BoardGet, BoardIns, BoardLis, BoardUpd,
} from './modules';

import boardStyle from '~/pages/Board/styles/boardStyle';

import * as hrbg1 from '~/assets/img/main01.jpg';

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
      brd, menu,
    } = this.props;

    if (menu.getMenuInfo && menu.getMenuInfo.rid) {
      brd.apiBrdInfo({
        brdid: menu.getMenuInfo.rid,
      });
    }
  }

  render() {
    const {
      classes, location, menu, history,
    } = this.props;
    const qparams = parseQuery(history.location.search);
    return (
      <>
        <HeaderPr bgimg={hrbg1} {...this.props} />

        <div className={classNames(classes.main, classes.mainRaised)}>
          {menu.getMenuInfo && (menu.getMenuInfo.parent.children.length > 0 && (<NavSubPr {...this.props} />))}
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
      </>
    );
  }
}

export default Board;
