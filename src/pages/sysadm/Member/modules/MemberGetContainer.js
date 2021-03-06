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
      console.error('???????????? ??????');
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
                placeholder="ID??? ???????????????."
                validator={['required', 'asyncIdDiff']}
                errorMsg={['ID??? ???????????????.', '???????????? ???????????????.']}
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
                placeholder="PASSWORD??? ???????????????."
                validator={['required']}
                errorMsg={['PASSWORD??? ???????????????.']}
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
                labelTxt="??????"
                labelWidth={32}
                placeholder="????????? ???????????????."
                validator={['required']}
                errorMsg={['????????? ???????????????.']}
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
                  label: '??????',
                }, {
                  key: 'F',
                  value: 'F',
                  color: 'primary',
                  label: '??????',
                }]}
                validator={['required']}
                errorMsg={['????????? ???????????????.']}
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
                placeholder="Email??? ???????????????."
                validator={['required', 'isEmail']}
                errorMsg={['Email??? ???????????????.', 'Email????????? ?????? ???????????????.']}
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
                labelTxt="????????????"
                labelWidth={60}
                placeholder="????????????????????? ???????????????."
                validator={['required', 'isPhone']}
                errorMsg={['????????????????????? ???????????????.', '?????????????????? ????????? ?????? ???????????????.']}
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
                  label: '?????????',
                }, {
                  key: '2',
                  value: '2',
                  color: 'primary',
                  label: '???????????????',
                }]}
                validator={['required']}
                errorMsg={['????????? ???????????????.']}
                setValidState={this.setValid}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                color="primary"
                disabled={false}
                onClick={this.pageChangeList}
              >
                <Icon icon={list} /> ??????
              </Button>
              <Button
                className={classes.loginBtn}
                color="info"
                disabled={member.isSubmitFlag}
                onClick={this.updSubmit}
              >
                <Icon icon={userPlus} className={classes.btnIcon} /> ???????????? ??????
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

export default MemberGet;
