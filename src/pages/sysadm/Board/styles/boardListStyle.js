
const boardListStyle = (theme) => ({
  boardWrap: {
    margin: '0px 30px',
    fontSize: 14,
    fontFamily: 'NanumGothic',
    display: 'flex',
    '@media (max-width: 599px)': {
      flexWrap: 'wrap',
      margin: 0,
      marginTop: 20,
    },
  },
  boardMdDownWrap: {
    display: 'flex',
    '@media (max-width: 599px)': {
      display: 'none',
    },
  },
  lefList: {
    marginRight: 30,
  },
  boardListWrap: {
    width: '100%',
    '@media (max-width: 599px)': {
      padding: '0 20px',
    },
  },
  listWrap: {
    margin: 0,
    padding: 0,
    width: '100%',
    border: '0 none',
    borderSpacing: 0,
    borderCollapse: 'collapse',
    marginBottom: 30,
    tableLayout: 'fixed',
    '& tr > th': {
      textAlign: 'center',
      padding: 10,
      borderBottom: '2px solid #eee',
    },
    '& tr > td': {
      textAlign: 'center',
      padding: 10,
      border: '0 none',
      '& a': {
        color: theme.palette.grey[900],
      },
    },
    '& tr > td.title': {
      width: '100%',
      textAlign: 'left',
      padding: '10px 16px',
    },
    '& tr:hover > td': {
      background: theme.palette.primary.main,
      color: '#fff',
      '& a': {
        color: '#fff',
      },
    },
  },
  ellipsis: {
    width: '100%',
    display: 'block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  listItem: {
    margin: 0,
    padding: 0,
    cursor: 'pointer',
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
    margin: 0,
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
  },
  searchWrap: {

  },
  btnWrap: {

  },
  moBoardList: {
    margin: '0',
    marginTop: 20,
  },
  boardCnt: {
    marginRight: 10,
  },
  listBoardItem: {
    margin: 0,
    padding: 0,
    marginBottom: 14,
    paddingBottom: 14,
    borderBottom: '1px solid #efefef',
    display: 'flex',
    justifyItems: 'center',
    alignItems: 'center',
    flexWrap: 'nowrap',
  },
  listItemTitle: {
    margin: 0,
    padding: 0,
    fontSize: 14,
  },
  listItemEtc: {
    margin: 0,
    padding: 0,
    fontSize: 12,
    textAlign: 'right',
    '& span': {
      paddingLeft: 10,
    },
  },
  linkSt: {
    color: '#444',
  },
  listItemL: {
    marginRight: 10,
  },
  listItemR: {
    width: 'calc(100% - 45px)',
  },
  listCnt: {
    background: theme.palette.primary.main,
    display: 'block',
    width: 35,
    height: 35,
    textAlign: 'center',
    paddingTop: 6,
    borderRadius: 100,
    color: '#fff',
  },
});

export default boardListStyle;
