const drawerWidth = 240;
const sysadmStyle = (theme) => ({
  sysadmWrap: {
    position: 'relative',
    height: '100%',
    display: 'flex',
  },
  routeWrap: {
    // minHeight: 'calc(100vh - 291px)',
    minHeight: '100vh',
    margin: 0,
    width: '100%',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    background: '#fafafa',
  },
  toolbar: theme.mixins.toolbar,
});

export default sysadmStyle;
