const headerPrStyle = () => ({
  headerImg: {
    width: '100%',
    height: 400,
    maxHeight: 700,
    overflow: 'hidden',
    position: 'relative',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    margin: '0',
    padding: '0',
    border: '0',
    '@media (max-width: 960px)': {
      maxHeight: 300,
    },
  },
  brand: {
    color: '#FFFFFF',
    textAlign: 'left',
    marginTop: 170,
    marginLeft: 40,
    opacity: 0.4,
    '@media (max-width: 960px)': {
      marginTop: 200,
      opacity: 0.7,
      marginLeft: 20,
    },
  },
  title: {
    fontSize: '2.6rem',
    fontWeight: '500',
    display: 'inline-block',
    position: 'relative',
    letterSpacing: '0.4rem',
    textTransform: 'uppercase',
    '@media (max-width: 960px)': {
      fontSize: '1.4rem',
      letterSpacing: '0.1rem',
      display: 'block',
      margin: 0,
    },
  },
  subtitle: {
    fontSize: '1.313rem',
    maxWidth: '500px',
    fontWeight: '500',
    marginLeft: 20,
    letterSpacing: '0.2rem',
    '@media (max-width: 960px)': {
      fontSize: '1rem',
      letterSpacing: '0.1rem',
      marginLeft: 0,
    },
  },
});

export default headerPrStyle;
