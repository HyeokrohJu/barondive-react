import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Icon } from 'react-icons-kit';
import { pen } from 'react-icons-kit/typicons/pen';
import Pagination from 'material-ui-flat-pagination';
import queryString from 'query-string';

import Button from '~/material-kit/CustomButtons/Button';

import { parseQuery, getAccessToken } from '~/common/utils';

import revListStyle from '../styles/revListStyle';

@withStyles(revListStyle)
@withRouter
@inject((stores) => ({
  menu: stores.menuStore,
  rev: stores.revStore,
}))
@observer
class RevList extends React.Component {
  componentDidMount() {
    const { rev } = this.props;

    if (getAccessToken()) {
      rev.apiRevList({
        creid: getAccessToken().userInfo.userid,
        ordercol: 'revid',
        ordertype: 'desc',
      });
    }
  }

  pageChange = () => (e, offset, page) => {
    const { history, match } = this.props;
    history.push({
      pathname: match.url,
      search: queryString.stringify({ currentPageNo: page }),
    });
  };

  pageChangeGet = (item) => () => {
    const { history } = this.props;
    history.push(`${history.location.pathname.replace('revList', 'revGet')}?revid=${item.revid}`);
  }

  revPageChange = () => {
    const { history } = this.props;
    history.push('/reservation');
  }

  statusMsg = (revInfo) => {
    let msg = '';
    switch (revInfo.status) {
      case 'RR': {
        msg = '예약신청';
        break;
      }
      case 'RM': {
        msg = '예약금 입금 대기';
        break;
      }
      case 'RC': {
        msg = '예약완료';
        break;
      }
      case 'CR': {
        msg = '취소신청';
        break;
      }
      case 'CC': {
        msg = '취소완료';
        break;
      }
      default: {
        msg = '예약불가';
        break;
      }
    }
    return msg;
  }

  render() {
    const { classes, rev, history } = this.props;
    const revList = toJS(rev.getRevList.get(getAccessToken().userInfo.userid));
    const qparams = parseQuery(history.location.search);
    return (
      <div className={classes.boardWrap}>
        <div className={classes.boardListWrap}>
          <table className={classes.listWrap}>
            <colgroup>
              <col style={{ width: 60 }} />
              <col width="" />
              <col style={{ width: 100 }} />
              <col style={{ width: 100 }} />
              <col style={{ width: 100 }} />
              <col style={{ width: 150 }} />
              <col style={{ width: 150 }} />
            </colgroup>
            <thead>
              <tr>
                <th>번호</th>
                <th>예약번호</th>
                <th>다이빙시작일</th>
                <th>다이빙종료일</th>
                <th>예약자</th>
                <th>예약일</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {revList && revList.selectRevPg.map((item, key) => {
                const totalcnt = revList.selectRevCnt.cnt;
                const currtPage = qparams.currentPageNo || 1;
                const numPerPage = qparams.itemsPerPage || 12;
                const revnum = totalcnt - ((currtPage - 1) * numPerPage) - key;
                return (
                  <tr key={item.revid} className={classes.listItem}>
                    <td>{revnum}</td>
                    <td className="title">
                      <div
                        className={classNames(classes.ellipsis, classes.cursorPointer)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={this.pageChangeGet(item)}
                        onClick={this.pageChangeGet(item)}
                      >
                        {item.revid}
                      </div>
                    </td>
                    <td>{moment(item.startdt).format('YYYY.MM.DD')}</td>
                    <td>{moment(item.enddt).format('YYYY.MM.DD')}</td>
                    <td>{item.revnm}</td>
                    <td>{moment(item.credate).format('YYYY.MM.DD')}</td>
                    <td>{this.statusMsg(item)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {revList && (
            <div className={classes.pagenav}>
              <Pagination
                limit={1}
                offset={qparams.currentPageNo - 1}
                total={revList.selectRevCnt.maxpage}
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
                onClick={this.revPageChange}
              >
                <Icon icon={pen} /> 예약하기
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RevList;
