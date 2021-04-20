const revListStyle = (theme) => ({
  boardWrap: {
    margin: '0px 30px',
    fontSize: 14,
    fontFamily: 'NanumGothic',
    display: 'flex',
    '@media (max-width: 850px)': {
      flexWrap: 'wrap',
      margin: 0,
    },
  },
  lefList: {
    marginRight: 30,
  },
  boardListWrap: {
    width: '100%',
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
  },
  bottomWrap: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  searchWrap: {

  },
  btnWrap: {

  },
  cursorPointer: {
    cursor: 'pointer',
  },
});

export default revListStyle;
