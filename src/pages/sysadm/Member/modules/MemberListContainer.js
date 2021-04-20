import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Pagination from 'material-ui-flat-pagination';

import { parseQuery, stringQuery } from '~/common/utils';

import memberListStyle from '../styles/memberListStyle';

@withStyles(memberListStyle)
@withRouter
@inject((stores) => ({
  menu: stores.menuStore,
  member: stores.memberStore,
}))
@observer
class MemberList extends React.Component {
  componentDidMount() {
    const { member } = this.props;

    member.apiMemberList({
      ordercol: 'userid',
      ordertype: 'desc',
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

  pageChangeGet = (item) => () => {
    const { history } = this.props;
    const qparams = parseQuery(history.location.search);
    qparams.userid = item.userid;
    history.push(`${history.location.pathname.replace('memberList', 'memberGet')}?${stringQuery(qparams)}`);
  }

  render() {
    const { classes, member, history } = this.props;
    const memberList = toJS(member.getMemberList);
    const qparams = parseQuery(history.location.search);
    return (
      <div className={classes.boardWrap}>
        <div className={classes.boardListWrap}>
          <table className={classes.listWrap}>
            <colgroup>
              <col style={{ width: 60 }} />
              <col style={{ width: 120 }} />
              <col style={{ width: 120 }} />
              <col style={{ width: 120 }} />
              <col width="" />
              <col style={{ width: 150 }} />
              <col style={{ width: 100 }} />
              <col style={{ width: 180 }} />
              <col style={{ width: 180 }} />
            </colgroup>
            <thead>
              <tr>
                <th>번호</th>
                <th>사용자번호</th>
                <th>로그인ID</th>
                <th>사용자이름</th>
                <th>이메일</th>
                <th>휴대전화</th>
                <th>성별</th>
                <th>가입일</th>
                <th>수정일</th>
              </tr>
            </thead>
            <tbody>
              {memberList.selectMemberPg && memberList.selectMemberPg.map((item, key) => {
                const totalcnt = memberList.selectMemberCnt.cnt;
                const currtPage = qparams.currentPageNo || 1;
                const numPerPage = qparams.itemsPerPage || 12;
                const membernum = totalcnt - ((currtPage - 1) * numPerPage) - key;
                return (
                  <tr
                    key={item.userid}
                    className={classes.listItem}
                    role="button"
                    tabIndex={0}
                    onKeyDown={this.pageChangeGet(item)}
                    onClick={this.pageChangeGet(item)}
                  >
                    <td>{membernum}</td>
                    <td>{item.userid}</td>
                    <td>{item.loginid}</td>
                    <td>{item.usernm}</td>
                    <td className="title">
                      <div className={classNames(classes.ellipsis, classes.cursorPointer)}>
                        {item.email}
                      </div>
                    </td>
                    <td>{item.mphone ? item.mphone.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, '$1-$2-$3') : ''}</td>
                    <td>{item.sex === 'M' ? '남자' : '여자'}</td>
                    <td>{moment(item.credate).format('YYYY.MM.DD HH:mm')}</td>
                    <td>{item.upddate && moment(item.upddate).format('YYYY.MM.DD HH:mm')}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {memberList.selectMemberPg && (
            <div className={classes.pagenav}>
              <Pagination
                limit={1}
                offset={qparams.currentPageNo - 1}
                total={memberList.selectMemberCnt.maxpage}
                onClick={this.pageChange}
                otherPageColor="default"
                currentPageColor="primary"
                classes={{
                  rootCurrent: classes.pagecurrent,
                }}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default MemberList;
