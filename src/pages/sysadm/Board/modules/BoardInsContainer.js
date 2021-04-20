import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { withStyles, Grid } from '@material-ui/core';
import { Icon } from 'react-icons-kit';
import { type } from 'react-icons-kit/feather/type';
import { edit } from 'react-icons-kit/feather/edit';

import {
  CustomCKEditor, FileUploader, TextValidator, CheckboxValidator, ColorPicker,
} from '~/common/components';
import { getUUID, parseQuery, stringQuery } from '~/common/utils';
import Button from '~/material-kit/CustomButtons/Button';

import boardInsStyle from '../styles/boardInsStyle';

@withStyles(boardInsStyle)
@withRouter
@inject((stores) => ({
  menu: stores.menuStore,
  brd: stores.brdStore,
  blt: stores.bltStore,
  attach: stores.attachStore,
}))
@observer
class BoardIns extends React.Component {
  componentDidMount() {
    const { blt, attach } = this.props;
    this.uuid = getUUID();

    blt.setBltInfo({
      brdid: '',
      state: 'P',
      title: '',
      cont: '',
      replycnt: '0',
      cmntcnt: '0',
      clickcnt: '0',
      rcmdcnt: '0',
      oppcnt: '0',
      imptyn: 'N',
      secretyn: 'N',
      pwdyn: 'N',
      attachyn: 'Y',
      cmntyn: 'Y',
      replyyn: 'N',
      headlineyn: 'N',
      headline: '',
      postdtyn: 'N',
      annyn: 'N',
      shareyn: 'N',
      currtbltid: '',
      tempkey: this.uuid,
      tblnm: 'hrpj_blt',
      thumbid: '',
      custom1: '',
    });

    blt.setBltValidate({
      title: '',
      cont: '',
    });

    attach.setAttachInfo({
      tblnm: 'hrpj_blt',
      editoryn: 'Y',
      tempkey: this.uuid,
    });

    attach.setAttachEditorList([]);
  }

  apibltAttachIns = (e) => {
    this.child.onUpload(e);
  }

  apibltIns = async () => {
    const {
      blt, history, brd: { getBrdInfo }, attach: { getAttachEditorList },
    } = this.props;
    blt.setBltInfoByKey('brdid', getBrdInfo.brdid);
    if (!blt.getBltInfo.thumbid && getAttachEditorList.length > 0) {
      blt.setBltInfoByKey('thumbid', getAttachEditorList[0].attachid);
    }

    await blt.apiBltIns(blt.getBltInfo);
    const qparams = parseQuery(history.location.search);
    history.push({
      pathname: history.location.pathname.replace('/ins', ''),
      search: stringQuery(qparams),
    });
  }

  onChange = (evt) => {
    const { blt } = this.props;
    blt.setBltInfoByKey('cont', evt.editor.getData());

    this.setValid('cont', evt.editor.getData());
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
    const {
      classes, attach, blt, brd,
    } = this.props;
    const { getBltInfo } = blt;
    const { getBrdInfo } = brd;

    return (
      <div className={classes.boardInsWrap}>
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
            {getBrdInfo.attachyn === 'Y' && (
              <Grid item xs={12}>
                <div className={classes.fileUploader}>
                  <FileUploader
                    ref={(instance) => { this.child = instance; }}
                    attach={attach}
                    multipartParams={{
                      tblnm: 'hrpj_blt',
                      editoryn: 'N',
                      tempkey: this.uuid,
                    }}
                    onUploadComplete={this.apibltIns}
                  />
                </div>
              </Grid>
            )}
          </Grid>
        </form>

        <div className={classes.btnWrap}>
          <Button
            color="primary"
            disabled={blt.isSubmitFlag}
            onClick={this.apibltAttachIns}
          >
            <Icon icon={edit} /> 등록
          </Button>
        </div>
      </div>
    );
  }
}

export default BoardIns;
