const loginStyle = (theme) => ({
  loginWrap: {
    background: '#FFFFFF',
    position: 'absolute',
    zIndex: '3',
    padding: '50px',
    top: 200,
    left: 'calc(50% - 150px)',
    width: 540,
    borderRadius: '4px',
    margin: '0 auto',
    boxShadow:
      '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
  },
  loginFormWrap: {
    margin: 0,
  },
  loginBtn: {
    width: '100%',
    fontSize: 18,
    fontWeight: 600,
  },
  saveWrap: {
    textAlign: 'right',
  },
  inputIcon: {
    padding: 12,
    '& svg': {
      width: 22,
      height: 22,
    },
  },
  inputTxt: {
    marginTop: 16,
  },
  btnIcon: {
    paddingRight: 8,
    marginLeft: '-12px',
    '& svg': {
      width: 22,
      height: 22,
    },
  },
  topTitle: {
    position: 'relative',
    margin: 0,
    marginBottom: 30,
    color: theme.palette.grey[900],
    display: 'block',
    fontWeight: 600,
    fontSize: 26,
    letterSpacing: 2,
    fontFamily: 'Roboto',
    '&::before': {
      content: '\'\'',
      position: 'absolute',
      height: 3,
      width: 16,
      background: theme.palette.primary.main,
      left: 0,
      bottom: 0,
    },
  },
  gridCenter: {
    textAlign: 'center',
  },
  linkTxt: {
    position: 'relative',
    fontFamily: 'NanumGothic',
    fontSize: 14,
    color: theme.palette.grey[900],
    margin: '0 10px',
    paddingBottom: 2,
    '&:hover, &:active, &:focus': {
      color: theme.palette.primary.main,
      borderBottom: `1px solid ${theme.palette.primary.main}`,
    },
    '&.rightbar::before': {
      content: '\'\'',
      position: 'absolute',
      height: 12,
      width: 1,
      background: theme.palette.grey[400],
      right: -10,
      bottom: 4,
    },
  },
});

export default loginStyle;
