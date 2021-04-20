import React from 'react';
import { observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import { home } from 'react-icons-kit/feather/home';

import { TextValidator } from '~/common/components';

const RevDiverEtcPr = observer((props) => {
  const {
    classes, handleChange, revDiverItem, idx, setValid,
  } = props;

  return (
    <>
      {revDiverItem.divingtype === 'A' && (
        <Grid item xs={12}>
          <TextValidator
            classes={classes}
            id="address"
            valObj={revDiverItem}
            onChange={handleChange(idx)}
            startIcon={home}
            fullWidth
            labelTxt="교재받을주소"
            labelWidth={88}
            placeholder="교재받을주소를 입력하세요."
            setValidState={setValid(idx)}
          />
        </Grid>
      )}

      {revDiverItem.etcstayyn === 'Y' && (
        <Grid item xs={12}>
          <TextValidator
            classes={classes}
            id="staydesc"
            valObj={revDiverItem}
            onChange={handleChange(idx)}
            startIcon={home}
            fullWidth
            labelTxt="외부숙소정보"
            labelWidth={88}
            placeholder="외부숙소정보를 입력하세요."
            setValidState={setValid(idx)}
          />
        </Grid>
      )}
    </>
  );
});

export default RevDiverEtcPr;
