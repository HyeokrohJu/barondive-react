import React from 'react';
import { observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import { user } from 'react-icons-kit/feather/user';
import { phone } from 'react-icons-kit/feather/phone';
import { atSign } from 'react-icons-kit/feather/atSign';
import { ic_local_car_wash as icLocalCarWash } from 'react-icons-kit/md/ic_local_car_wash';
import { ic_event as icEvent } from 'react-icons-kit/md/ic_event';

import {
  CustomCKEditor, TextValidator, DatePickerValidator, CheckboxValidator, DatetimePickerValidator,
} from '~/common/components';

const RevInfoCo = observer((props) => {
  const {
    classes, rev: { getRevInfo }, attach, handleChange, handleDateChange, onChange, setValid,
  } = props;
  return (
    <form className={classes.form}>
      <Grid container alignItems="center" className={classes.revInfoWrap} spacing={2}>
        <Grid item xs={12} md={4}>
          <TextValidator
            classes={classes}
            id="revnm"
            valObj={getRevInfo}
            onChange={handleChange()}
            startIcon={user}
            fullWidth
            labelTxt="예약자명"
            labelWidth={55}
            placeholder="예약자명을 입력하세요."
            setValidState={setValid()}
            validator={['required']}
            errorMsg={['예약자명을 입력하세요.']}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextValidator
            classes={classes}
            id="revphone"
            valObj={getRevInfo}
            onChange={handleChange()}
            startIcon={phone}
            fullWidth
            labelTxt="예약자 전화번호"
            labelWidth={105}
            placeholder="예약자 전화번호를 입력하세요."
            setValidState={setValid()}
            validator={['required']}
            errorMsg={['예약자 전화번호를 입력하세요.']}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextValidator
            classes={classes}
            id="revemail"
            valObj={getRevInfo}
            onChange={handleChange()}
            startIcon={atSign}
            fullWidth
            labelTxt="예약자 이메일"
            labelWidth={88}
            placeholder="예약자 이메일을 입력하세요."
            setValidState={setValid()}
            validator={['required']}
            errorMsg={['예약자 이메일을 입력하세요.']}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextValidator
            classes={classes}
            id="locphone"
            valObj={getRevInfo}
            onChange={handleChange()}
            startIcon={phone}
            fullWidth
            labelTxt="현지 전화번호"
            labelWidth={88}
            placeholder="현지 전화번호를 입력하세요."
            setValidState={setValid()}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <DatePickerValidator
            classes={classes}
            id="startdt"
            valObj={getRevInfo}
            autoOk
            onChange={handleDateChange('startdt', false)}
            labelTxt="시작일"
            startIcon={icEvent}
            fullWidth
            placeholder="시작일을 선택하세요."
            setValidState={setValid()}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <DatePickerValidator
            classes={classes}
            id="enddt"
            valObj={getRevInfo}
            autoOk
            onChange={handleDateChange('enddt', false)}
            labelTxt="종료일"
            startIcon={icEvent}
            fullWidth
            placeholder="종료일을 선택하세요."
            setValidState={setValid()}
          />
        </Grid>
        <Grid item xs={12}>
          <CheckboxValidator
            id="pickupyn"
            valObj={getRevInfo}
            onChange={handleChange()}
            color="primary"
            val="Y"
            label="픽드랍 유무"
          />
          <CheckboxValidator
            id="stayyn"
            valObj={getRevInfo}
            onChange={handleChange()}
            color="primary"
            val="Y"
            label="숙박 유무"
          />
        </Grid>
      </Grid>

      {getRevInfo.pickupyn === 'Y' && (
      <Grid container alignItems="center" className={classes.revInfoWrap} spacing={2}>
        <Grid item xs={12} md={6} lg={3}>
          <TextValidator
            classes={classes}
            id="pickuploc"
            valObj={getRevInfo}
            onChange={handleChange()}
            startIcon={icLocalCarWash}
            fullWidth
            labelTxt="픽업 위치"
            labelWidth={70}
            placeholder="픽업위치를 입력하세요."
            setValidState={setValid()}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <DatetimePickerValidator
            classes={classes}
            id="pickupdt"
            valObj={getRevInfo}
            autoOk
            onChange={handleDateChange('pickupdt', true)}
            labelTxt="픽업 일시"
            startIcon={icEvent}
            fullWidth
            placeholder="픽업 일시를 선택하세요."
            setValidState={setValid()}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextValidator
            classes={classes}
            id="droploc"
            valObj={getRevInfo}
            onChange={handleChange()}
            startIcon={icLocalCarWash}
            fullWidth
            labelTxt="드랍 위치"
            labelWidth={70}
            placeholder="드랍 위치를 입력하세요."
            setValidState={setValid()}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <DatetimePickerValidator
            classes={classes}
            id="dropdt"
            valObj={getRevInfo}
            autoOk
            onChange={handleDateChange('dropdt', true)}
            labelTxt="드랍 일시"
            startIcon={icEvent}
            fullWidth
            placeholder="드랍 일시를 선택하세요."
            setValidState={setValid()}
          />
        </Grid>
      </Grid>
      )}

      <Grid container alignItems="center" className={classes.revInfoWrap} spacing={2}>
        <Grid item xs={12}>
          <CustomCKEditor
            id="cont"
            attach={attach}
            data={getRevInfo}
            onChange={onChange}
            config={{
              height: 250,
            }}
            imgview
            attachEditorList={[]}
          />
        </Grid>
      </Grid>
    </form>
  );
});

export default RevInfoCo;
