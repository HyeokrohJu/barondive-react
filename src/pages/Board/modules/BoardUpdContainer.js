import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { withStyles, Grid } from '@material-ui/core';
import { Icon } from 'react-icons-kit';
import { type } from 'react-icons-kit/feather/type';
import { edit2 } from 'react-icons-kit/feather/edit2';
import { list } from 'react-icons-kit/feather/list';

import { CustomCKEditor, FileUploader, TextValidator } from '~/common/components';
import { getUUID, parseQuery } from '~/common/utils';
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
      menu, blt, attach, history,
    } = this.props;
    this.uuid = getUUID();
    const qparams = parseQuery(history.location.search);

    if (menu.getMenuInfo) {
      blt.apiBltInfo({
        brdid: menu.getMenuInfo.rid,
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
    }

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
    const { blt, history, menu } = this.props;
    await blt.apiBltUpd(blt.getBltInfo);

    history.push({
      pathname: menu.getMenuInfo.upath,
    });
  }

  onChange = (evt) => {
    const { blt } = this.props;
    blt.setBltInfoByKey('cont', evt.editor.getData());

    this.setValid('cont', evt.editor.getData());
  }

  pageChangeUpd = (item) => () => {
    const { history } = this.props;
    history.push(`${history.location.pathname.replace('upd', 'get')}?brdid=${item.brdid}&bltid=${item.bltid}`);
  }

  handleChange = (event) => {
    const { blt } = this.props;
    blt.setBltInfoByKey(event.target.id, event.target.value);
  }

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

  render() {
    const { classes, attach, blt } = this.props;
    const { getBltInfo } = blt;

    return (
      <div className={classes.boardUpdWrap}>
        <form className={classes.form}>
          <Grid container alignItems="center" className={classes.revInfoWrap} spacing={2}>
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
            onClick={this.pageChangeUpd(getBltInfo)}
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
