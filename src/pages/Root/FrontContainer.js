/* eslint-disable no-console */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';

import {
  NavPr, Routes, FooterPr,
} from '~/common/components';

import frontStyle from './styles/frontStyle';

@inject((stores) => ({
  menu: stores.menuStore,
  oAuth2: stores.oAuth2Store,
}))
@withRouter
@withStyles(frontStyle)
@observer
class Front extends React.Component {
  componentDidMount() {
    const { menu } = this.props;
    menu.apiSelectMenu('SS0');
  }

  render() {
    const { classes, menu } = this.props;
    return (
      <>
        <div className={classes.frontWrap}>
          <NavPr
            brand="Baron dive"
            fixed
            color="transparent"
            changeColorOnScroll={{ height: 500, color: 'info' }}
            {...this.props}
          />

          <div className={classes.routeWrap}>
            <Routes routesList={menu.getMenuRoutes} {...this.props} />
          </div>

          <FooterPr />
        </div>
      </>
    );
  }
}

export default Front;
