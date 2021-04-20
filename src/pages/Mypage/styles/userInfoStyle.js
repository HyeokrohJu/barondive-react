const userInfoStyle = (theme) => ({
  joinWrap: {
    background: '#FFFFFF',
    position: 'relative',
    zIndex: '3',
    padding: '0 50px',
    width: 540,
    borderRadius: '4px',
    margin: '0 auto',
    marginTop: 60,
    '@media (max-width: 960px)': {
      position: 'relative',
      width: '100%',
      margin: 0,
      left: 0,
      top: 0,
      height: '100%',
    },
  },
  joinFormWrap: {
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
    fontFamily: 'NanumGothic',
    '&::before': {
      content: '\'\'',
      position: 'absolute',
      height: 3,
      width: 24,
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

export default userInfoStyle;
