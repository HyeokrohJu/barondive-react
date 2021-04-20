import { container } from '~/assets/jss/material-kit-react';

const rightListStyle = (theme) => ({
  container,
  divider: {
    marginTop: 15,
    marginBottom: 15,
  },
  leftAvatar: {
    border: '1px solid #bdbdbd',
    backgroundColor: '#f2f2f2',
  },
  listItemPrimary: {
    position: 'relative',
    color: theme.palette.primary.main,
    marginBottom: 14,
    display: 'block',
    '&::before': {
      content: '\'\'',
      position: 'absolute',
      height: 2,
      width: 14,
      background: theme.palette.primary.main,
      left: 0,
      bottom: '-2px',
    },
  },
  listPriText: {
    marginBottom: 10,
    fontSize: 14,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  avatarIcon: {
    color: '#444',
  },
});

export default rightListStyle;
