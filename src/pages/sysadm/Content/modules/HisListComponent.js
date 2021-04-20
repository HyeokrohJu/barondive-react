import React from 'react';
import moment from 'moment';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';

import { makeStyles } from '@material-ui/core/styles';

import hisListStyle from '../styles/hisListStyle';

const useStyle = makeStyles(hisListStyle);

const HisList = observer(({
  listItem, listKey, onClick, curtContid,
}) => {
  const classes = useStyle();

  const hisList = toJS(listItem)[listKey || ''] || [];

  return (
    <ul className={classes.hisListWrap}>
      {hisList.length > 0 && hisList.map((item, idx) => {
        let isActive = false;
        if (curtContid) {
          isActive = `${item.contid}` === curtContid;
        } else {
          isActive = idx === 0;
        }
        return (
          <li key={item.contid} className={isActive ? classes.active : ''}>
            <button type="button" onClick={onClick(item.contid)}>{moment(item.credate).format('YYYY.MM.DD HH:mm:ss')}</button>
          </li>
        );
      })}
    </ul>
  );
});

export default HisList;
