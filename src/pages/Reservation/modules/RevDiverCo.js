import React from 'react';
import classNames from 'classnames';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import { IconButton } from '@material-ui/core';
import { Icon } from 'react-icons-kit';
import { userPlus } from 'react-icons-kit/feather/userPlus';
import { userMinus } from 'react-icons-kit/feather/userMinus';

import { getUUID } from '~/common/utils';

import RevDiverInfoPr from './RevDiverInfoPr';
import RevDiverAirPr from './RevDiverAirPr';
import RevDiverTypePr from './RevDiverTypePr';
import RevDiverRentalPr from './RevDiverRentalPr';
import RevDiverEtcPr from './RevDiverEtcPr';

@observer
class RevDiverCo extends React.Component {
  addDiver = (idx) => () => {
    const { rev } = this.props;
    const revDiver = toJS(rev.getRevDiver);
    let revValidate = rev.getRevValidate;
    let cloneRevDiver = revDiver[idx];
    cloneRevDiver = {
      ...cloneRevDiver,
      revdiverkey: getUUID(),
      kornm: '',
      engnm: '',
      age: '',
      sex: '',
    };
    revDiver.push(cloneRevDiver);
    rev.setRevDiver(revDiver);

    revValidate = {
      ...revValidate,
      [`kornm_${revDiver.length - 1}`]: '',
      [`engnm_${revDiver.length - 1}`]: '',
    };

    const errorList = Object.keys(revValidate).filter(
      (rkey) => revValidate[rkey] === 'error' || !revValidate[rkey],
    );

    rev.setSubmitFlag(errorList.length > 0);
    rev.setRevValidate(revValidate);
  }

  removeDiver = (idx) => () => {
    const { rev } = this.props;
    const revDiver = toJS(rev.getRevDiver);
    const revValidate = rev.getRevValidate;
    revDiver.splice(idx, 1);
    rev.setRevDiver(revDiver);

    let rmRevValid = Object.keys(revValidate).reduce((obj, key) => {
      const nwObj = obj;
      if (key !== `kornm_${revDiver.length}` && key !== `engnm_${revDiver.length}`) {
        nwObj[key] = revValidate[key];
      }
      return nwObj;
    }, {});

    Object.keys(rmRevValid).forEach((key) => {
      if (key.indexOf('_') > -1) {
        const keyIdx = key.split('_');
        rmRevValid = {
          ...rmRevValid,
          [key]: rev.getRevDiver[keyIdx[1]][keyIdx[0]] ? 'success' : 'error',
        };
      }
    });

    const errorList = Object.keys(rmRevValid).filter(
      (rkey) => rmRevValid[rkey] === 'error' || !rmRevValid[rkey],
    );

    rev.setSubmitFlag(errorList.length > 0);
    rev.setRevValidate(rmRevValid);
  }

  render() {
    const {
      classes, rev: { getRevDiver }, idx,
    } = this.props;
    return (
      <>
        <div className={classes.topBtnWrap}>
          <IconButton aria-label="add" onClick={this.addDiver(idx)}>
            <Icon icon={userPlus} className={classNames(classes.iconBtn, 'add')} />
          </IconButton> 다이버 추가
          {getRevDiver.length > 1 && (
            <>
              <IconButton className={classes.ml20} aria-label="minus" onClick={this.removeDiver(idx)}>
                <Icon icon={userMinus} className={classNames(classes.iconBtn, 'minus')} />
              </IconButton> 다이버 제거
            </>
          )}
        </div>
        <Grid container alignItems="center" className={classes.revInfoWrap} spacing={2}>
          <RevDiverInfoPr {...this.props} />
          <RevDiverAirPr {...this.props} />
          <RevDiverTypePr {...this.props} />
          <RevDiverRentalPr {...this.props} />
          <RevDiverEtcPr {...this.props} />
        </Grid>
      </>
    );
  }
}

export default RevDiverCo;
