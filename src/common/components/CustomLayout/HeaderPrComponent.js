import React from 'react';
import { observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';

import headerPrStyle from './styles/headerPrStyle';

const useStyle = makeStyles(headerPrStyle);

const findNavPath = (item, navpath) => {
  if (item) {
    navpath.unshift(item.menunm);
    if (item.parent) {
      findNavPath(item.parent, navpath);
    }
  }
};

const HeaderPr = observer(({ menu, bgimg }) => {
  const classes = useStyle();
  const navpath = [];

  findNavPath(menu.getMenuInfo, navpath);

  return (
    <div className={classes.headerImg} style={{ backgroundImage: `url(${bgimg})` }}>
      <div className={classes.brand}>
        <h1 className={classes.title}>{navpath[0]}</h1>
        {navpath[1] && (<span className={classes.subtitle}>&ldquo;{navpath[1]}&rdquo;</span>)}
      </div>
    </div>
  );
});

export default HeaderPr;
