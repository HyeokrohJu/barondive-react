import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { withStyles, Grid } from '@material-ui/core';
import { Icon } from 'react-icons-kit';
import { type } from 'react-icons-kit/feather/type';
import { edit2 } from 'react-icons-kit/feather/edit2';
import { list } from 'react-icons-kit/feather/list';

import {
  CustomCKEditor, FileUploader, TextValidator, CheckboxValidator, ColorPicker,
} from '~/common/components';
import { getUUID, parseQuery, stringQuery } from '~/common/utils';
import Button from '~/material-kit/CustomButtons/Button';

import boardUpdStyle from '../styles/boardUpdStyle';

@withStyles(boardUpdStyle)
@withRouter
@inject((stores) => ({
  menu: stores.menuStore,
  blt: stores.bltStore,
  attach: stores.attachStore,
}))
@observer
class BoardUpd extends React.Component {
  componentDidMount() {
    const {
      blt, attach, history,
    } = this.props;
    this.uuid = getUUID();
    const qparams = parseQuery(history.location.search);

    blt.apiBltInfo({
      brdid: qparams.rid,
      bltid: qparams.bltid,
      ...qparams,
    });
    attach.apiAttachList({
      tblnm: 'hrpj_blt',
      tblkey: qparams.bltid,
      editoryn: 'N',
    });
    attach.apiAttachList({
      tblnm: 'hrpj_blt',
      tblkey: qparams.bltid,
      editoryn: 'Y',
    });

    blt.setBltValidate({
      title: 'success',
      cont: 'success',
    });

    attach.setAttachInfo({
      tblnm: 'hrpj_blt',
      tblkey: blt.getBltInfo.bltid,
      editoryn: 'Y',
      tempkey: this.uuid,
    });

    blt.setSubmitFlag(false);
  }

  apibltAttachUpd = (e) => {
    this.child.onUpload(e);
  }

  apibltUpd = async () => {
    const { blt, history } = this.props;
    await blt.apiBltUpd(blt.getBltInfo);

    const qparams = parseQuery(history.location.search);
    history.push({
      pathname: history.location.pathname.replace('upd', 'get'),
      search: stringQuery(qparams),
    });
  }

  onChange = (evt) => {
    const { blt } = this.props;
    blt.setBltInfoByKey('cont', evt.editor.getData());

    this.setValid('cont', evt.editor.getData());
  }

  pageChangeCancel = (item) => () => {
    const { history } = this.props;
    const qparams = parseQuery(history.location.search);
    qparams.brdid = item.brdid;
    qparams.bltid = item.bltid;
    history.push({
      pathname: history.location.pathname.replace('upd', 'get'),
      search: stringQuery(qparams),
    });
  }

  handleChange = (e) => {
    const { blt } = this.props;
    const key = e.target.id || e.target.name;
    if (e.target.type === 'checkbox') {
      blt.setBltInfoByKey(key, e.target.checked ? e.target.value : 'N');
    } else {
      blt.setBltInfoByKey(key, e.target.value);
    }
  };

  setValid = (key, val) => {
    const { blt } = this.props;
    blt.setBltValidateByKey(key, val ? 'success' : 'error');

    const errorList = Object.keys(blt.getBltValidate).filter(
      (fkey) => blt.getBltValidate[fkey] === 'error' || !blt.getBltValidate[fkey],
    );

    blt.setSubmitFlag(errorList.length > 0);
  }

  updateAttach = (item) => () => {
    const { attach, blt } = this.props;
    const nwAttach = attach.getAttachEditorList.map((attachItem) => {
      if (attachItem.attachid === item.attachid) {
        return {
          ...attachItem,
          filethumb: 'Y',
        };
      }
      return Object.keys(attachItem).reduce((obj, key) => {
        const nwObj = obj;
        if (key !== 'filethumb') {
          nwObj[key] = attachItem[key];
        }
        return nwObj;
      }, {});
    });
    attach.setAttachEditorList(nwAttach);
    blt.setBltInfoByKey('thumbid', item.attachid);
  }

  coloerPickerChange = (color) => {
    const { blt } = this.props;
    blt.setBltInfoByKey('custom1', color);
  };

  render() {
    const { classes, attach, blt } = this.props;
    const { getBltInfo } = blt;

    return (
      <div className={classes.boardUpdWrap}>
        <form className={classes.form}>
          <Grid container alignItems="center" className={classes.revInfoWrap} spacing={2}>
            <Grid item xs={2}>
              <CheckboxValidator
                id="annyn"
                valObj={getBltInfo}
                onChange={this.handleChange}
                color="primary"
                val="Y"
                label="상단고정 유무"
              />
            </Grid>
            <Grid item xs={2}>
              <div className={classes.fontColor}>
                <ColorPicker currtColor={getBltInfo} currtColorKey="custom1" coloerPickerChange={this.coloerPickerChange} /> 글자색상선택
              </div>
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                classes={classes}
                id="title"
                valObj={getBltInfo}
                onChange={this.handleChange}
                startIcon={type}
                fullWidth
                labelTxt="제목"
                labelWidth={55}
                placeholder="제목을 입력하세요."
                setValidState={this.setValid}
                validator={['required']}
                errorMsg={['제목을 입력하세요.']}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomCKEditor
                id="cont"
                attach={attach}
                data={getBltInfo}
                onChange={this.onChange}
                config={{
                  height: 500,
                }}
                imgview
                filethumb={this.updateAttach}
                attachEditorList={attach.getAttachEditorList}
              />
            </Grid>
            <Grid item xs={12}>
              <div className={classes.fileUploader}>
                <FileUploader
                  ref={(instance) => { this.child = instance; }}
                  attach={attach}
                  multipartParams={{
                    tblnm: 'hrpj_blt',
                    editoryn: 'N',
                    tempkey: this.uuid,
                    tblkey: getBltInfo.bltid,
                  }}
                  doneFiles={attach.getAttachList}
                  onUploadComplete={this.apibltUpd}
                />
              </div>
            </Grid>
          </Grid>
        </form>

        <div className={classes.btnWrap}>
          <Button
            color="primary"
            disabled={false}
            onClick={this.pageChangeCancel(getBltInfo)}
          >
            <Icon icon={list} /> 취소
          </Button>
          <Button
            color="primary"
            disabled={blt.isSubmitFlag}
            onClick={this.apibltAttachUpd}
          >
            <Icon icon={edit2} /> 수정
          </Button>
        </div>
      </div>
    );
  }
}

export default BoardUpd;
