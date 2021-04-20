import React, { useState } from 'react';
import { observer } from 'mobx-react';
import {
  FormControl, InputLabel, FormHelperText,
  Select, MenuItem,
} from '@material-ui/core';

import getValidator from './ValidatorRule';

const SelectValidator = observer((props) => {
  const [isValid, setValid] = useState(true);
  const [errMsg, setErrMsg] = useState('');
  const {
    id, valObj, optionList, onChange, labelTxt, fullWidth,
    labelWidth, placeholder, validator = [], errorMsg, setValidState,
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
    <FormControl fullWidth={fullWidth} variant="outlined" error={!isValid}>
      <InputLabel id={`${id}label`}>{labelTxt}</InputLabel>
      <Select
        labelid={`${id}label`}
        id={id}
        name={id}
        onChange={fonChange}
        onBlur={onBlur}
        value={valObj[id] || ''}
        labelWidth={labelWidth}
        placeholder={placeholder}
      >
        {optionList.length > 0 && optionList.map((item) => (
          <MenuItem key={item.key} value={item.value}>{item.text}</MenuItem>
        ))}
      </Select>
      {!isValid && (
      <FormHelperText>{errMsg}</FormHelperText>
      )}
    </FormControl>
  );
});

export default SelectValidator;
