
const searchStyle = (theme) => ({
  searchWrap: {
    border: '1px solid #dfdfdf',
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '@media (max-width: 960px)': {
      marginBottom: 10,
    },
  },
  searchInput: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  searchIconButton: {
    padding: 10,
  },
});

export default searchStyle;
