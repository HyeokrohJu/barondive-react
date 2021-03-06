/* eslint-disable no-console */
import React from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

import {
  storageToken, isToken, isTokenExpiry, isRefreshTokenExpiry,
} from '~/common/utils';
import { ApiConst } from '~/common/constants';
import { Progress } from '~/common/components';

import Sysadm from './SysadmContainer';
import Front from './FrontContainer';

@inject((stores) => ({
  oAuth2: stores.oAuth2Store,
  menu: stores.menuStore,
}))
@withRouter
@observer
class Root extends React.Component {
  constructor(props) {
    super(props);
    moment.locale('ko');
    this.state = {
      sysadmFlag: false,
      progress: 0,
      active: false,
    };

    this.getTokenRefresh();
    props.history.listen((loc) => {
      this.getTokenRefresh();
      this.gnbCurrent(loc);
    });
  }

  componentDidMount() {
    const { history } = this.props;
    if (history.location.pathname.indexOf('/sysadm') > -1) {
      this.setState({ sysadmFlag: true });
    }
    this.getTokenRefresh();
    this.gnbCurrent(history.location);
    window.progressbar = this;
  }

  componentDidUpdate(prevProps) {
    const { location } = prevProps;
    if (location !== this.props.location) {
      window.scrollTo(0, 0);
    }
  }

  onChange = (value) => {
    if (value === 100) {
      this.setState({
        progress: value,
        active: true,
      }, this.initProgress);
    } else {
      this.setState({
        progress: value,
        active: true,
      });
    }
  }

  initProgress = () => {
    setTimeout(() => {
      this.setState({
        active: false,
        progress: 0,
      });
    }, 1000);
  }

  getTokenRefresh = () => {
    const { oAuth2 } = this.props;
    if (isToken()) {
      if (isTokenExpiry() && !isRefreshTokenExpiry()) {
        oAuth2.apiOAuth2Jwt({
          grant_type: ApiConst.OAuth.REFRESH_GRANT_TYPE,
          refresh_token: storageToken().refresh_token,
        });
      } else if (isTokenExpiry() && isRefreshTokenExpiry()) {
        console.error('Token Expire!!!');
      } else {
        oAuth2.setJwtInfo(storageToken());
      }
    }
  }

  gnbCurrent = (location) => {
    const { menu } = this.props;
    const pathTmp = location.pathname.split('/');
    if (pathTmp.length > 0 && pathTmp[1]) {
      menu.setMenuActive(`/${pathTmp[1]}`);
    } else {
      menu.setMenuActive(false);
    }
    menu.setActivePath(location.pathname);
  }

  render() {
    const { sysadmFlag } = this.state;

    return (
      <>
        <Helmet titleTemplate="%s - ?????? ???????????????(Baron Dive)" defaultTitle="?????? ???????????????(Baron Dive)">
          <meta name="description" content="???????????????, barondive, ??????, ????????? ?????????, ?????? ?????????, ??????????????????, ????????????, scubadiving, ???????????????" />
        </Helmet>
        <Progress active={this.state.active} progress={this.state.progress} />
        {sysadmFlag ? (
          <Sysadm {...this.props} />
        ) : (
          <Front {...this.props} />
        )}
      </>
    );
  }
}

export default Root;
