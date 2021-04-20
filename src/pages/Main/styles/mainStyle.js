import { container } from '~/assets/jss/material-kit-react';

const mainStyle = (theme) => ({
  container,
  brand: {
    color: '#FFFFFF',
    textAlign: 'left',
    '@media (max-width: 960px)': {
      marginTop: 140,
      marginLeft: 20,
    },
  },
  title: {
    fontSize: '4.2rem',
    fontWeight: '600',
    display: 'inline-block',
    position: 'relative',
    '@media (max-width: 960px)': {
      fontSize: '2rem',
      margin: 0,
    },
  },
  subtitle: {
    fontSize: '1.313rem',
    maxWidth: '500px',
    margin: '10px 0 0',
    '@media (max-width: 960px)': {
      fontSize: '1rem',
      margin: 0,
    },
  },
  main: {
    background: '#FFFFFF',
    position: 'relative',
    zIndex: '3',
    minHeight: '500px',
  },
  mainRaised: {
    margin: '-60px 30px 0px',
    borderRadius: '6px',
    boxShadow:
      '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
    '@media (max-width: 960px)': {
      margin: 'inherit',
    },
  },
  link: {
    textDecoration: 'none',
  },
  textCenter: {
    textAlign: 'center',
  },
  mainCont: {
    '@media (min-width: 576px)': {
      maxWidth: '540px',
    },
    '@media (min-width: 768px)': {
      maxWidth: '720px',
    },
    '@media (min-width: 992px)': {
      maxWidth: '992px',
    },
    '@media (min-width: 1200px)': {
      maxWidth: '1440px',
    },
    width: '100%',
    zIndex: 2,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: '15px',
    paddingRight: '15px',
    '@media (max-width: 960px)': {
      paddingLeft: 'inherit',
      paddingRight: 'inherit',
    },
  },
  mainContSub: {
    padding: '70px 0',
    paddingBottom: '0',
    backgroundSize: 'cover',
    backgroundPosition: '50%',
    '@media (max-width: 960px)': {
      padding: '20px 0',
    },
  },
  mainImg: {
    width: '100%',
    height: '90vh',
    maxHeight: 700,
    overflow: 'hidden',
    position: 'relative',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    margin: '0',
    padding: '0',
    border: '0',
    display: 'flex',
    alignItems: 'center',
    '@media (max-width: 960px)': {
      maxHeight: 300,
    },
  },
  prevArrow: {
    fontSize: 0,
    lineHeight: 0,
    position: 'absolute',
    top: '50%',
    padding: 0,
    '-ms-transform': 'translateY(-50%)',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    border: 'none',
    color: '#fff',
    outline: 'none',
    background: 'transparent',
    width: '5%',
    zIndex: 2,
    opacity: '0.5',
    left: 0,
    textAlign: 'right',
  },
  nextArrow: {
    fontSize: 0,
    lineHeight: 0,
    position: 'absolute',
    top: '50%',
    padding: 0,
    '-ms-transform': 'translateY(-50%)',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    border: 'none',
    color: '#fff',
    outline: 'none',
    background: 'transparent',
    width: '5%',
    zIndex: 2,
    opacity: '0.5',
    right: 0,
    textAlign: 'left',
    '@media (max-width: 960px)': {
      right: 40,
    },
  },
  iconSt: {
    '& svg': {
      width: 60,
      height: 60,
    },
  },
  slideDot: {
    marginBottom: 90,
    '@media (max-width: 960px)': {
      marginBottom: 5,
    },
  },
  cardItemTitle: {
    margin: '0 30px',
    position: 'relative',
    color: theme.palette.primary.main,
    marginBottom: 16,
    display: 'block',
    fontWeight: 600,
    '&::before': {
      content: '\'\'',
      position: 'absolute',
      height: 2,
      width: 14,
      background: theme.palette.primary.main,
      left: 0,
      bottom: 2,
    },
  },
  mainBbs: {
    margin: '30px 0',
  },
  gridRoot: {
    '@media (max-width: 960px)': {
      marginLeft: 0,
      marginRight: 0,
    },
  },
});

export default mainStyle;
