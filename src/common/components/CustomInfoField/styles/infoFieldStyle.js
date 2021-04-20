const infoFieldStyle = () => ({
  infoWrap: {
    margin: 0,
    padding: 0,
    position: 'relative',
    fontFamily: 'NanumGothic',
    border: '1px solid #dfdfdf',
    borderRadius: 4,
    '& dt': {
      position: 'absolute',
      background: '#fff',
      fontSize: 12,
      margin: 0,
      padding: '0 4px',
      marginTop: -10,
      marginLeft: 8,
    },
    '& dd': {
      fontSize: 16,
      margin: 0,
      padding: '0 12px',
      paddingTop: 14,
      paddingBottom: 6,
    },
  },
  iconSapn: {
    marginRight: 4,
  },
});

export default infoFieldStyle;
