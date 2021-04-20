import React from 'react';
import moment from 'moment';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import ReactHtmlParser from 'react-html-parser';
import { Icon } from 'react-icons-kit';
import { edit2 } from 'react-icons-kit/feather/edit2';
import { list } from 'react-icons-kit/feather/list';
import { trash2 } from 'react-icons-kit/feather/trash2';
import { download } from 'react-icons-kit/feather/download';

import { parseQuery, stringQuery } from '~/common/utils';
import { ApiConst } from '~/common/constants';
import Button from '~/material-kit/CustomButtons/Button';

import boardGetStyle from '../styles/boardGetStyle';

@withStyles(boardGetStyle)
@withRouter
@inject((stores) => ({
  menu: stores.menuStore,
  blt: stores.bltStore,
  attach: stores.attachStore,
}))
@observer
class BoardGet extends React.Component {
  componentDidMount() {
    const {
      blt, history, attach,
    } = this.props;
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

    blt.apiCntBltUpd({
      bltid: qparams.bltid,
    });
  }

  pageChangeUpd = (item) => () => {
    const { history } = this.props;
    const qparams = parseQuery(history.location.search);
    qparams.brdid = item.brdid;
    qparams.bltid = item.bltid;
    history.push({
      pathname: history.location.pathname.replace('get', 'upd'),
      search: stringQuery(qparams),
    });
  }

  pageChangeList = () => {
    const { history } = this.props;
    const qparams = parseQuery(history.location.search);
    delete qparams.bltid;
    history.push({
      pathname: history.location.pathname.replace('/get', ''),
      search: stringQuery(qparams),
    });
  }

  apibltDelt = async () => {
    const { blt, history } = this.props;
    await blt.apiBltDel({
      bltid: blt.getBltInfo.bltid,
    });

    const qparams = parseQuery(history.location.search);
    delete qparams.bltid;
    history.push({
      pathname: history.location.pathname.replace('/get', ''),
      search: stringQuery(qparams),
    });
  }

  render() {
    const { classes, blt: { getBltInfo }, attach: { getAttachList } } = this.props;

    return (
      <>
        <div className={classes.boardGetWrap}>
          <div className={classes.bltTitle}>{getBltInfo.title}</div>
          <ul className={classes.subInfo}>
            <li><strong>{moment(getBltInfo.credate).format('YYYY.MM.DD HH:mm')}</strong></li>
            <li>작성자 <strong className={classes.strongMg}>{getBltInfo.crenm}</strong></li>
            <li>조회수 <strong className={classes.strongMg}>{getBltInfo.clickcnt}</strong></li>
            <li>댓글 <strong className={classes.strongMg}>{getBltInfo.cmntcnt}</strong></li>
          </ul>
          {getAttachList.length > 0 && (
            <div className={classes.attachWrap}>
              <h4 className={classes.pageTitle}>첨부파일</h4>
              <ul className={classes.attachList}>
                {getAttachList.map((item) => (
                  <li key={item.attachid}>
                    <a href={`${ApiConst.RESTFUL_URI}/attach/attachDownload?attachid=${item.attachid}`}>
                      {item.name} <Icon icon={download} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className={classes.bltCont}>
            {ReactHtmlParser(getBltInfo.cont)}
          </div>
          <div className={classes.btnWrap}>
            <Button
              color="primary"
              disabled={false}
              onClick={this.pageChangeList}
            >
              <Icon icon={list} /> 목록
            </Button>
            <Button
              color="primary"
              disabled={false}
              onClick={this.pageChangeUpd(getBltInfo)}
            >
              <Icon icon={edit2} /> 수정
            </Button>
            <Button
              color="danger"
              disabled={false}
              onClick={this.apibltDelt}
            >
              <Icon icon={trash2} /> 삭제
            </Button>
          </div>
        </div>
      </>
    );
  }
}

export default BoardGet;
