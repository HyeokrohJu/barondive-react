const revInsStyle = (theme) => ({
  revWrap: {
    padding: '0 60px',
  },
  revInfoWrap: {
    padding: theme.spacing(1),
  },
  revInfoItem: {
  },
  textField: {
    width: '100%',
  },
  textField2: {
    width: '100%',
  },
  inputIcon: {
    padding: 12,
    '& svg': {
      width: 22,
      height: 22,
    },
  },
  form: {
    margin: '30px 0 60px 0',
  },
  subTitle: {
    margin: '20px 0',
    position: 'relative',
    color: theme.palette.grey[900],
    display: 'block',
    fontWeight: 600,
    fontSize: 16,
    lineHeight: '24px',
    letterSpacing: 2,
    fontFamily: 'NanumGothic',
    '&::before': {
      content: '\'\'',
      position: 'absolute',
      height: 2,
      width: 12,
      background: theme.palette.primary.main,
      left: 0,
      bottom: 0,
    },
  },
  btnWrap: {
    textAlign: 'center',
  },
  topBtnWrap: {
    dislay: 'flext',
    alignItems: 'center',
    fontSize: 14,
    marginBottom: 12,
  },
  iconBtn: {
    fontSize: 16,
    '& svg': {
      width: 24,
      height: 24,
    },
    '&.add': {
      color: theme.palette.primary.main,
    },
    '&.minus': {
      color: theme.palette.secondary.main,
    },
  },
  ml20: {
    marginLeft: 20,
  },
});

export default revInsStyle;
