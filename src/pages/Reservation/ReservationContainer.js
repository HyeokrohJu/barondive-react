import React from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';

import { HeaderPr } from '~/common/components';
import * as hrbg1 from '~/assets/img/hrbg1.jpg';
import { getUUID } from '~/common/utils';

import RevIns from './modules/RevInsContainer';
import reservationStyle from './styles/reservationStyle';

@inject((stores) => ({
  menu: stores.menuStore,
  rev: stores.revStore,
}))
@withRouter
@withStyles(reservationStyle)
@observer
class Reservation extends React.Component {
  componentDidMount() {
    const { rev } = this.props;
    rev.setRevInfo({
      revid: '',
      startdt: null,
      enddt: null,
      cont: '',
      status: 'RR',
      pickupyn: '',
      stayyn: '',
      revnm: '',
      revphone: '',
      revemail: '',
      pickuploc: '',
      pickupdt: null,
      droploc: '',
      dropdt: null,
      acnum: '',
      locphone: '',
      canceldesc: '',
      usdtotprice: null,
      phptotprice: null,
    });
    rev.setRevDiver([{
      revdiverkey: getUUID(),
      revdiverid: '',
      revid: '',
      kornm: '',
      engnm: '',
      flynum: '',
      flystartdt: null,
      flyenddt: null,
      divingstartdt: null,
      divingenddt: null,
      divingtype: '',
      divingcert: '',
      erentalyn: '',
      stature: '',
      weight: '',
      shoessize: '',
      age: '',
      sex: '',
      address: '',
      etcstayyn: '',
      staydesc: '',
    }]);
    rev.setRevInvoice({});
  }

  render() {
    const { classes } = this.props;

    return (
      <>
        <HeaderPr bgimg={hrbg1} {...this.props} />

        <div className={classNames(classes.main, classes.mainRaised)}>
          <RevIns />
        </div>
      </>
    );
  }
}

export default Reservation;
