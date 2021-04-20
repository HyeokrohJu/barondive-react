import React from 'react';
import classNames from 'classnames';
import { withRouter, Switch, Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import { Icon } from 'react-icons-kit';
import { user } from 'react-icons-kit/feather/user';
import { checkSquare } from 'react-icons-kit/feather/checkSquare';

import {
  RouteWithSubRoute, HeaderPr,
} from '~/common/components';
import { getUUID } from '~/common/utils';

import { UserInfo, RevList, RevGet } from './modules';
import mypageStyle from './styles/mypageStyle';

import * as hrbg1 from '~/assets/img/hrbg1.jpg';

@inject((stores) => ({
  menu: stores.menuStore,
}))
@withRouter
@withStyles(mypageStyle)
@observer
class Mypage extends React.Component {
  constructor(props) {
    super(props);
    const { match } = props;
    this.subRoutes = [{
      menucd: 'userInfo',
      path: match.path,
      exact: true,
      component: UserInfo,
    }, {
      menucd: 'revList',
      path: `${match.path}/revList`,
      exact: true,
      component: RevList,
      auth: 'user',
    }, {
      menucd: 'revGet',
      path: `${match.path}/revGet`,
      exact: true,
      component: RevGet,
      auth: 'user',
    }];
  }

  render() {
    const {
      classes, location, history,
    } = this.props;

    let actCls = '';
    switch (location.pathname) {
      case '/mypage': actCls = 'mypage'; break;
      case '/mypage/revList': case '/mypage/revGet': actCls = 'revList'; break;
      default: actCls = '';
    }

    return (
      <>
        <HeaderPr bgimg={hrbg1} {...this.props} />

        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.subMenuWrap}>
            <Link to="/mypage">
              <button type="button" className={classNames(classes.subMenuItem, actCls === 'mypage' ? 'active' : '')}>
                <span className={classes.subMenuIcon}><Icon icon={user} /></span>
                <span className={classes.subMenuTxt}>회원정보</span>
              </button>
            </Link>
            <Link to="/mypage/revList">
              <button type="button" className={classNames(classes.subMenuItem, actCls === 'revList' ? 'active' : '')}>
                <span className={classes.subMenuIcon}><Icon icon={checkSquare} /></span>
                <span className={classes.subMenuTxt}>예약내역</span>
              </button>
            </Link>
          </div>
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
      </>
    );
  }
}

export default Mypage;
