import headerStyle from '~/assets/jss/material-kit-react/components/headerStyle';
import { roseColor } from '~/assets/jss/material-kit-react';

const navPrStyle = (theme) => ({
  ...headerStyle,
  navWrap: {
    top: 0,
    position: 'fixed',
    width: '100%',
    display: 'flex',
    height: 80,
    background: '#fff',
    zIndex: 5,
    boxShadow: '0 4px 18px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.15)',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
  },
  navHeader: {
    fontWeight: 500,
    fontSize: 20,
    padding: '10px 30px',
  },
  logo: {
  },
  navRight: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingRight: 30,
    paddingLeft: 15,
    borderLeft: '1px solid #efefef',
  },
  list: {
    display: 'flex',
    padding: '4px 0',
  },
  listItem: {
    display: 'flex',
    margin: 0,
    padding: '2px 0',
  },
  navLink: {
    margin: '0 1px',
    padding: '0 15px',
  },
  iconTxt: {
    marginTop: 3,
    marginLeft: 4,
    fontWeight: 500,
  },
  subNavIcon: {
    color: roseColor,
    '&.instagram': {
      color: '#C41983',
    },
    '&.facebook': {
      color: '#1D4B98',
    },
  },
  moTopWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moTopTit: {
    fontWeight: 600,
    color: theme.palette.primary.main,
    marginLeft: 10,
    '& a': {
      color: theme.palette.primary.main,
    },
  },
});

export default navPrStyle;
