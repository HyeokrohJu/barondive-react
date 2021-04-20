
const navSubPrStyle = (theme) => ({
  subMenuWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    '@media (max-width: 960px)': {
      marginBottom: 10,
      justifyContent: 'left',
      marginLeft: 10,
    },
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
    '@media (max-width: 960px)': {
      width: 80,
      height: 80,
      fontSize: 12,
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
    '@media (max-width: 960px)': {
      marginTop: 15,
      width: 20,
      height: 20,
      '& svg': {
        width: 18,
        height: 18,
      },
    },
  },
  subMenuTxt: {
    letterSpacing: '0px',
    width: 100,
    lineHeight: '120%',
    '@media (max-width: 960px)': {
      width: 80,
    },
  },
});

export default navSubPrStyle;
