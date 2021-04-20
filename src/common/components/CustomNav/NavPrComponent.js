import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { IconButton, Drawer } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';
import Hidden from '@material-ui/core/Hidden';
import Menu from '@material-ui/icons/Menu';
import { Icon } from 'react-icons-kit';
import { instagram } from 'react-icons-kit/feather/instagram';
import { facebook } from 'react-icons-kit/feather/facebook';
import { logIn } from 'react-icons-kit/feather/logIn';
import { logOut } from 'react-icons-kit/feather/logOut';
import { user } from 'react-icons-kit/feather/user';

import Button from '~/material-kit/CustomButtons/Button';
import baronLogo3 from '~/assets/img/baron_logo3.png';
import { NavListPr } from '~/common/components';

import NavTabPr from './NavTabPrComponent';
import navPrStyle from './styles/navPrStyle';


const useStyle = makeStyles(navPrStyle);

const NavPr = observer((props) => {
  const classes = useStyle();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const {
    history, oAuth2: { getJwtInfo, setLogout },
  } = props;

  const drawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logout = () => {
    setLogout();
    history.push('/');
  };

  const login = () => {
    history.push('/login');
  };

  const mypage = () => {
    history.push('/mypage');
  };

  return (
    <>
      <Hidden smDown implementation="css">
        <div className={classes.navWrap}>
          <div className={classes.navHeader}>
            <Link to="/"><img src={baronLogo3} alt="" className={classes.logo} /></Link>
          </div>
          {/** Navigation Start[S] */}
          <NavTabPr {...props} />
          {/** Navigation Start[E] */}
          <div className={classes.navRight}>
            <List className={classes.list}>
              <ListItem className={classes.listItem}>
                {getJwtInfo.access_token ? (
                  <Tooltip
                    id="instagram-facebook"
                    title="Follow us on facebook"
                    placement={window.innerWidth > 959 ? 'top' : 'left'}
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button
                      color="transparent"
                      target="_blank"
                      className={classes.navLink}
                      onClick={logout}
                    >
                      <Icon icon={logOut} /> <span className={classes.iconTxt}>Logout</span>
                    </Button>
                  </Tooltip>

                ) : (
                  <Tooltip
                    id="instagram-facebook"
                    title="Follow us on facebook"
                    placement={window.innerWidth > 959 ? 'top' : 'left'}
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button
                      color="transparent"
                      target="_blank"
                      className={classes.navLink}
                      onClick={login}
                    >
                      <Icon icon={logIn} /> <span className={classes.iconTxt}>Login</span>
                    </Button>
                  </Tooltip>
                )}
              </ListItem>
              <ListItem className={classes.listItem}>
                <Tooltip
                  id="instagram-tooltip"
                  title="Follow us on instagram"
                  placement={window.innerWidth > 959 ? 'top' : 'left'}
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button
                    color="transparent"
                    target="_blank"
                    className={classes.navLink}
                    onClick={mypage}
                  >
                    <Icon icon={user} /> <span className={classes.iconTxt}>MyPage</span>
                  </Button>
                </Tooltip>
              </ListItem>
            </List>
            <List className={classes.list}>
              <ListItem className={classes.listItem}>
                <Tooltip
                  id="facebook-tooltip"
                  title="Follow us on facebook"
                  placement={window.innerWidth > 959 ? 'top' : 'left'}
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button
                    color="transparent"
                    href="https://www.facebook.com/baron_dive-108418530678459/"
                    target="_blank"
                    className={classes.navLink}
                  >
                    <Icon icon={facebook} className={classNames(classes.subNavIcon, 'facebook')} />
                    <span className={classes.iconTxt}>Facebook</span>
                  </Button>
                </Tooltip>
              </ListItem>
              <ListItem className={classes.listItem}>
                <Tooltip
                  id="instagram-tooltip"
                  title="Follow us on instagram"
                  placement={window.innerWidth > 959 ? 'top' : 'left'}
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button
                    color="transparent"
                    href="https://www.instagram.com/baron_dive/"
                    target="_blank"
                    className={classes.navLink}
                  >
                    <Icon icon={instagram} className={classNames(classes.subNavIcon, 'instagram')} />
                    <span className={classes.iconTxt}>Instagram</span>
                  </Button>
                </Tooltip>
              </ListItem>
            </List>
          </div>
        </div>
      </Hidden>
      <Hidden mdUp>
        <div className={classes.moTopWrap}>
          <div className={classes.moTopTit}><Link to="/">BARONDIVE</Link></div>
          <div><IconButton color="inherit" aira-label="open drawer" onClick={drawerToggle}><Menu /></IconButton></div>
        </div>
        <Drawer variant="temporary" anchor="right" open={mobileOpen} classes={{ paper: classes.drawerPaper }} onClose={drawerToggle}>
          <div className={classes.appResponsive}>
            <NavListPr closeMenu={drawerToggle} {...props} />
          </div>
        </Drawer>
      </Hidden>
    </>
  );
});

export default NavPr;
