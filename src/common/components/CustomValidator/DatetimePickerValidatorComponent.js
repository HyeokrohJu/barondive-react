import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { InputAdornment } from '@material-ui/core';
import { Icon } from 'react-icons-kit';
import { DateTimePicker } from '@material-ui/pickers';

import getValidator from './ValidatorRule';

const DatetimePickerValidator = observer((props) => {
  const [isValid, setValid] = useState(true);
  const [errMsg, setErrMsg] = useState('');
  const {
    classes, id, valObj, autoOk, onChange, labelTxt, startIcon, endIcon,
    fullWidth, placeholder, validator = [], errorMsg, setValidState, format, ampm,
  } = props;

  const fonChange = (e) => {
    onChange(e);

    let isVal = true;
    Promise.all(
      validator.map((valid) => getValidator(valid, valObj[id])),
    ).then((results) => {
      isVal = true;
      results.forEach((result, key) => {
        if (!result) {
          isVal = false;
          setErrMsg(errorMsg[key]);
          setValid(false);
        }
      });
      if (isVal) {
        setErrMsg('');
        setValid(true);
      }

      setValidState(id, isVal);
    });
  };

  const onBlur = () => {
    if (isValid) {
      let isVal = true;
      Promise.all(
        validator.map((valid) => getValidator(valid, valObj[id])),
      ).then((results) => {
        isVal = true;
        results.forEach((result, key) => {
          if (!result) {
            isVal = false;
            setErrMsg(errorMsg[key]);
            setValid(false);
          }
        });
        if (isVal) {
          setErrMsg('');
          setValid(true);
        }

        setValidState(id, isVal);
      });
    }
  };

  return (
    <DateTimePicker
      autoOk={autoOk}
      disablePast
      ampm={ampm}
      variant="inline"
      inputVariant="outlined"
      label={labelTxt}
      format={format || 'YYYY-MM-DD HH:mm'}
      id={id}
      value={valObj[id]}
      fullWidth={fullWidth}
      placeholder={placeholder}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Icon icon={startIcon} className={classes.inputIcon} />
          </InputAdornment>
        ),
        endAdornment: endIcon && (
          <InputAdornment position="end">
            <Icon icon={endIcon} className={classes.inputIcon} />
          </InputAdornment>
        ),
      }}
      onChange={fonChange}
      onBlur={onBlur}
      className={classes.textField}
      error={!isValid}
      helperText={errMsg}
    />
  );
});

export default DatetimePickerValidator;
