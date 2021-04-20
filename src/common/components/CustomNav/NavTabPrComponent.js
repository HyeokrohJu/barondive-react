import React from 'react';
import { observer } from 'mobx-react';

import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Tab } from '@material-ui/core';

import { Icon } from 'react-icons-kit';

import navTabPrStyle from './styles/navTabPrStyle';

const useStyle = makeStyles(navTabPrStyle);

const NavTabPr = observer(({ menu, history }) => {
  const classes = useStyle();

  const handleChange = (event, newValue) => {
    history.push(newValue);
  };

  return (
    <div className={classes.navTab}>
      <Tabs
        value={menu.getMenuActive}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        aria-label="Baron Dive GNB"
        className={classes.navTabCls}
        classes={{ indicator: classes.navIndicator }}
      >
        {
            menu.getMenuTree.map((mlList, key) => (
              <Tab
                key={mlList.menucd}
                icon={<Icon icon={mlList.iconSvg} />}
                label={mlList.menunm}
                classes={{ root: classes.navTabItem, wrapper: classes.navTabWrapper }}
                value={mlList.cupath || mlList.upath || key}
              />
            ))
          }
      </Tabs>
    </div>
  );
});

export default NavTabPr;
