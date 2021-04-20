const fileUploaderStyle = (theme) => ({
  fileUploaderWrap: {
    width: '100%',
    fontSize: 14,
    fontFamily: 'NanumGothic',
  },
  pluploadWrap: {
    width: '100%',
    '& .fileItem': {
      margin: '5px 0',
    },
    '& > ul': {
      minHeight: 54,
      border: '1px solid #d1d1d1',
      listStyle: 'none',
      margin: 0,
      padding: '5px 20px',
      overflow: 'auto',
      display: 'flex',
      flexWrap: 'wrap',
      '& li': {
        marginRight: 10,
      },
      '& .successIcon': {
        color: '#4caf50',
        background: 'transparent',
        border: '1px solid #d1d1d1',
      },
      '& .addIcon': {
        color: '#00ACC1',
        background: 'transparent',
        border: '1px solid #d1d1d1',
      },
      '& .removeBtn': {
        border: '0 none',
        background: 'transparent',
        cursor: 'pointer',
      },
      '& .removeBtn:hover': {
        border: '0 none',
        background: 'transparent',
        cursor: 'pointer',
        color: '#e91e63',
      },
    },
    '& > button': {
      border: '0 none',
      background: 'transparent',

    },
  },
  pluploadTopWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  subTitle: {
    margin: 0,
    position: 'relative',
    color: theme.palette.grey[900],
    display: 'block',
    fontWeight: 600,
    fontSize: 14,
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
  attachWrap: {
    width: '100%',
    height: 54,
    padding: '5px 20px',
    border: '1px solid #D1D1D1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconTxt: {
    marginRight: 10,
  },
});

export default fileUploaderStyle;
