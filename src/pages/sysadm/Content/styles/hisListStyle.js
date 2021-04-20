const hisListStyle = (theme) => ({
  hisListWrap: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
    '& li': {
      padding: '4px 8px',
      '& button': {
        margin: 0,
        padding: 0,
        background: 'transparent',
        border: '0 none',
        cursor: 'pointer',
        width: '100%',
        textAlign: 'left',
      },
    },
    '& li:hover': {
      background: theme.palette.primary.main,
      color: '#fff',
      borderRadius: 4,
      '& button': {
        color: '#fff',
      },
    },
  },
  active: {
    background: theme.palette.primary.main,
    color: '#fff',
    borderRadius: 4,
    '& button': {
      color: '#fff',
    },
  },
});

export default hisListStyle;
