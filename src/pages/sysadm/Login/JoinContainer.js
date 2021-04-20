import React from 'react';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Icon } from 'react-icons-kit';
import { userCheck } from 'react-icons-kit/feather/userCheck';
import { lock } from 'react-icons-kit/feather/lock';
import { user } from 'react-icons-kit/feather/user';
import { atSign } from 'react-icons-kit/feather/atSign';
import { phone } from 'react-icons-kit/feather/phone';
import { userPlus } from 'react-icons-kit/feather/userPlus';

import Button from '~/material-kit/CustomButtons/Button';
import {
  TextValidator, addValidatorRule, removeValidatorRule, RadioValidator,
} from '~/common/components';

import joinStyle from './styles/joinStyle';

@inject((stores) => ({
  member: stores.memberStore,
}))
@withStyles(joinStyle)
@observer
class Join extends React.Component {
  constructor(props) {
    super(props);
    this.validateTxt = {
      loginid: 'ID를 입력하세요.',
      passwd: 'PASSWORD를 입력하세요.',
      usernm: '이름을 입력하세요.',
      email: '이메일을 입력하세요.',
      mphone: '휴대전화번호를 입력하세요.',
      sex: '성별을 선택하세요.',
    };
  }

  componentDidMount() {
    const { member } = this.props;
    member.setJoinValidate({
      loginid: '',
      passwd: '',
      usernm: '',
      email: '',
      mphone: '',
      sex: '',
    });

    addValidatorRule('asyncIdDiff', async (value) => {
      if (value.length > 1) {
        const memberInfo = await member.apiMemberInfo({
          loginid: value,
        });

        if (memberInfo.loginid) {
          return false;
        }
      }
      return true;
    });
  }

  componentWillUnmount() {
    removeValidatorRule('asyncIdDiff');
  }

  handleChange = (event) => {
    const { member } = this.props;
    member.setJoinInfoByKey([event.target.id || event.target.name], event.target.value);
  }

  setValid = (key, val) => {
    const { member } = this.props;
    member.setJoinValidateByKey(key, val ? 'success' : 'error');

    const errorList = Object.keys(member.getJoinValidate).filter(
      (fkey) => member.getJoinValidate[fkey] === 'error' || !member.getJoinValidate[fkey],
    );
    member.setSubmitFlag(errorList.length > 0);
  }

  joinSubmit = async () => {
    const { history, member: { getJoinInfo } } = this.props;

    const memberInfo = await this.props.member.apiMemberIns(getJoinInfo);

    if (memberInfo.userid) {
      history.push('/login');
    } else {
      console.error('회원가입 실패');
    }
  }

  render() {
    const { member, classes } = this.props;
    const { getJoinInfo } = member;
    return (
      <div className={classes.joinWrap}>
        <form className={classes.joinFormWrap}>
          <h2 className={classes.topTitle}>회원가입</h2>
          <Grid container justify="center" alignItems="center" spacing={2}>
            <Grid item xs={12}>
              <TextValidator
                classes={classes}
                id="loginid"
                valObj={getJoinInfo}
                onChange={this.handleChange}
                startIcon={userCheck}
                fullWidth
                labelTxt="ID"
                labelWidth={16}
                placeholder="ID를 입력하세요."
                validator={['required', 'asyncIdDiff']}
                errorMsg={['ID를 입력하세요.', '아이디가 중복됩니다.']}
                setValidState={this.setValid}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                classes={classes}
                id="passwd"
                type="password"
                valObj={getJoinInfo}
                onChange={this.handleChange}
                startIcon={lock}
                fullWidth
                labelTxt="PASSWORD"
                labelWidth={90}
                placeholder="PASSWORD를 입력하세요."
                validator={['required']}
                errorMsg={['PASSWORD를 입력하세요.']}
                setValidState={this.setValid}
              />
            </Grid>
            <Grid item xs={6}>
              <TextValidator
                classes={classes}
                id="usernm"
                valObj={getJoinInfo}
                onChange={this.handleChange}
                startIcon={user}
                fullWidth
                labelTxt="이름"
                labelWidth={32}
                placeholder="이름을 입력하세요."
                validator={['required']}
                errorMsg={['이름을 입력하세요.']}
                setValidState={this.setValid}
              />
            </Grid>
            <Grid item xs={6}>
              <RadioValidator
                id="sex"
                valObj={getJoinInfo}
                onChange={this.handleChange}
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
                validator={['required']}
                errorMsg={['성별을 선택하세요.']}
                setValidState={this.setValid}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                classes={classes}
                id="email"
                valObj={getJoinInfo}
                onChange={this.handleChange}
                startIcon={atSign}
                fullWidth
                labelTxt="Email"
                labelWidth={45}
                placeholder="Email을 입력하세요."
                validator={['required', 'isEmail']}
                errorMsg={['Email을 입력하세요.', 'Email형식에 맞게 입력하세요.']}
                setValidState={this.setValid}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                classes={classes}
                id="mphone"
                valObj={getJoinInfo}
                onChange={this.handleChange}
                startIcon={phone}
                fullWidth
                labelTxt="휴대전화"
                labelWidth={60}
                placeholder="휴대전화번호를 입력하세요."
                validator={['required', 'isPhone']}
                errorMsg={['휴대전화번호를 입력하세요.', '휴대전화번호 형식에 맞게 입력하세요.']}
                setValidState={this.setValid}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                className={classes.loginBtn}
                color="primary"
                disabled={member.isSubmitFlag}
                onClick={this.joinSubmit}
              >
                <Icon icon={userPlus} className={classes.btnIcon} /> 회원가입
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

export default Join;
