import React from 'react';
import moment from 'moment';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import mainBltPrStyle from './styles/mainBltPrStyle';

const useStyle = makeStyles(mainBltPrStyle);

const MainBltPr = observer(({ blt, brdid, bltlink }) => {
  const classes = useStyle();
  const bltList = toJS(blt.getBltList.get(brdid));

  return (
    <div className={classes.noticeWrap}>
      <ul className={classes.mainBltList}>
        {bltList && bltList.selectBltPg.map((item) => (
          <li key={item.bltid}>
            <dl className={classes.listRow}>
              <dt><Link to={`${bltlink}${item.bltid}`} style={{ color: item.custom1 }}>{item.title}</Link></dt>
              <dd>{moment(item.credate).format('YYYY.MM.DD')}</dd>
            </dl>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default MainBltPr;
