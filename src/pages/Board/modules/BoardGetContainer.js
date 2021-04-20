import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import ReactHtmlParser from 'react-html-parser';
import { Icon } from 'react-icons-kit';
import { edit2 } from 'react-icons-kit/feather/edit2';
import { list } from 'react-icons-kit/feather/list';
import { trash2 } from 'react-icons-kit/feather/trash2';
import { download } from 'react-icons-kit/feather/download';

import { CusHelmet, Cmnt, CmntList } from '~/common/components';
import { parseQuery, getAccessToken, isToken } from '~/common/utils';
import { ApiConst, ReactConst } from '~/common/constants';
import Button from '~/material-kit/CustomButtons/Button';

import boardGetStyle from '../styles/boardGetStyle';

@withStyles(boardGetStyle)
@withRouter
@inject((stores) => ({
  menu: stores.menuStore,
  blt: stores.bltStore,
  bltcmnt: stores.bltcmntStore,
  attach: stores.attachStore,
}))
@observer
class BoardGet extends React.Component {
  componentDidMount() {
    const {
      blt, menu, history, attach, bltcmnt,
    } = this.props;
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

      bltcmnt.apiBltcmntList({
        brdid: menu.getMenuInfo.rid,
        bltid: qparams.bltid,
        itemsPerPage: 999,
      });
    }

    blt.apiCntBltUpd({
      bltid: qparams.bltid,
    });
  }

  pageChangeUpd = (item) => () => {
    const { history } = this.props;
    history.push(`${history.location.pathname.replace('get', 'upd')}?brdid=${item.brdid}&bltid=${item.bltid}`);
  }

  pageChangeList = () => {
    const { history } = this.props;
    history.push(`${history.location.pathname.replace('/get', '')}`);
  }

  apibltDelt = async () => {
    const { blt, history } = this.props;
    await blt.apiBltDel({
      bltid: blt.getBltInfo.bltid,
    });

    history.push(`${history.location.pathname.replace('/get', '')}`);
  }

  render() {
    const {
      classes, blt: { getBltInfo }, attach: { getAttachList }, history, bltcmnt,
    } = this.props;
    const tmpAuth = _.filter(isToken() ? getAccessToken().authorities : [], (item) => {
      if (getBltInfo.brdid === 'BRD0000005') {
        return item === 'role_admin' || (item === 'role_user' && getBltInfo.creid === getAccessToken().userInfo.userid);
      }
      return item === 'role_admin';
    });

    const tmpAuth2 = _.filter(isToken() ? getAccessToken().authorities : [], (item) => item === 'role_admin' || item === 'role_user');

    let contTxt = getBltInfo.cont && getBltInfo.cont.replace(/(<([^>]+)>)/ig, '');
    if (contTxt && contTxt.length > 150) {
      contTxt = contTxt && ReactHtmlParser(contTxt)[0] && `${ReactHtmlParser(contTxt)[0].substring(0, 150).replace(/\n/g, '').replace(/\r/g, '').replace(/\t/g, '')}...`;
    } else {
      contTxt = contTxt && ReactHtmlParser(contTxt)[0] && ReactHtmlParser(contTxt)[0].replace(/\n/g, '').replace(/\r/g, '').replace(/\t/g, '');
    }

    return (
      <>
        <CusHelmet
          title={getBltInfo.title}
          type="article"
          description={contTxt}
          url={`${ReactConst.DOMAIN}${history.location.pathname}${history.location.search}`}
          publishedTiem={moment(getBltInfo.credate).format('YYYY-MM-DDTHH:mm:ssZ')}
          modifiedTiem={moment(getBltInfo.upddate).format('YYYY-MM-DDTHH:mm:ssZ')}
        />
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
          <div className={classes.cmntWrap}>
            {tmpAuth2.length > 0 && (
              <Cmnt bltInfo={getBltInfo} bltcmnt={bltcmnt} history={history} />
            )}
            <CmntList bltInfo={getBltInfo} bltcmnt={bltcmnt} history={history} />
          </div>
          <div className={classes.btnWrap}>
            <Button
              color="primary"
              disabled={false}
              onClick={this.pageChangeList}
            >
              <Icon icon={list} /> 목록
            </Button>
            {tmpAuth.length > 0 && (
              <>
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
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default BoardGet;
