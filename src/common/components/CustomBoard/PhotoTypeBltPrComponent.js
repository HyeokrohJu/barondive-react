import React from 'react';
import _ from 'lodash';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from 'material-ui-flat-pagination';
import queryString from 'query-string';
import { Icon } from 'react-icons-kit';
import { pen } from 'react-icons-kit/typicons/pen';
import ReactHtmlParser from 'react-html-parser';

import { CardImgPr } from '~/common/components';
import { parseQuery, isToken, getAccessToken } from '~/common/utils';
import Button from '~/material-kit/CustomButtons/Button';
import * as hrbg1 from '~/assets/img/hrbg1.jpg';

import Search from './SearchComponent';

import photoBltPrStyle from './styles/photoBltPrStyle';

const useStyle = makeStyles(photoBltPrStyle);

const PhotoBltPr = observer((props) => {
  const {
    blt, brdid, match, history, menu, htype,
  } = props;
  const classes = useStyle();
  const bltList = toJS(blt.getBltList.get(brdid));
  const qparams = parseQuery(history.location.search);

  const tmpAuth = _.filter(isToken() ? getAccessToken().authorities : [], (item) => item === 'role_admin');

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
      <h4 className={classes.pageTitle}>{menu.getMenuInfo && menu.getMenuInfo.menunm}</h4>
      <div className={classes.listWrap}>
        {bltList && bltList.selectBltPg.map((item) => {
          let contTxt = item.cont && item.cont.replace(/(<([^>]+)>)/ig, '');
          contTxt = contTxt && ReactHtmlParser(contTxt)[0].substring(0, 100);

          return (
            <div key={item.bltid} className={classes.listItem}>
              <CardImgPr
                cardHeight={htype === 'HEIGHT' ? 410 : 240}
                cardLink={`${history.location.pathname}/get?bltid=${item.bltid}`}
                cardImg={item.filethumb || hrbg1}
                cardTitle={item.title}
                titleColor={item.custom1}
                cardSubTitle={`photo by ${item.crenm}`}
                cardCont={contTxt}
                cardContNoEllipsis
                {...props}
              />
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
          {tmpAuth.length > 0 && (
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
  );
});

export default PhotoBltPr;
