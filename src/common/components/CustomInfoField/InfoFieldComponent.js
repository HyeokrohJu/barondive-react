import React from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';

import infoFieldStyle from './styles/infoFieldStyle';

const useStyles = makeStyles(infoFieldStyle);

const InfoField = ({
  title, item, itemkey, type, icon,
}) => {
  const classes = useStyles();
  let itemVal = item[itemkey];
  switch (type) {
    case 'date': {
      itemVal = moment(itemVal).format('YYYY.MM.DD');
      break;
    }
    case 'datetime': {
      itemVal = moment(itemVal).format('YYYY.MM.DD HH:mm');
      break;
    }
    case 'flagYN': {
      itemVal = itemVal === 'Y' ? '신청' : '미신청';
      break;
    }
    case 'flagYN2': {
      itemVal = itemVal === 'Y' ? '보유' : '미보유';
      break;
    }
    case 'sex': {
      itemVal = itemVal === 'M' ? '남자' : '여자';
      break;
    }
    case 'divetype': {
      if (itemVal === 'F') {
        itemVal = '펀다이빙';
      } else if (itemVal === 'A') {
        itemVal = '교육다이빙';
      } else if (itemVal === 'E') {
        itemVal = '체험다이빙';
      }
      break;
    }
    default: {
      break;
    }
  }

  return (
    <dl className={classes.infoWrap}>
      <dt>{title}</dt>
      <dd><span className={classes.iconSapn}>{icon}</span> {itemVal}</dd>
    </dl>
  );
};

export default InfoField;
