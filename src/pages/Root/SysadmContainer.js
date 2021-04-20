/* eslint-disable no-console */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import {
  withStyles, AppBar, Toolbar, Typography, CssBaseline, Drawer,
} from '@material-ui/core';

import { Routes, NavLeftPr } from '~/common/components';

import sysadmStyle from './styles/sysadmStyle';

@inject((stores) => ({
  menu: stores.menuStore,
  oAuth2: stores.oAuth2Store,
}))
@withRouter
@withStyles(sysadmStyle)
@observer
class Sysadm extends React.Component {
  componentDidMount() {
    const { history, menu } = this.props;
    menu.apiSelectMenu('AA0');
    this.gnbCurrent(history.location);

    history.listen((loc) => {
      this.gnbCurrent(loc);
    });
  }

  componentDidUpdate(prevProps) {
    const { location, history: { action } } = prevProps;
    if (location !== this.props.location && action === 'PUSH') {
      window.scrollTo(0, 0);
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
    const { classes, menu } = this.props;

    return (
      <div className={classes.sysadmWrap}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap>
            BaronDive
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <NavLeftPr menuList={menu.getAdmMenuTree} {...this.props} />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Routes routesList={menu.getAdmMenuRoutes} {...this.props} />
        </main>
      </div>
    );
  }
}

export default Sysadm;
