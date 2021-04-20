import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import ReactHtmlParser from 'react-html-parser';
import { Icon } from 'react-icons-kit';
import { cornerDownRight } from 'react-icons-kit/feather/cornerDownRight';

import { Cmnt, CmntMod } from '~/common/components';
import { getAccessToken, isToken } from '~/common/utils';

import cmntStyle from './styles/cmntStyle';

const useStyle = makeStyles(cmntStyle);

const CmntList = observer(({ bltInfo, bltcmnt, history }) => {
  const classes = useStyle();
  const bltcmntList = toJS(bltcmnt.getBltcmntList.get(bltInfo.brdid)) || { selectBltcmntPg: [] };
  const cmntList = _.filter(bltcmntList.selectBltcmntPg, (item) => (item.state === 'Y' || item.replycnt > 0));

  const replyCmnt = (item) => () => {
    bltcmnt.setCmntReplyId(item.cmntid);
  };

  const modCmnt = (item) => () => {
    bltcmnt.setCmntModId(item.cmntid);
  };

  const delCmnt = (item) => async () => {
    const cmntParam = {
      cmntid: item.cmntid,
      state: 'D',
    };

    await bltcmnt.apiBltcmntUpd(cmntParam);
    bltcmnt.setCmntReplyId('');
    bltcmnt.setCmntModId('');

    history.replace(`${history.location.pathname}${history.location.search}`);
  };

  return (
    <div className={classes.cmntListWrap}>
      {cmntList && cmntList.length > 0 && (
        <>
          <h4 className={classes.cmntTitle}>댓글 리스트</h4>
          <ul className={classes.cmntList}>
            {cmntList.map((item) => {
              const st = {
                marginLeft: item.lvl * 20,
              };

              const tmpAuth1 = _.filter(isToken() ? getAccessToken().authorities : [], (item2) => item2 === 'role_admin' || (item2 === 'role_user' && item.creid === getAccessToken().userInfo.userid));
              const tmpAuth2 = _.filter(isToken() ? getAccessToken().authorities : [], (item2) => item2 === 'role_admin' || item2 === 'role_user');

              return (
                <li className={classes.listItem} key={item.cmntid}>
                  <div className={classes.replyWrap} style={st}>
                    {item.lvl > 0 && (
                    <div className={classes.replyIconWrap}>
                      <Icon icon={cornerDownRight} />
                    </div>
                    )}
                    <dl>
                      <dt>
                        {item.crenm}
                        <span className="dateWrap">{moment(item.credate).format('YYYY.MM.DD HH:mm')}</span>
                        {tmpAuth1.length > 0 && (
                          <>
                            <span className="replyCmntBtn" role="button" tabIndex="0" onClick={delCmnt(item)} onKeyDown={delCmnt(item)}>삭제</span>
                            <span className="replyCmntBtn" role="button" tabIndex="0" onClick={modCmnt(item)} onKeyDown={modCmnt(item)}>수정</span>
                          </>
                        )}
                        {tmpAuth2.length > 0 && (
                          <span
                            className="replyCmntBtn"
                            role="button"
                            tabIndex="0"
                            onClick={replyCmnt(item)}
                            onKeyDown={replyCmnt(item)}
                          >
                            댓글달기
                          </span>
                        )}
                      </dt>
                      <dd>
                        {bltcmnt.getCmntModId === item.cmntid ? (
                          <div className={classes.replyCmntAddWrap}>
                            <CmntMod bltInfo={item} bltcmnt={bltcmnt} history={history} replyFlag />
                          </div>
                        ) : (
                          <>
                            {item.state === 'Y' ? (
                              ReactHtmlParser(item.cmnt && item.cmnt.replace(/(?:\r\n|\r|\n)/g, '<br />'))
                            ) : (
                              <span className={classes.delTxt}>삭제된 댓글 입니다.</span>
                            )}
                          </>
                        )}
                      </dd>
                    </dl>
                  </div>
                  {bltcmnt.getCmntReplyId === item.cmntid && (
                  <div className={classes.replyCmntAddWrap}>
                    <Cmnt bltInfo={item} bltcmnt={bltcmnt} history={history} replyFlag />
                  </div>
                  )}
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
});

export default CmntList;
