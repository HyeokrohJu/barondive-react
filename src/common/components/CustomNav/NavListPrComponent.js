import React from 'react';
import { observer } from 'mobx-react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { Icon } from 'react-icons-kit';
import { logIn } from 'react-icons-kit/feather/logIn';
import { logOut } from 'react-icons-kit/feather/logOut';
import { user } from 'react-icons-kit/feather/user';

import baronLogo3 from '~/assets/img/baron_logo3.png';
import { isToken } from '~/common/utils';

import navTabPrStyle from './styles/navTabPrStyle';

const useStyle = makeStyles(navTabPrStyle);

const NavListPr = observer(({
  menu, history, closeMenu, oAuth2,
}) => {
  const classes = useStyle();

  const handleChange = (newValue) => () => {
    history.push(newValue);
    closeMenu();
  };

  const logout = () => {
    oAuth2.setLogout();
    history.push('/');
    closeMenu();
  };

  return (
    <div className={classes.navTab}>
      <List
        component="nav"
        onChange={handleChange}
        className={classes.navTabCls}
      >
        <ListItem className={classes.moLogo} button onClick={handleChange('/')}>
          <img src={baronLogo3} alt="" className={classes.logo} />
        </ListItem>
        {
          menu.getMenuTree.map((mlList, key) => (
            <ListItem button key={mlList.menucd} className={classes.moListItem} onClick={handleChange(mlList.cupath || mlList.upath || key)}>
              <ListItemIcon className={classes.moNavIcon}><Icon icon={mlList.iconSvg} className={classes.moIcon} /></ListItemIcon>
              <ListItemText className={classes.moNavTxt} primary={mlList.menunm} />
            </ListItem>
          ))
        }
        {isToken() ? (
          <>
            <ListItem button className={classes.moListItem} onClick={handleChange('/mypage')}>
              <ListItemIcon className={classes.moNavIcon}><Icon icon={user} className={classes.moIcon} /></ListItemIcon>
              <ListItemText className={classes.moNavTxt} primary="MYPAGE" />
            </ListItem>
            <ListItem button className={classes.moListItem} onClick={logout}>
              <ListItemIcon className={classes.moNavIcon}><Icon icon={logOut} className={classes.moIcon} /></ListItemIcon>
              <ListItemText className={classes.moNavTxt} primary="LOOUT" />
            </ListItem>
          </>
        ) : (
          <ListItem button className={classes.moListItem} onClick={handleChange('/login')}>
            <ListItemIcon className={classes.moNavIcon}><Icon icon={logIn} className={classes.moIcon} /></ListItemIcon>
            <ListItemText className={classes.moNavTxt} primary="LOGIN" />
          </ListItem>
        )}
      </List>
    </div>
  );
});

export default NavListPr;
