import React from 'react';
import moment from 'moment';
import { toJS } from 'mobx';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Pagination from 'material-ui-flat-pagination';
import { Icon } from 'react-icons-kit';
import { pen } from 'react-icons-kit/typicons/pen';

import { parseQuery, stringQuery } from '~/common/utils';
import Button from '~/material-kit/CustomButtons/Button';

import boardListStyle from '../styles/boardListStyle';

@inject((stores) => ({
  menu: stores.menuStore,
  brd: stores.brdStore,
  blt: stores.bltStore,
}))
@withStyles(boardListStyle)
@withRouter
@observer
class BoardLis extends React.Component {
  componentDidMount() {
    const { blt, history } = this.props;
    const qparams = parseQuery(history.location.search);
    blt.apiBltList({
      brdid: qparams.rid,
      currentPageNo: qparams.currentPageNo || 1,
      itemsPerPage: qparams.itemsPerPage || 12,
      ...qparams,
    });
  }

  pageChange = (e, offset, page) => {
    const { history, match } = this.props;
    const qparams = parseQuery(history.location.search);
    qparams.currentPageNo = page;
    history.push({
      pathname: match.url,
      search: stringQuery(qparams),
    });
  };

  pageChangeIns = () => {
    const { history, match } = this.props;
    const qparams = parseQuery(history.location.search);
    history.push({
      pathname: `${match.url}/ins`,
      search: stringQuery(qparams),
    });
  };

  pageChangeGet = (item) => () => {
    const { history } = this.props;
    const qparams = parseQuery(history.location.search);
    qparams.bltid = item.bltid;
    history.push(`${history.location.pathname}/get?${stringQuery(qparams)}`);
  }

  render() {
    const { classes, blt, history } = this.props;
    const qparams = parseQuery(history.location.search);
    const bltList = toJS(blt.getBltList.get(qparams.rid));

    return (
      <div className={classes.boardListWrap}>
        <div className={classes.boardWrap}>
          <div className={classes.boardListWrap}>
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
                    <tr
                      key={item.bltid}
                      className={classes.listItem}
                      role="button"
                      tabIndex={0}
                      onKeyDown={this.pageChangeGet(item)}
                      onClick={this.pageChangeGet(item)}
                    >
                      <td>{bltnum}</td>
                      <td className="title">
                        <div className={classes.ellipsis} style={{ color: item.custom1 }}>{item.title}</div>
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
                  onClick={this.pageChange}
                  otherPageColor="default"
                  currentPageColor="primary"
                  classes={{
                    rootCurrent: classes.pagecurrent,
                  }}
                />
              </div>
            )}
            <div className={classes.bottomWrap}>
              <div className={classes.searchWrap}>
              &nbsp;
              </div>
              <div className={classes.btnWrap}>
                <Button
                  color="primary"
                  disabled={false}
                  onClick={this.pageChangeIns}
                >
                  <Icon icon={pen} /> 등록
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BoardLis;
