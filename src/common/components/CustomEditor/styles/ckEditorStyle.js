
const ckEditorStyle = (theme) => ({
  imgsWrap: {
    marginTop: 20,
    width: '100%',
    border: '1px solid #eee',
    maxHeight: 200,
    padding: '10px 5px',
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'auto',
  },
  itemWrap: {
    position: 'relative',
    '& .addImg': {
      position: 'absolute',
      bottom: 0,
      right: 0,
      display: 'none',
    },
    '&:hover': {
      border: '2px solid',
      borderColor: theme.palette.primary.main,
    },
    '&.active': {
      border: '2px solid',
      borderColor: theme.palette.primary.main,
      '&::before': {
        content: '\'대표\'',
        position: 'absolute',
        fontSize: 12,
        color: '#fff',
        height: 22,
        width: 24,
        background: theme.palette.primary.main,
        left: 0,
        top: 0,
        padding: '0 6px',
        zIndex: 1,
      },
    },
    '&:hover .addImg': {
      position: 'absolute',
      bottom: 0,
      right: 0,
      display: 'block',
      cursor: 'pointer',
      background: theme.palette.primary.main,
      padding: 2,
      borderRadius: '4px 4px 0 4px',
      color: '#fff',
      '& svg': {
        width: 20,
        height: 20,
      },
    },
  },
  eimg: {
    position: 'relative',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    width: 100,
    height: 80,
    borderRadius: 3,
    margin: 5,
  },
});

export default ckEditorStyle;
