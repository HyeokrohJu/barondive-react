
const boardStyle = () => ({
  main: {
    background: '#FFFFFF',
    position: 'relative',
    zIndex: '3',
    minHeight: '500px',
    padding: '50px 0',
    '@media (max-width: 960px)': {
      padding: '20px 0',
    },
  },
  mainRaised: {
    margin: '-160px 30px 0px',
    borderRadius: '6px',
    boxShadow:
      '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
    '@media (max-width: 960px)': {
      margin: '-40px 0px 0px',
    },
  },
});

export default boardStyle;
