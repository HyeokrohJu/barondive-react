const mypageStyle = (theme) => ({
  main: {
    background: '#FFFFFF',
    position: 'relative',
    zIndex: '3',
    minHeight: '500px',
    padding: '50px 0',
  },
  mainRaised: {
    margin: '-160px 30px 0px',
    borderRadius: '6px',
    boxShadow:
          '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
  },
  subMenuWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  subMenuItem: {
    display: 'flex',
    flexDirection: 'column',
    width: 100,
    height: 100,
    alignContent: 'space-around',
    alignItems: 'center',
    background: 'none',
    border: '0 none',
    borderRadius: 3,
    margin: 10,
    padding: '0 15px',
    cursor: 'pointer',
    '&:hover, &.active': {
      background: theme.palette.primary.main,
      color: '#fff',
      boxShadow:
      '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
    },
  },
  subMenuIcon: {
    display: 'block',
    width: 30,
    height: 30,
    marginTop: 25,
    marginBottom: 10,
    '& svg': {
      width: 24,
      height: 24,
    },
  },
  subMenuTxt: {
    letterSpacing: '0px',
  },
});

export default mypageStyle;
