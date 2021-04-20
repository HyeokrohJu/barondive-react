import React, { useEffect } from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { Icon } from 'react-icons-kit';

import navSubPrStyle from './styles/navSubPrStyle';

const useStyle = makeStyles(navSubPrStyle);

const NavTabPr = observer(({ menu }) => {
  const classes = useStyle();

  useEffect(() => {
    if (menu.getMenuInfo) {
      menu.findSubMenuRouter(menu.getMenuInfo.parent);
    }
  }, [menu]);

  return (
    <div className={classes.subMenuWrap}>
      {menu.getMenuInfo.parent.children.map((item) => {
        const actCls = item.menucd === menu.getMenuInfo.menucd ? 'active' : '';
        return (
          <Link key={item.menucd} to={item.upath}>
            <button type="button" className={classNames(classes.subMenuItem, actCls)}>
              <span className={classes.subMenuIcon}><Icon icon={item.iconSvg} /></span>
              <span className={classes.subMenuTxt}>{item.menunm}</span>
            </button>
          </Link>
        );
      })}
    </div>
  );
});

export default NavTabPr;
