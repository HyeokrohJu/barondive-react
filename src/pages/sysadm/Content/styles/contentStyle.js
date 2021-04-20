const contentStyle = (theme) => ({
  main: {
    background: '#FFFFFF',
    position: 'relative',
    zIndex: '3',
    minHeight: '500px',
    padding: '0',
  },
  mainRaised: {
    height: 'calc(100vh - 62px)',
    padding: 20,
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
  contWrap: {
    display: 'flex',
  },
  contLeft: {
    width: 250,
    marginRight: 10,
  },
  contHisWrap: {
    width: '100%',
    border: '1px solid #dfdfdf',
    padding: 8,
    overflowY: 'auto',
    minHeight: 300,
    borderRadius: 4,
  },
  contRight: {
    width: '100%',
  },
  hisTitle: {
    position: 'relative',
    fontSize: 16,
    fontWeight: 500,
    '&::before': {
      content: '\'\'',
      position: 'absolute',
      height: 2,
      width: 10,
      background: theme.palette.primary.main,
      left: 1,
      bottom: 2,
    },
  },
  contBtn: {
    width: '100%',
  },
});

export default contentStyle;
