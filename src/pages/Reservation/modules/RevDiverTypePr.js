/* eslint-disable camelcase */
import React from 'react';
import { observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import { ic_event } from 'react-icons-kit/md/ic_event';

import { SelectValidator, DatePickerValidator, CheckboxValidator } from '~/common/components';

const RevDiverTypePr = observer((props) => {
  const {
    classes, handleChange, handleDateChange, revDiverItem, idx, setValid,
  } = props;

  return (
    <>
      <Grid item xs={12} md={2}>
        <SelectValidator
          id="divingtype"
          valObj={revDiverItem}
          optionList={[{
            key: 'F',
            value: 'F',
            text: '펀',
          }, {
            key: 'A',
            value: 'A',
            text: '교육',
          }, {
            key: 'E',
            value: 'E',
            text: '체험',
          }]}
          onChange={handleChange(idx)}
          labelTxt="다이빙종류"
          fullWidth
          labelWidth={70}
          placeholder="다이빙종류를 선택하세요."
          setValidState={setValid(idx)}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <DatePickerValidator
          classes={classes}
          id="divingstartdt"
          valObj={revDiverItem}
          autoOk
          onChange={handleDateChange('divingstartdt', false, idx)}
          labelTxt="다이빙시작일"
          startIcon={ic_event}
          fullWidth
          placeholder="다이빙시작일을 선택하세요."
          setValidState={setValid(idx)}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <DatePickerValidator
          classes={classes}
          id="divingenddt"
          valObj={revDiverItem}
          autoOk
          onChange={handleDateChange('divingenddt', false, idx)}
          labelTxt="다이빙종료일"
          startIcon={ic_event}
          fullWidth
          placeholder="다이빙종료일을 선택하세요."
          setValidState={setValid(idx)}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <CheckboxValidator
          id="divingcert"
          valObj={revDiverItem}
          onChange={handleChange(idx)}
          color="primary"
          val="Y"
          label="다이빙라이센스 유무"
        />
        <CheckboxValidator
          id="erentalyn"
          valObj={revDiverItem}
          onChange={handleChange(idx)}
          color="primary"
          val="Y"
          label="장비렌탈 유무"
        />
        <CheckboxValidator
          id="etcstayyn"
          valObj={revDiverItem}
          onChange={handleChange(idx)}
          color="primary"
          val="Y"
          label="외부 숙박 유무"
        />
      </Grid>
    </>
  );
});

export default RevDiverTypePr;
