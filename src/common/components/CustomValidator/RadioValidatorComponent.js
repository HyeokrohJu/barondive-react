import React, { useState } from 'react';
import { observer } from 'mobx-react';
import {
  FormControl, FormControlLabel, Radio, RadioGroup, FormHelperText,
} from '@material-ui/core';

import getValidator from './ValidatorRule';

const RadioValidator = observer((props) => {
  const [isValid, setValid] = useState(true);
  const [errMsg, setErrMsg] = useState('');
  const {
    id, valObj, onChange, radioList, validator = [], errorMsg, errView, setValidState,
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

  return (
    <FormControl component="fieldset">
      <RadioGroup aria-label={id} name={id} value={valObj[id] || ''} onChange={fonChange} row>
        {radioList.length > 0 && radioList.map((item) => (
          <FormControlLabel
            key={item.key}
            value={item.value}
            control={<Radio color={item.color} />}
            label={item.label}
          />
        ))}
      </RadioGroup>
      {!isValid && errView && (
        <FormHelperText error>{errMsg}</FormHelperText>
      )}
    </FormControl>
  );
});

export default RadioValidator;
