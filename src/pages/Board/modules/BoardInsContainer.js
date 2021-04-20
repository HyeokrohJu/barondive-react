import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { withStyles, Grid } from '@material-ui/core';
import { Icon } from 'react-icons-kit';
import { type } from 'react-icons-kit/feather/type';
import { edit } from 'react-icons-kit/feather/edit';
import Hidden from '@material-ui/core/Hidden';

import { CustomCKEditor, FileUploader, TextValidator } from '~/common/components';
import { getUUID } from '~/common/utils';
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
      blt, history, menu, brd: { getBrdInfo }, attach: { getAttachEditorList },
    } = this.props;
    blt.setBltInfoByKey('brdid', getBrdInfo.brdid);
    if (!blt.getBltInfo.thumbid && getAttachEditorList.length > 0) {
      blt.setBltInfoByKey('thumbid', getAttachEditorList[0].attachid);
    }

    await blt.apiBltIns(blt.getBltInfo);

    history.push({
      pathname: menu.getMenuInfo.upath,
    });
  }

  onChange = (evt) => {
    const { blt } = this.props;
    blt.setBltInfoByKey('cont', evt.editor.getData());

    this.setValid('cont', evt.editor.getData());
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
    const {
      classes, attach, blt, brd,
    } = this.props;
    const { getBltInfo } = blt;
    const { getBrdInfo } = brd;

    return (
      <div className={classes.boardInsWrap}>
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
              <Hidden smDown implementation="css">
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
              </Hidden>
              <Hidden mdUp>
                <CustomCKEditor
                  id="cont"
                  attach={attach}
                  data={getBltInfo}
                  onChange={this.onChange}
                  config={{
                    height: 500,
                    removeButtons: `
                      ,Format,RemoveFormat,CopyFormatting,Language,Save,NewPage,Print,CreateDiv,Copy,Paste,PasteText,
                      ,PasteFromWord,Find,Replace,SelectAll,Form,Checkbox,Radio,TextField,Textarea,Select,Button,
                      ,HiddenField,Anchor,Flash,Smiley,Iframe,About,save-to-pdf,Templates,Redo,Subscript,Superscript,
                      ,JustifyBlock,Outdent,Indent,BidiLtr,BidiRtl,Unlink,HKemoji,Cut,ShowBlocks,Undo,Styles,
                      ,SpecialChar,Mailsign,lineheight,Source,NumberedList,BulletedList,Blockquote,Link,HorizontalRule,
                      ,PageBreak,Youtube,
                    `,
                  }}
                  imgview
                  filethumb={this.updateAttach}
                  attachEditorList={attach.getAttachEditorList}
                />
              </Hidden>
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
