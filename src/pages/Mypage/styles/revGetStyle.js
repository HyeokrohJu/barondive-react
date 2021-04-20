
const boardGetStyle = (theme) => ({
  revWrap: {
    padding: '0 60px',
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
  revInfoWrap: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  revInfoItem: {
    width: '25%',
    padding: '0 8px',
    marginBottom: 16,
  },
  revInfoCont: {
    minHeight: 300,
    border: '1px solid #dfdfdf',
    margin: '0 8px',
    padding: '8px 16px',
    paddingTop: 16,
    marginBottom: 32,
    overflowY: 'auto',
    '& .revInfoContTit': {
      position: 'absolute',
      background: '#fff',
      fontSize: 12,
      margin: 0,
      padding: '0 4px',
      marginTop: -28,
      marginLeft: 8,
    },
  },
  w100: {
    width: '100%',
  },
  revDiverWrap: {
    marginBottom: 20,
  },
  subDiverTitle: {
    margin: '20px 8px',
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
      left: 2,
      bottom: 0,
    },
  },
  snackbarRoot: {
    position: 'relative',
    padding: '20px 15px',
    lineHeight: '20px',
    marginBottom: '20px',
    fontSize: '14px',
    backgroundColor: 'white',
    color: '#555555',
    borderRadius: 4,
    maxWidth: '100%',
    minWidth: 'auto',
    boxShadow:
      '0 12px 20px -10px rgba(255, 255, 255, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(255, 255, 255, 0.2)',
  },
  snackbarInfo: {
    backgroundColor: theme.palette.primary.main,
    color: '#ffffff',
    boxShadow: '0 12px 20px -10px rgba(78, 140, 199, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(78, 140, 199, 0.2)',
  },
  snackbarSuccess: {
    backgroundColor: '#4caf50',
    color: '#ffffff',
    boxShadow: '0 12px 20px -10px rgba(76, 175, 80, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(76, 175, 80, 0.2)',
  },
  snackbarDanger: {
    backgroundColor: '#f44336',
    color: '#ffffff',
    boxShadow: '0 12px 20px -10px rgba(244, 67, 54, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(244, 67, 54, 0.2)',
  },
  snackbarMessage: {
    padding: '0',
    display: 'block',
    '&,& *': {
      letterSpacing: 'normal',
    },
  },
  snackbarCont: {
    paddingRight: '15px',
    paddingLeft: '15px',
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '100%',
    position: 'relative',
  },
  snackbarIcon: {
    fontSize: 16,
    '& svg': {
      width: 24,
      height: 24,
    },
    marginRight: 8,
  },
});

export default boardGetStyle;
