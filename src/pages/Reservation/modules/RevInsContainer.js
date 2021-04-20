import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Icon } from 'react-icons-kit';
import { edit } from 'react-icons-kit/feather/edit';

import { toJS } from 'mobx';
import Button from '~/material-kit/CustomButtons/Button';
import { getUUID } from '~/common/utils';

import RevInfoCo from './RevInfoCo';
import RevDiversCo from './RevDiversCo';
import revInsStyle from '../styles/revInsStyle';

@inject((stores) => ({
  rev: stores.revStore,
  attach: stores.attachStore,
}))
@withStyles(revInsStyle)
@withRouter
@observer
class RevIns extends React.Component {
  componentDidMount() {
    const { rev, attach } = this.props;
    this.uuid = getUUID();

    attach.setAttachInfo({
      tblnm: 'hrpj_rev',
      editoryn: 'Y',
      tempkey: this.uuid,
    });

    rev.setRevValidate({
      revnm: '',
      revphone: '',
      revemail: '',
      kornm_0: '',
      engnm_0: '',
    });
  }

  handleDateChange = (key, isTime, arrIdx) => (date) => {
    const { rev } = this.props;
    const dateFormat = isTime ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD';
    if (arrIdx >= 0) {
      rev.setRevDiverByKey(arrIdx, key, date.format(dateFormat));
    } else {
      rev.setRevInfoByKey(key, date.format(dateFormat));
    }
  };

  handleChange = (arrIdx) => (e) => {
    const { rev } = this.props;
    const key = e.target.id || e.target.name;
    if (arrIdx >= 0) {
      if (e.target.type === 'checkbox') {
        rev.setRevDiverByKey(arrIdx, key, e.target.checked ? e.target.value : 'N');
      } else {
        rev.setRevDiverByKey(arrIdx, key, e.target.value);
      }
    } else if (e.target.type === 'checkbox') {
      rev.setRevInfoByKey(key, e.target.checked ? e.target.value : 'N');
    } else {
      rev.setRevInfoByKey(key, e.target.value);
    }
  };

  setValid = (idx) => (key, val) => {
    const { rev } = this.props;
    let nwkey = key;
    if (idx >= 0) {
      nwkey = `${key}_${idx}`;
    }
    rev.setRevValidateByKey(nwkey, val ? 'success' : 'error');

    const errorList = Object.keys(rev.getRevValidate).filter(
      (fkey) => rev.getRevValidate[fkey] === 'error' || !rev.getRevValidate[fkey],
    );

    rev.setSubmitFlag(errorList.length > 0);
  }

  onChange = (evt) => {
    const { rev } = this.props;
    const newContent = evt.editor.getData();
    rev.setRevInfoByKey('cont', newContent);
  }

  apiRevIns = async () => {
    const { rev } = this.props;
    const paramMap = {
      tblnm: 'hrpj_rev',
      tempkey: this.uuid,
      revMap: rev.getRevInfo,
      revDiverMap: toJS(rev.getRevDiver),
    };
    await rev.apiRevIns(paramMap);
    console.log(paramMap);
  }

  render() {
    const { classes, rev, attach } = this.props;
    return (
      <div className={classes.revWrap}>
        <h6 className={classes.subTitle}>기본 예약 정보</h6>
        <RevInfoCo
          classes={classes}
          attach={attach}
          rev={rev}
          handleChange={this.handleChange}
          handleDateChange={this.handleDateChange}
          onChange={this.onChange}
          setValid={this.setValid}
        />

        <h6 className={classes.subTitle}>다이버 정보</h6>
        <RevDiversCo
          classes={classes}
          rev={rev}
          attach={attach}
          handleChange={this.handleChange}
          handleDateChange={this.handleDateChange}
          setValid={this.setValid}
        />

        <div className={classes.btnWrap}>
          <Button
            color="primary"
            disabled={rev.isSubmitFlag}
            onClick={this.apiRevIns}
            size="lg"
          >
            <Icon icon={edit} /> 예약하기
          </Button>
        </div>
      </div>
    );
  }
}

export default RevIns;
