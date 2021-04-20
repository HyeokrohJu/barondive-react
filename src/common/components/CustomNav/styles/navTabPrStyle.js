
const navTabPrStyle = (theme) => ({
  navTab: {
  },
  navTabCls: {
    minHeight: 80,
    '@media (max-width: 960px)': {
      paddingTop: 0,
    },
  },
  navTabItem: {
    height: 80,
  },
  navTabWrapper: {
    fontFamily: 'Roboto',
    fontWeight: 400,
    '& svg': {
      height: 22,
      width: 22,
    },
  },
  navIndicator: {
    height: 4,
  },
  moLogo: {
    paddingTop: 0,
    '& img': {
      height: 50,
    },
    borderBottom: '1px solid rgb(78, 140, 199, 0.2)',
    marginBottom: 8,
    paddingBottom: 16,
  },
  moIcon: {
    '& svg': {
      width: 18,
      height: 18,
      color: theme.palette.primary.main,
    },
  },
  moNavIcon: {
    minWidth: 30,
  },
  moNavTxt: {
    textTransform: 'uppercase',
    '& span': {
      fontSize: 14,
    },
  },
  moListItem: {
    paddingTop: 4,
    paddingBottom: 4,
  },
});

export default navTabPrStyle;
