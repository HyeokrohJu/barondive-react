import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Icon } from 'react-icons-kit';
import { userCheck } from 'react-icons-kit/feather/userCheck';
import { lock } from 'react-icons-kit/feather/lock';
import { user } from 'react-icons-kit/feather/user';
import { atSign } from 'react-icons-kit/feather/atSign';
import { phone } from 'react-icons-kit/feather/phone';
import { userPlus } from 'react-icons-kit/feather/userPlus';
import { list } from 'react-icons-kit/feather/list';

import {
  TextValidator, RadioValidator,
} from '~/common/components';
import Button from '~/material-kit/CustomButtons/Button';
import { parseQuery, stringQuery } from '~/common/utils';

import memberGetStyle from '../styles/memberGetStyle';

@withStyles(memberGetStyle)
@withRouter
@inject((stores) => ({
  menu: stores.menuStore,
  member: stores.memberStore,
}))
@observer
class MemberGet extends React.Component {
  componentDidMount() {
    const { member, history } = this.props;
    const qparams = parseQuery(history.location.search);
    member.apiMemberInfo({
      userid: qparams.userid,
    });
  }

  handleChange = (event) => {
    const { member } = this.props;
    member.setMemberInfoByKey([event.target.id || event.target.name], event.target.value);
  }

  setValid = (key, val) => {
    const { member } = this.props;
    member.setJoinValidateByKey(key, val ? 'success' : 'error');

    const errorList = Object.keys(member.getJoinValidate).filter(
      (fkey) => member.getJoinValidate[fkey] === 'error' || !member.getJoinValidate[fkey],
    );
    member.setSubmitFlag(errorList.length > 0);
  }

  updSubmit = async () => {
    const { history, member: { getMemberInfo, setSubmitFlag } } = this.props;

    const memberInfo = await this.props.member.apiMemberUpd(getMemberInfo);

    if (memberInfo.userid) {
      setSubmitFlag(true);
      history.replace(`${history.location.pathname}${history.location.search}`);
    } else {
      console.error('회원수정 실패');
    }
  }

  pageChangeList = () => {
    const { history } = this.props;
    const qparams = parseQuery(history.location.search);
    delete qparams.memberid;
    history.push(`${history.location.pathname.replace('memberGet', 'memberList')}?${stringQuery(qparams)}`);
  }

  render() {
    const { member, classes } = this.props;
    const { getMemberInfo } = member;
    return (
      <div className={classes.joinWrap}>
        <form className={classes.joinFormWrap}>
          <Grid container justify="center" alignItems="center" spacing={2}>
            <Grid item xs={12}>
              <TextValidator
                classes={classes}
                id="loginid"
                valObj={getMemberInfo}
                startIcon={userCheck}
                fullWidth
                labelTxt="ID"
                labelWidth={16}
                placeholder="ID를 입력하세요."
                validator={['required', 'asyncIdDiff']}
                errorMsg={['ID를 입력하세요.', '아이디가 중복됩니다.']}
                setValidState={this.setValid}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                classes={classes}
                id="passwd"
                type="password"
                valObj={getMemberInfo}
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
                valObj={getMemberInfo}
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
                valObj={getMemberInfo}
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
                valObj={getMemberInfo}
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
                valObj={getMemberInfo}
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
              <RadioValidator
                id="roleid"
                valObj={getMemberInfo}
                onChange={this.handleChange}
                radioList={[{
                  key: '1',
                  value: '1',
                  color: 'primary',
                  label: '관리자',
                }, {
                  key: '2',
                  value: '2',
                  color: 'primary',
                  label: '일반사용자',
                }]}
                validator={['required']}
                errorMsg={['권한을 선택하세요.']}
                setValidState={this.setValid}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                color="primary"
                disabled={false}
                onClick={this.pageChangeList}
              >
                <Icon icon={list} /> 목록
              </Button>
              <Button
                className={classes.loginBtn}
                color="info"
                disabled={member.isSubmitFlag}
                onClick={this.updSubmit}
              >
                <Icon icon={userPlus} className={classes.btnIcon} /> 회원정보 수정
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

export default MemberGet;
