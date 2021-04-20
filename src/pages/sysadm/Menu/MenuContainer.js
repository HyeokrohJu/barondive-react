import React from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';

import menuStyle from './styles/menuStyle';

@inject((stores) => ({
  member: stores.memberStore,
  menu: stores.menuStore,
}))
@withRouter
@withStyles(menuStyle)
@observer
class Menu extends React.Component {
  render() {
    const {
      classes,
    } = this.props;

    return (
      <div className={classNames(classes.main, classes.mainRaised)} />
    );
  }
}

export default Menu;
