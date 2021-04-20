const cmntStyle = (theme) => ({
  cmntWrap: {
    display: 'flex',
  },
  cmntTxt: {
    width: '100%',
    border: '1px solid #dfdfdf',
    height: 80,
    padding: 8,
    marginRight: 8,
  },
  btnWrap: {
    '& button': {
      margin: 0,
      height: '100%',
    },
  },
  cmntTitle: {
    margin: 0,
    position: 'relative',
    color: theme.palette.grey[900],
    marginBottom: 8,
    display: 'block',
    fontWeight: 600,
    fontSize: 14,
    '&::before': {
      content: '\'\'',
      position: 'absolute',
      height: 2,
      width: 12,
      background: theme.palette.primary.main,
      left: 1,
      bottom: 0,
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
  cmntListWrap: {
    marginTop: 20,
  },
  cmntList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  listItem: {
    listStyle: 'none',
    margin: 0,
    padding: '8px 12px',
    borderBottom: '1px solid #dfdfdf',
    fontSize: 14,
    fontFamily: 'NanumGothic',
    '& dl': {
      margin: 0,
      padding: 0,
      width: '100%',
      '& dt': {
        fontSize: 14,
        marginBottom: 6,
        '& .dateWrap': {
          marginLeft: 10,
          fontSize: 12,
        },
      },
      '& dd': {
        margin: 0,
        padding: 0,
      },
    },
    '& .replyCmntBtn': {
      marginLeft: 14,
      fontSize: 12,
      cursor: 'pointer',
      display: 'none',
    },
    '&:hover .replyCmntBtn': {
      display: 'inline-block',
    },
  },
  replyCmntAddWrap: {
    marginTop: 20,
  },
  replyWrap: {
    display: 'flex',
  },
  replyIconWrap: {
    marginRight: 10,
  },
  delTxt: {
    color: '#f44336',
  },
});

export default cmntStyle;
