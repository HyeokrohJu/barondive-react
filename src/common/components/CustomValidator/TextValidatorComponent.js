import React, { useState } from 'react';
import _ from 'lodash';
import { observer } from 'mobx-react';
import {
  InputAdornment, FormControl, InputLabel, OutlinedInput, FormHelperText,
} from '@material-ui/core';
import { Icon } from 'react-icons-kit';

import getValidator from './ValidatorRule';

const TextValidator = observer((props) => {
  const [isValid, setValid] = useState(true);
  const [errMsg, setErrMsg] = useState('');
  const {
    classes, id, valObj, type, onChange, labelTxt, startIcon, endIcon, disabled,
    fullWidth, labelWidth, placeholder, validator = [], errorMsg, setValidState,
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
      const asyncValid = validator.filter((valid) => valid.indexOf('async') > -1);
      Promise.all(
        asyncValid.map((valid) => getValidator(valid, valObj[id], true)),
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
    <FormControl fullWidth variant="outlined">
      <InputLabel htmlFor={id}>{labelTxt}</InputLabel>
      <OutlinedInput
        id={id}
        type={type || 'text'}
        value={valObj[id] || ''}
        onChange={fonChange}
        onBlur={onBlur}
        startAdornment={startIcon && (
          <InputAdornment position="start">
            <Icon icon={startIcon} className={classes.inputIcon} />
          </InputAdornment>
        )}
        endAdornment={endIcon && (
          <InputAdornment position="end">
            {_.isString(endIcon) ? (
              endIcon
            ) : (
              <Icon icon={endIcon} className={classes.inputIcon} />
            )}
          </InputAdornment>
        )}
        fullWidth={fullWidth}
        labelWidth={labelWidth}
        placeholder={placeholder}
        className={classes.textField}
        aria-describedby="helperTxt"
        error={!isValid}
        disabled={disabled}
      />
      {!isValid && (
      <FormHelperText id="helperTxt" error>{errMsg}</FormHelperText>
      )}
    </FormControl>
  );
});

export default TextValidator;
