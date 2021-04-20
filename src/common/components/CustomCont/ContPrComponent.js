import React from 'react';
import { observer } from 'mobx-react';
import ReactHtmlParser from 'react-html-parser';
import { makeStyles } from '@material-ui/core/styles';

import contPrStyle from './styles/contPrStyle';

const useStyle = makeStyles(contPrStyle);

const ContPr = observer(({ cont }) => {
  const classes = useStyle();

  return (
    <div className={classes.navTab}>
      {ReactHtmlParser(cont.getContInfo.cont)}
    </div>
  );
});

export default ContPr;
