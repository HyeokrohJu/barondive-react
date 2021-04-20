const frontStyle = () => ({
  frontWrap: {
    position: 'relative',
    height: '100%',
    paddingTop: 80,
    '@media (max-width: 960px)': {
      paddingTop: 0,
      background: '#fff',
    },
  },
  routeWrap: {
    minHeight: 'calc(100vh - 291px)',
    // minHeight: '100vh',
    margin: 0,
    width: '100%',
  },
});

export default frontStyle;
