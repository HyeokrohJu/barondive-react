
const mainBltPrStyle = (theme) => ({
  noticeWrap: {
    fontSize: 14,
  },
  mainBltList: {
    listStyle: 'none',
    padding: 0,
    margin: '0 30px',
    '& > li': {
      padding: '6px 8px',
    },
    '& > li:hover': {
      backgroundColor: '#efefef',
    },
    '& a': {
      color: theme.palette.grey[900],
    },
  },
  listRow: {
    display: 'flex',
    margin: 0,
    '& > dt': {
      width: '80%',
      display: 'block',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    '& > dd': {
      width: '20%',
      textAlign: 'right',
    },
  },
});

export default mainBltPrStyle;
