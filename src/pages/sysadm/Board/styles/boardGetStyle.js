
const boardGetStyle = (theme) => ({
  boardGetWrap: {
    margin: '0px 40px',
    fontSize: 14,
    fontFamily: 'NanumGothic',
    '@media (max-width: 960px)': {
      margin: '0px 20px',
    },
  },
  bltTitle: {
    fontSize: 16,
    marginBottom: 12,
    '@media (max-width: 960px)': {
      fontSize: 14,
    },
  },
  subInfo: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
    fontSize: 12,
    background: '#f3f3f3',
    display: 'flex',
    borderRadius: 4,
    '& li': {
      margin: 0,
      padding: '8px 16px',
      marginRight: 12,
    },
    marginBottom: 16,
    '@media (max-width: 960px)': {
      display: 'block',
      '& li': {
        margin: 0,
        padding: '0 4px',
        display: 'inline-block',
      },
      padding: '5px 4px',
    },
  },
  strongMg: {
    marginLeft: 4,
  },
  bltCont: {
    minHeight: 600,
    marginBottom: 40,
    marginTop: 30,
    '& img': {
      maxWidth: '100%',
      height: 'auto',
    },
  },
  btnWrap: {
    '& button': {
      margin: '0 4px',
    },
    marginBottom: 30,
  },
  attachWrap: {
  },
  pageTitle: {
    margin: 0,
    position: 'relative',
    color: theme.palette.grey[900],
    marginBottom: 6,
    display: 'block',
    fontWeight: 600,
    fontSize: 14,
    fontFamily: 'NanumGothic',
    '&::before': {
      content: '\'\'',
      position: 'absolute',
      height: 2,
      width: 14,
      background: theme.palette.primary.main,
      left: 0,
      bottom: 0,
    },
  },
  attachList: {
    border: '1px solid #dfdfdf',
    borderRadius: 4,
    padding: 10,
    margin: 0,
    '& li': {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      '& a': {
        color: theme.palette.grey[900],
      },
      '& a:hover': {
        color: theme.palette.primary.main,
      },
    },
  },
  iconColor: {
    color: theme.palette.primary.main,
  },
});

export default boardGetStyle;
