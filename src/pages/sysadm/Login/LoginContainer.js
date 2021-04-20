/* eslint-disable no-console */
import React from 'react';
import classNames from 'classnames';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { Icon } from 'react-icons-kit';
import { userCheck } from 'react-icons-kit/feather/userCheck';
import { lock } from 'react-icons-kit/feather/lock';
import { logIn } from 'react-icons-kit/feather/logIn';

import Button from '~/material-kit/CustomButtons/Button';
import {
  parseQuery, getLocStorage, setLocStorage, removeLocStorage,
} from '~/common/utils';
import { TextValidator, CheckboxValidator } from '~/common/components';

import loginStyle from './styles/loginStyle';

@inject((stores) => ({
  oAuth2: stores.oAuth2Store,
}))
@withStyles(loginStyle)
@observer
class Login extends React.Component {
  componentDidMount() {
    const { oAuth2 } = this.props;

    if (getLocStorage('_ID_SAVE_')) {
      oAuth2.setLoginInfo({
        ...oAuth2.getLoginInfo,
        username: getLocStorage('_ID_SAVE_'),
        idsave: 'Y',
      });

      oAuth2.setLoginValidate({
        username: 'success',
        password: '',
      });
    } else {
      oAuth2.setLoginValidate({
        username: '',
        password: '',
      });
    }
  }

  handleChange = (event) => {
    const { oAuth2 } = this.props;
    const okey = event.target.id;
    let val = event.target.value;
    if (event.target.type === 'checkbox') {
      val = event.target.checked ? event.target.value : 'N';
    }
    oAuth2.setLoginInfoByKey(okey, val);
  }

  setValid = (key, val) => {
    const { oAuth2 } = this.props;
    oAuth2.setLoginValidateByKey(key, val ? 'success' : 'error');

    const errorList = Object.keys(oAuth2.getLoginValidate).filter(
      (fkey) => oAuth2.getLoginValidate[fkey] === 'error' || !oAuth2.getLoginValidate[fkey],
    );
    oAuth2.setSubmitFlag(errorList.length > 0);
  }

  loginSubmit = async () => {
    const { history, oAuth2: { getLoginInfo } } = this.props;

    if (getLoginInfo.idsave === 'Y') {
      setLocStorage('_ID_SAVE_', getLoginInfo.username);
    } else {
      removeLocStorage('_ID_SAVE_');
    }

    const jwtInfo = await this.props.oAuth2.apiOAuth2Jwt({
      username: getLoginInfo.username,
      password: getLoginInfo.password,
    });

    if (jwtInfo.access_token) {
      const locSearch = parseQuery(history.location.search);

      if (locSearch.returnUrl) {
        const path = locSearch.returnUrl.indexOf('?') > -1 ? locSearch.returnUrl.substring(0, locSearch.returnUrl.indexOf('?')) : locSearch.returnUrl;
        const search = parseQuery(locSearch.returnUrl.substring(locSearch.returnUrl.indexOf('?') + 1));
        const rmLocSearch = Object.keys(locSearch).reduce((obj, key) => {
          const nwObj = obj;
          if (key !== 'returnUrl') {
            nwObj[key] = locSearch[key];
          }
          return nwObj;
        }, {});

        const retSearch = {
          ...search,
          ...rmLocSearch,
        };

        history.push({
          pathname: path,
          search: queryString.stringify(retSearch),
        });
      } else {
        history.push('/');
      }
    } else {
      alert('아이디와 패스워드를 다시 확인하시기 바랍니다.');

      this.props.oAuth2.setLoginInfo({
        username: '',
        password: '',
        idsave: 'N',
      });
      console.error('로그인 실패');
    }
  }

  render() {
    const { oAuth2, classes } = this.props;
    const { getLoginInfo } = oAuth2;
    return (
      <div className={classes.loginWrap}>
        <form className={classes.loginFormWrap}>
          <h2 className={classes.topTitle}>LOGIN</h2>
          <Grid container justify="center" alignItems="center" spacing={2}>
            <Grid item xs={12}>
              <TextValidator
                classes={classes}
                id="username"
                valObj={getLoginInfo}
                onChange={this.handleChange}
                startIcon={userCheck}
                fullWidth
                labelTxt="ID"
                labelWidth={16}
                placeholder="ID를 입력하세요."
                validator={['required']}
                errorMsg={['ID를 입력하세요.']}
                setValidState={this.setValid}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                classes={classes}
                id="password"
                type="password"
                valObj={getLoginInfo}
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
            <Grid item xs={12}>
              <CheckboxValidator
                id="idsave"
                valObj={getLoginInfo}
                onChange={this.handleChange}
                color="primary"
                val="Y"
                label="아이디저장"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                className={classes.loginBtn}
                color="primary"
                disabled={oAuth2.isSubmitFlag}
                onClick={this.loginSubmit}
              >
                <Icon icon={logIn} className={classes.btnIcon} /> 로그인
              </Button>
            </Grid>
            <Grid item xs={12} className={classes.gridCenter}>
              <Link to="/" className={classNames(classes.linkTxt, 'rightbar')}>아이디 찾기</Link>
              <Link to="/" className={classNames(classes.linkTxt, 'rightbar')}>비밀번호 찾기</Link>
              <Link to="/join" className={classes.linkTxt}>회원가입</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

export default Login;
