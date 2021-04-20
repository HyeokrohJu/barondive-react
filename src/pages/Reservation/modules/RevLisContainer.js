import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import reservationStyle from '../styles/reservationStyle';

@inject((stores) => ({
  blt: stores.bltStore,
}))
@withStyles(reservationStyle)
@withRouter
@observer
class RevLis extends React.Component {
  componentDidMount() {
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.navTab}>
        예약
      </div>
    );
  }
}

export default RevLis;
