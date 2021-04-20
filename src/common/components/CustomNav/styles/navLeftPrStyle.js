
const navLeftPrStyle = (theme) => ({
  navLeftWrap: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
    fontSize: 12,
  },
  listIcon: {
    minWidth: 26,
  },
  menuTxt: {
    '& span': {
      fontSize: 14,
    },
  },
});

export default navLeftPrStyle;
