import React from 'react';
import { observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import { user } from 'react-icons-kit/feather/user';

import { TextValidator, RadioValidator } from '~/common/components';

const RevDiverInfoPr = observer((props) => {
  const {
    classes, handleChange, idx, setValid, revDiverItem,
  } = props;

  return (
    <>
      <Grid item xs={12} md={4}>
        <TextValidator
          classes={classes}
          id="kornm"
          valObj={revDiverItem}
          onChange={handleChange(idx)}
          startIcon={user}
          fullWidth
          labelTxt="한글이름"
          labelWidth={59}
          placeholder="한글이름을 입력하세요."
          setValidState={setValid(idx)}
          validator={['required']}
          errorMsg={['한글이름을 입력하세요.']}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextValidator
          classes={classes}
          id="engnm"
          valObj={revDiverItem}
          onChange={handleChange(idx)}
          startIcon={user}
          fullWidth
          labelTxt="영문이름"
          labelWidth={59}
          placeholder="영문이름을 입력하세요."
          setValidState={setValid(idx)}
          validator={['required']}
          errorMsg={['영문이름을 입력하세요.']}
        />
      </Grid>
      <Grid item xs={12} md={2}>
        <TextValidator
          classes={classes}
          id="age"
          valObj={revDiverItem}
          onChange={handleChange(idx)}
          startIcon={user}
          fullWidth
          labelTxt="나이"
          labelWidth={31}
          placeholder="나이를 입력하세요."
          setValidState={setValid(idx)}
        />
      </Grid>
      <Grid item xs={12} md={2}>
        <RadioValidator
          id="sex"
          valObj={revDiverItem}
          onChange={handleChange(idx)}
          radioList={[{
            key: 'M',
            value: 'M',
            color: 'primary',
            label: '남성',
          }, {
            key: 'F',
            value: 'F',
            color: 'primary',
            label: '여성',
          }]}
          setValidState={setValid(idx)}
        />
      </Grid>
    </>
  );
});

export default RevDiverInfoPr;
