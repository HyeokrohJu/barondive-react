import React from 'react';
import { observer } from 'mobx-react';

import { makeStyles } from '@material-ui/core/styles';
import {
  List, ListItem, ListItemIcon, ListItemText, Collapse,
} from '@material-ui/core';

import { Icon } from 'react-icons-kit';

import navLeftPrStyle from './styles/navLeftPrStyle';

const useStyle = makeStyles(navLeftPrStyle);

const NavLeftPr = observer(({ history, menuList }) => {
  const classes = useStyle();

  const handleChange = (mlList, chlist) => () => {
    let urlPath = `/sysadm${mlList.upath}`;
    if (mlList.mtype === 'REV') {
      urlPath = `${urlPath}/revList`;
    }
    if (mlList.mtype === 'MEMBER') {
      urlPath = `${urlPath}/memberList`;
    }
    if (chlist) {
      if (chlist.rid) {
        urlPath = `${urlPath}?menucd=${chlist.menucd}&rid=${chlist.rid}`;
      } else {
        urlPath = `${urlPath}?menucd=${chlist.menucd}`;
      }
    } else if (mlList.fldyn === 'Y') {
      if (mlList.rid) {
        urlPath = `${urlPath}?menucd=${mlList.menucd}&rid=${mlList.rid}`;
      } else {
        urlPath = `${urlPath}?menucd=${mlList.menucd}`;
      }
    } else if (mlList.rid) {
      urlPath = `${urlPath}?menucd=${mlList.menucd}&rid=${mlList.rid}`;
    } else {
      urlPath = `${urlPath}?menucd=${mlList.menucd}`;
    }
    history.push(urlPath);
  };

  return (
    <List className={classes.navLeftWrap}>
      {
        menuList.map((mlList) => (
          <div key={mlList.menucd}>
            <ListItem button onClick={handleChange(mlList)}>
              {mlList.iconSvg && (
              <ListItemIcon className={classes.listIcon}>
                <Icon icon={mlList.iconSvg} />
              </ListItemIcon>
              )}
              <ListItemText primary={mlList.menunm} className={classes.menuTxt} />
            </ListItem>
            {mlList.children.length > 0 && (
            <Collapse in timeout="auto" unmountOnExit>
              {mlList.children.map((chlist) => (
                <List key={`children_${chlist.menucd}`} component="div" disablePadding>
                  <ListItem button className={classes.nested} onClick={handleChange(mlList, chlist)}>
                    <ListItemIcon className={classes.listIcon}>
                      <Icon icon={chlist.iconSvg} />
                    </ListItemIcon>
                    <ListItemText primary={chlist.menunm} className={classes.menuTxt} />
                  </ListItem>
                </List>
              ))}
            </Collapse>
            )}
          </div>
        ))
      }
    </List>
  );
});

export default NavLeftPr;
