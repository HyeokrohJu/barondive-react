import React from 'react';
import { observer } from 'mobx-react';
import { Checkbox, FormControlLabel } from '@material-ui/core';

const CheckboxValidator = observer((props) => {
  const {
    id, valObj, onChange, color, val, label,
  } = props;

  return (
    <FormControlLabel
      control={(
        <Checkbox
          id={id}
          color={color}
          checked={valObj[id] === val}
          onChange={onChange}
          value={val}
        />
      )}
      label={label}
    />
  );
});

export default CheckboxValidator;
