import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import classNames from 'classnames';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import { Hidden } from '@material-ui/core';
import Pagination from 'material-ui-flat-pagination';
import queryString from 'query-string';
import { Icon } from 'react-icons-kit';
import { pen } from 'react-icons-kit/typicons/pen';

import { parseQuery, getAccessToken, isToken } from '~/common/utils';
import Button from '~/material-kit/CustomButtons/Button';

import listBltPrStyle from './styles/listBltPrStyle';
import LeftList from './LeftListComponent';
import Search from './SearchComponent';

const useStyle = makeStyles(listBltPrStyle);

const ListTypeBltPr = observer((props) => {
  const {
    blt, brdid, match, history, menu,
  } = props;
  const classes = useStyle();
  const bltList = toJS(blt.getBltList.get(brdid));
  const qparams = parseQuery(history.location.search);

  const tmpAuth = _.filter(isToken() ? getAccessToken().authorities : [], (item) => {
    if (brdid === 'BRD0000005') {
      return item === 'role_admin' || item === 'role_user';
    }
    return item === 'role_admin';
  });

  const pageChange = (offset) => {
    history.push({
      pathname: match.url,
      search: queryString.stringify({ currentPageNo: offset }),
    });
  };

  const pageChangeIns = () => {
    history.push({
      pathname: `${match.url}/ins`,
    });
  };

  const pageChangeGet = (item) => () => {
    const tmpAuth2 = _.filter(isToken() ? getAccessToken().authorities : [], (item2) => {
      if (brdid === 'BRD0000006') {
        return item2 === 'role_admin' || (item2 === 'role_user' && item.creid === getAccessToken().userInfo.userid);
      }
      return true;
    });
    if (brdid === 'BRD0000006') {
      if (tmpAuth2.length > 0) {
        qparams.bltid = item.bltid;
        history.push({
          pathname: `${match.url}/get`,
          search: queryString.stringify(qparams),
        });
      } else {
        alert('접근권한이 없습니다.');
      }
    } else {
      qparams.bltid = item.bltid;
      history.push({
        pathname: `${match.url}/get`,
        search: queryString.stringify(qparams),
      });
    }
  };

  const inputChange = (e) => {
    const key = e.target.id || e.target.name;
    blt.setSearchObjByKey(key, e.target.value);
  };

  const onSearchBtn = () => {
    qparams.searchtype = 'title';
    qparams.searchtxt = blt.getSearchObj.searchtxt || '';
    history.push({
      pathname: match.url,
      search: queryString.stringify(qparams),
    });
  };

  return (
    <div className={classes.boardWrap}>
      <Hidden smDown implementation="css" className={classes.boardMdDownWrap}>
        <Hidden mdDown>
          <div className={classes.lefList}>
            <LeftList />
          </div>
        </Hidden>
        <div className={classes.boardListWrap}>
          <h4 className={classes.pageTitle}>{menu.getMenuInfo && menu.getMenuInfo.menunm}</h4>
          <table className={classes.listWrap}>
            <colgroup>
              <col style={{ width: 60 }} />
              <col width="" />
              <col style={{ width: 100 }} />
              <col style={{ width: 150 }} />
              <col style={{ width: 60 }} />
            </colgroup>
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>글쓴이</th>
                <th>작성일</th>
                <th>조회수</th>
              </tr>
            </thead>
            <tbody>
              {bltList && bltList.selectBltPg.map((item, key) => {
                const totalcnt = bltList.selectBltCnt.cnt;
                const currtPage = qparams.currentPageNo || 1;
                const numPerPage = qparams.itemsPerPage || 12;
                const bltnum = totalcnt - ((currtPage - 1) * numPerPage) - key;
                return (
                  <tr key={item.bltid} className={classes.listItem} role="button" tabIndex="0" onClick={pageChangeGet(item)} onKeyDown={pageChangeGet(item)}>
                    <td>{bltnum}</td>
                    <td className="title">
                      <div className={classNames(classes.ellipsis, classes.cursor)} style={{ color: item.custom1 }}>
                        {item.title}
                      </div>
                    </td>
                    <td>{item.crenm}</td>
                    <td>{moment(item.credate).format('YYYY.MM.DD')}</td>
                    <td>{item.clickcnt}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {bltList && (
            <div className={classes.pagenav}>
              <Pagination
                limit={1}
                offset={qparams.currentPageNo - 1}
                total={bltList.selectBltCnt.maxpage}
                onClick={(e, offset, page) => pageChange(page)}
                otherPageColor="default"
                currentPageColor="primary"
                classes={{
                  rootCurrent: classes.pagecurrent,
                }}
              />
            </div>
          )}
          <div className={classes.bottomWrap}>
            <Search item={blt.getSearchObj} itemkey="searchtxt" onChange={inputChange} onSearchBtn={onSearchBtn} />
            <div className={classes.btnWrap}>
              {(tmpAuth.length > 0 || brdid === 'BRD0000005') && (
                <Button
                  color="primary"
                  disabled={false}
                  onClick={pageChangeIns}
                >
                  <Icon icon={pen} /> 등록
                </Button>
              )}
            </div>
          </div>
        </div>
      </Hidden>
      <Hidden smUp>
        <div className={classes.boardListWrap}>
          <h4 className={classes.pageTitle}>{menu.getMenuInfo && menu.getMenuInfo.menunm}</h4>
          <div className={classes.moBoardList}>
            {bltList && bltList.selectBltPg.map((item, key) => {
              const totalcnt = bltList.selectBltCnt.cnt;
              const currtPage = qparams.currentPageNo || 1;
              const numPerPage = qparams.itemsPerPage || 12;
              const bltnum = totalcnt - ((currtPage - 1) * numPerPage) - key;
              return (
                <div className={classes.listBoardItem} key={item.bltid}>
                  <div className={classes.listItemL}><span className={classes.listCnt}>{bltnum}</span></div>
                  <div className={classes.listItemR}>
                    <div className={classNames(classes.ellipsis, classes.listItemTitle)}>
                      <div className={classNames(classes.ellipsis, classes.cursor)} role="button" tabIndex="0" onClick={pageChangeGet(item)} onKeyDown={pageChangeGet(item)} style={{ color: item.custom1 }}>
                        {item.title}
                      </div>
                    </div>
                    <div className={classes.listItemEtc}>
                      <span>{item.crenm}</span>
                      <span>{moment(item.credate).format('YYYY.MM.DD')}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {bltList && (
            <div className={classes.pagenav}>
              <Pagination
                limit={1}
                offset={qparams.currentPageNo - 1}
                total={bltList.selectBltCnt.maxpage}
                onClick={(e, offset, page) => pageChange(page)}
                otherPageColor="default"
                currentPageColor="primary"
                classes={{
                  rootCurrent: classes.pagecurrent,
                }}
              />
            </div>
          )}
          <div className={classes.bottomWrap}>
            <Search item={blt.getSearchObj} itemkey="searchtxt" onChange={inputChange} onSearchBtn={onSearchBtn} />
            <div className={classes.btnWrap}>
              {(tmpAuth.length > 0 || brdid === 'BRD0000005') && (
                <Button
                  color="primary"
                  disabled={false}
                  onClick={pageChangeIns}
                >
                  <Icon icon={pen} /> 등록
                </Button>
              )}
            </div>
          </div>
        </div>
      </Hidden>
    </div>
  );
});

export default ListTypeBltPr;
