/* eslint-disable camelcase */
import React from 'react';
import { observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import { takeOff } from 'react-icons-kit/entypo/takeOff';
import { ic_event } from 'react-icons-kit/md/ic_event';

import { DatetimePickerValidator, TextValidator } from '~/common/components';

const RevDiverAirPr = observer((props) => {
  const {
    classes, handleChange, revDiverItem, idx, handleDateChange, setValid,
  } = props;

  return (
    <>
      <Grid item xs={12} md={4}>
        <TextValidator
          classes={classes}
          id="flynum"
          valObj={revDiverItem}
          onChange={handleChange(idx)}
          startIcon={takeOff}
          fullWidth
          labelTxt="비행기편명"
          labelWidth={72}
          placeholder="비행기편명을 입력하세요."
          setValidState={setValid(idx)}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <DatetimePickerValidator
          classes={classes}
          id="flystartdt"
          valObj={revDiverItem}
          autoOk
          onChange={handleDateChange('flystartdt', true, idx)}
          labelTxt="비행기출발일시"
          startIcon={ic_event}
          fullWidth
          placeholder="비행기출발일시를 선택하세요."
          setValidState={setValid(idx)}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <DatetimePickerValidator
          classes={classes}
          id="flyenddt"
          valObj={revDiverItem}
          autoOk
          onChange={handleDateChange('flyenddt', true, idx)}
          labelTxt="비행기도착일시"
          startIcon={ic_event}
          fullWidth
          placeholder="비행기도착일시를 선택하세요."
          setValidState={setValid(idx)}
          validator={['required']}
          errorMsg={['비행기출발일시를 선택하세요.']}
        />
      </Grid>
    </>
  );
});

export default RevDiverAirPr;
