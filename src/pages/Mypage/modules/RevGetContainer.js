import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { withStyles } from '@material-ui/core/styles';
import Snack from '@material-ui/core/SnackbarContent';
import { Icon } from 'react-icons-kit';
import { list } from 'react-icons-kit/feather/list';
import { user } from 'react-icons-kit/feather/user';
import { phone } from 'react-icons-kit/feather/phone';
import { atSign } from 'react-icons-kit/feather/atSign';
import { ic_event as icEvent } from 'react-icons-kit/md/ic_event';
import { truck } from 'react-icons-kit/feather/truck';
import { home } from 'react-icons-kit/feather/home';
import { takeOff } from 'react-icons-kit/entypo/takeOff';
import { check } from 'react-icons-kit/feather/check';
import { creditCard } from 'react-icons-kit/feather/creditCard';
import { plusSquare } from 'react-icons-kit/feather/plusSquare';
import { ic_local_car_wash as icLocalCarWash } from 'react-icons-kit/md/ic_local_car_wash';
import { x } from 'react-icons-kit/feather/x';
import { info } from 'react-icons-kit/feather/info';
import { slash } from 'react-icons-kit/feather/slash';

import Button from '~/material-kit/CustomButtons/Button';

import { getAccessToken, parseQuery } from '~/common/utils';
import { InfoField } from '~/common/components';

import revGetStyle from '../styles/revGetStyle';

@withStyles(revGetStyle)
@withRouter
@inject((stores) => ({
  menu: stores.menuStore,
  rev: stores.revStore,
}))
@observer
class RevGet extends React.Component {
  componentDidMount() {
    const { rev, history } = this.props;
    const qparams = parseQuery(history.location.search);

    if (getAccessToken()) {
      rev.apiRevInfo({
        revid: qparams.revid,
      });
    }
  }

  pageChangeList = () => {
    const { history } = this.props;
    history.push(`${history.location.pathname.replace('revGet', 'revList')}`);
  }

  apiRevCancel = (revid) => () => {
    const { rev, history } = this.props;
    rev.apiRevUpd({
      revMap: {
        revid,
        status: 'CR',
      },
    });
    history.replace(`${history.location.pathname}${history.location.search}`);
  }

  statusMsg = () => {
    const { classes, rev: { getRevInfo } } = this.props;
    const revInfo = toJS(getRevInfo);
    let msgObj = {};
    switch (revInfo.status) {
      case 'RR': {
        msgObj = { msg: '??????????????? ????????? ???????????????.', color: 'snackbarInfo', icon: info };
        break;
      }
      case 'RM': {
        msgObj = { msg: '????????? ?????? ?????? ?????? ?????????.', color: 'snackbarInfo', icon: info };
        break;
      }
      case 'RC': {
        msgObj = { msg: '????????? ????????? ?????? ?????????.', color: 'snackbarSuccess', icon: info };
        break;
      }
      case 'CR': {
        msgObj = { msg: '?????? ?????? ????????? ????????? ?????? ?????????.', color: 'snackbarDanger', icon: slash };
        break;
      }
      case 'CC': {
        msgObj = { msg: '?????? ????????? ????????? ?????? ?????????.', color: 'snackbarDanger', icon: slash };
        break;
      }
      default: {
        msgObj = { msg: '?????? ?????? ?????? ?????????.', color: 'snackbarDanger', icon: slash };
        break;
      }
    }
    return (
      <Snack
        message={(
          <div><Icon icon={msgObj.icon} className={classes.snackbarIcon} /> {msgObj.msg}</div>
      )}
        classes={{
          root: `${classes.snackbarRoot} ${classes[msgObj.color]}`,
          message: `${classes.snackbarMessage} ${classes.snackbarCont}`,
        }}
      />
    );
  }

  render() {
    const { classes, rev: { getRevInfo, getRevDiver, getRevInvoice } } = this.props;
    const revInfo = toJS(getRevInfo);
    const revDiver = toJS(getRevDiver);
    const revInvoice = toJS(getRevInvoice);
    return (
      <div className={classes.revWrap}>
        {this.statusMsg()}
        <h5 className={classes.subTitle}>?????? ?????? ??????</h5>
        <div className={classes.revInfoWrap}>
          <div className={classes.revInfoItem}><InfoField title="????????????" item={revInfo} itemkey="revnm" icon={<Icon icon={user} />} /></div>
          <div className={classes.revInfoItem}>
            <InfoField title="????????? ????????????" item={revInfo} itemkey="revphone" icon={<Icon icon={phone} />} />
          </div>
          <div className={classes.revInfoItem}>
            <InfoField title="????????? ?????????" item={revInfo} itemkey="revemail" icon={<Icon icon={atSign} />} />
          </div>
          <div className={classes.revInfoItem}>
            <InfoField title="?????? ????????????" item={revInfo} itemkey="locphone" icon={<Icon icon={phone} />} />
          </div>
          <div className={classes.revInfoItem}>
            <InfoField title="?????????" item={revInfo} itemkey="startdt" type="date" icon={<Icon icon={icEvent} />} />
          </div>
          <div className={classes.revInfoItem}>
            <InfoField title="?????????" item={revInfo} itemkey="enddt" type="date" icon={<Icon icon={icEvent} />} />
          </div>
          <div className={classes.revInfoItem}>
            <InfoField title="????????? ??????" item={revInfo} itemkey="pickupyn" type="flagYN" icon={<Icon icon={truck} />} />
          </div>
          <div className={classes.revInfoItem}>
            <InfoField title="?????? ??????" item={revInfo} itemkey="stayyn" type="flagYN" icon={<Icon icon={home} />} />
          </div>
          {revInfo.pickupyn === 'Y' && (
            <>
              <div className={classes.revInfoItem}>
                <InfoField title="?????? ??????" item={revInfo} itemkey="pickuploc" icon={<Icon icon={icLocalCarWash} />} />
              </div>
              <div className={classes.revInfoItem}>
                <InfoField title="?????? ??????" item={revInfo} itemkey="pickupdt" type="datetime" icon={<Icon icon={icEvent} />} />
              </div>
              <div className={classes.revInfoItem}>
                <InfoField title="?????? ??????" item={revInfo} itemkey="droploc" icon={<Icon icon={icLocalCarWash} />} />
              </div>
              <div className={classes.revInfoItem}>
                <InfoField title="?????? ??????" item={revInfo} itemkey="dropdt" type="datetime" icon={<Icon icon={icEvent} />} />
              </div>
            </>
          )}
        </div>
        <div className={classes.revInfoCont}>
          <div className="revInfoContTit">??????</div>
          {ReactHtmlParser(revInfo.cont)}
        </div>

        <h5 className={classes.subTitle}>????????? ??????</h5>
        {revDiver.length > 0 && revDiver.map((item, idx) => (
          <div key={item.revdiverid} className={classes.revDiverWrap}>
            <h6 className={classes.subDiverTitle}><Icon icon={user} /> ?????????{idx + 1}</h6>
            <div className={classes.revInfoWrap}>
              <div className={classes.revInfoItem}>
                <InfoField title="????????????" item={item} itemkey="kornm" icon={<Icon icon={user} />} />
              </div>
              <div className={classes.revInfoItem}>
                <InfoField title="????????????" item={item} itemkey="engnm" icon={<Icon icon={user} />} />
              </div>
              <div className={classes.revInfoItem}>
                <InfoField title="??????" item={item} itemkey="age" icon={<Icon icon={user} />} />
              </div>
              <div className={classes.revInfoItem}>
                <InfoField title="??????" item={item} itemkey="sex" type="sex" icon={<Icon icon={user} />} />
              </div>
              <div className={classes.revInfoItem}>
                <InfoField title="???????????????" item={item} itemkey="flynum" icon={<Icon icon={takeOff} />} />
              </div>
              <div className={classes.revInfoItem}>
                <InfoField title="?????????????????????" item={item} itemkey="flystartdt" type="datetime" icon={<Icon icon={icEvent} />} />
              </div>
              <div className={classes.revInfoItem}>
                <InfoField title="?????????????????????" item={item} itemkey="flyenddt" type="datetime" icon={<Icon icon={icEvent} />} />
              </div>
              <div className={classes.revInfoItem}>
                <InfoField title="???????????????" item={item} itemkey="divingtype" type="divetype" icon={<Icon icon={check} />} />
              </div>
              <div className={classes.revInfoItem}>
                <InfoField title="??????????????????" item={item} itemkey="divingstartdt" type="date" icon={<Icon icon={icEvent} />} />
              </div>
              <div className={classes.revInfoItem}>
                <InfoField title="??????????????????" item={item} itemkey="divingenddt" type="date" icon={<Icon icon={icEvent} />} />
              </div>
              <div className={classes.revInfoItem}>
                <InfoField title="????????????????????? ??????" item={item} itemkey="divingcert" type="flagYN2" icon={<Icon icon={creditCard} />} />
              </div>
              <div className={classes.revInfoItem}>
                <InfoField title="???????????? ??????" item={item} itemkey="erentalyn" type="flagYN" icon={<Icon icon={plusSquare} />} />
              </div>
              <div className={classes.revInfoItem}>
                <InfoField title="?????? ?????? ??????" item={item} itemkey="etcstayyn" type="flagYN" icon={<Icon icon={home} />} />
              </div>
              {item.erentalyn === 'Y' && (
                <>
                  <div className={classes.revInfoItem}>
                    <InfoField title="???" item={item} itemkey="stature" icon={<Icon icon={user} />} />
                  </div>
                  <div className={classes.revInfoItem}>
                    <InfoField title="?????????" item={item} itemkey="weight" icon={<Icon icon={user} />} />
                  </div>
                  <div className={classes.revInfoItem}>
                    <InfoField title="???????????????" item={item} itemkey="shoessize" icon={<Icon icon={user} />} />
                  </div>
                </>
              )}
              {item.divingtype === 'A' && (
                <div className={classNames(classes.revInfoItem, classes.w100)}>
                  <InfoField title="??????????????????" item={item} itemkey="address" icon={<Icon icon={home} />} />
                </div>
              )}
              {item.etcstayyn === 'Y' && (
                <div className={classNames(classes.revInfoItem, classes.w100)}>
                  <InfoField title="??????????????????" item={item} itemkey="staydesc" icon={<Icon icon={home} />} />
                </div>
              )}
            </div>
          </div>
        ))}

        {_.isEmpty(revInvoice) || (
          <>
            <h5 className={classes.subTitle}>Invoice</h5>
            <div>Invoice ??????</div>
          </>
        )}

        <div className={classes.btnWrap}>
          <Button
            color="primary"
            disabled={false}
            onClick={this.pageChangeList}
          >
            <Icon icon={list} /> ??????
          </Button>
          <Button
            color="danger"
            disabled={false}
            onClick={this.apiRevCancel(revInfo.revid)}
          >
            <Icon icon={x} /> ????????????
          </Button>
        </div>
      </div>
    );
  }
}

export default RevGet;
