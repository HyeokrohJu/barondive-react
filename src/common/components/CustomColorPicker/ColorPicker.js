import React, { useState, useEffect } from 'react';
import { BlockPicker } from 'react-color';

import { makeStyles } from '@material-ui/core/styles';

import colorPicker from './styles/colorPicker';

const useStyle = makeStyles(colorPicker);

const ColorPicker = ({ coloerPickerChange, currtColor, currtColorKey }) => {
  const classes = useStyle();
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState(currtColor[currtColorKey] || '#212121');

  useEffect(() => {
    if (currtColor[currtColorKey]) {
      setColor(currtColor[currtColorKey]);
    }
  }, [currtColor, currtColorKey]);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    coloerPickerChange(color);
    setDisplayColorPicker(false);
  };

  const handleChange = (pcolor) => {
    setColor(pcolor.hex);
  };

  return (
    <div className={classes.colorPickerWrap}>
      <div
        className={classes.swatch}
        role="button"
        tabIndex={0}
        onKeyDown={handleClick}
        onClick={handleClick}
      >
        <div className={classes.color} style={{ background: color }} />
      </div>
      { displayColorPicker ? (
        <div className={classes.popover}>
          <div
            className={classes.cover}
            role="button"
            tabIndex={0}
            onKeyDown={handleClose}
            onClick={handleClose}
          >
            닫기
          </div>
          <BlockPicker
            color={color}
            onChange={handleChange}
            colors={['#212121', '#D9E3F0', '#F47373', '#697689', '#37D67A', '#2CCCE4', '#555555', '#dce775', '#ff8a65', '#ba68c8']}
          />
        </div>
      ) : null }
    </div>
  );
};

export default ColorPicker;
