import React from 'react';
import { observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import { user } from 'react-icons-kit/feather/user';

import { TextValidator } from '~/common/components';

const RevDiverRentalPr = observer((props) => {
  const {
    classes, handleChange, revDiverItem, idx, setValid,
  } = props;

  return (
    <>
      {revDiverItem.erentalyn === 'Y' && (
        <>
          <Grid item xs={12} md={2}>
            <TextValidator
              classes={classes}
              id="stature"
              valObj={revDiverItem}
              onChange={handleChange(idx)}
              startIcon={user}
              fullWidth
              labelTxt="키"
              labelWidth={16}
              placeholder="키를 입력하세요."
              setValidState={setValid(idx)}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextValidator
              classes={classes}
              id="weight"
              valObj={revDiverItem}
              onChange={handleChange(idx)}
              startIcon={user}
              endIcon="kg"
              fullWidth
              labelTxt="몸무게"
              labelWidth={44}
              placeholder="몸무게를 입력하세요."
              setValidState={setValid(idx)}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextValidator
              classes={classes}
              id="shoessize"
              valObj={revDiverItem}
              onChange={handleChange(idx)}
              startIcon={user}
              endIcon="mm"
              fullWidth
              labelTxt="신발사이즈"
              labelWidth={71}
              placeholder="신발사이즈를 입력하세요."
              setValidState={setValid(idx)}
            />
          </Grid>
        </>
      )}
    </>
  );
});

export default RevDiverRentalPr;
