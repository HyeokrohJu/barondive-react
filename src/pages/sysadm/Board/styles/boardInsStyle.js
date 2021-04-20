
const boardInsStyle = (theme) => ({
  boardInsWrap: {
    margin: '0px 40px',
    fontSize: 14,
    fontFamily: 'NanumGothic',
  },
  fileUploader: {
    marginTop: 30,
  },
  subTitle: {
    margin: 0,
    position: 'relative',
    color: theme.palette.grey[900],
    marginBottom: 20,
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
  fontColor: {
    fontFamily: 'NanumGothic',
    display: 'flex',
    fontSize: 16,
    color: '#aaaaaa',
  },
});

export default boardInsStyle;
