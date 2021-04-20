const footerStyle = () => ({
  container: {
    marginTop: 60,
    padding: '20px 60px 15px 60px',
    backgroundColor: '#333',
    display: 'flex',
    flexWrap: 'wrap',
    '@media (max-width: 960px)': {
      flexDirection: 'column',
      padding: '20px 20px 15px 20px',
    },
  },
  footerTxt: {
    fontSize: 14,
    fontFamily: 'NanumGothic',
    letterSpacing: 2,
    color: '#868686',
    marginLeft: 50,
    '@media (max-width: 960px)': {
      fontSize: 12,
      marginLeft: 0,
      marginTop: 20,
      lineHeight: '140%',
    },
  },
  footerLogo: {
    display: 'flex',
    alignItems: 'center',
    '& img': {
      width: 180,
    },
  },
  addressTxt: {
    textDecoration: 'none',
    fontStyle: 'normal',
  },
  copyright: {
    backgroundColor: '#2f2f2f',
    color: '#868686',
    fontSize: 14,
    padding: '10px 60px',
    '@media (max-width: 960px)': {
      fontSize: 12,
      lineHeight: '140%',
    },
  },
  footerSpan: {
    margin: '0 10px',
  },
  footerSpanFirst: {
    '@media (max-width: 851px)': {
      marginLeft: 0,
    },
  },
  footerSpanName: {
    '@media (max-width: 620px)': {
      display: 'block',
      marginLeft: 0,
    },
  },
});

export default footerStyle;
