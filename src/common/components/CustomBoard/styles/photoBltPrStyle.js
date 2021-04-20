
const photoBltPrStyle = (theme) => ({
  boardWrap: {
    margin: '0px 30px',
    fontSize: 14,
    fontFamily: 'NanumGothic',
    '@media (max-width: 960px)': {
      margin: 0,
      marginTop: 20,
    },
  },
  listWrap: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: 0,
    padding: 0,
    justifyContent: 'center',
  },
  listItem: {
    display: 'flex',
    flexDirection: 'column',
    width: 390,
    margin: 0,
    padding: 0,
  },
  pagenav: {
    display: 'flex',
    justifyContent: 'center',
  },
  pagecurrent: {
    color: '#fff',
    background: theme.palette.primary.main,
    '&:hover': {
      background: theme.palette.primary.main,
    },
  },
  pageTitle: {
    margin: '0 30px',
    position: 'relative',
    color: theme.palette.grey[900],
    marginBottom: 20,
    display: 'block',
    fontWeight: 600,
    fontSize: 24,
    '&::before': {
      content: '\'\'',
      position: 'absolute',
      height: 3,
      width: 16,
      background: theme.palette.primary.main,
      left: 0,
      bottom: 2,
    },
    '@media (max-width: 960px)': {
      fontSize: '1.2rem',
      marginBottom: 10,
      '&::before': {
        content: '\'\'',
        position: 'absolute',
        height: 2,
        width: 12,
        background: theme.palette.primary.main,
        left: 0,
        bottom: 2,
      },
    },
  },
  bottomWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    '@media (max-width: 960px)': {
      padding: '0 10px',
    },
  },
  searchWrap: {

  },
  btnWrap: {

  },
});

export default photoBltPrStyle;
