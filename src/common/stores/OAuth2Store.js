import {
  observable, action, configure, computed, toJS,
} from 'mobx';
import { asyncAction } from 'mobx-utils';

import axios from 'axios';
import queryString from 'query-string';
import { ApiConst } from '~/common/constants';
import { addToken, removeToken } from '~/common/utils';

configure({ enforceActions: 'observed' });

class OAuth2Store {
  constructor() {
    this.oAuthHeader = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
  }

  @observable jwtInfo = {};

  @observable loginInfo = {
    username: '',
    password: '',
    idsave: 'N',
  };

  @observable loginValidate = {};

  @observable submitFlag = true;

  @action setJwtInfo = (jwtInfo) => { this.jwtInfo = jwtInfo; }

  @action setLoginInfo = (loginInfo) => { this.loginInfo = loginInfo; }

  @action setLoginInfoByKey = (key, val) => { this.loginInfo[key] = val; }

  @action setLoginValidate = (loginValidate) => { this.loginValidate = loginValidate; }

  @action setLoginValidateByKey = (key, val) => { this.loginValidate[key] = val; }

  @action setSubmitFlag = (submitFlag) => { this.submitFlag = submitFlag; }

  @action setLogout = () => {
    removeToken();
    this.jwtInfo = {};
  }

  @computed get getJwtInfo() {
    return toJS(this.jwtInfo);
  }

  @computed get getLoginInfo() {
    return this.loginInfo;
  }

  @computed get getLoginValidate() {
    return this.loginValidate;
  }

  @computed get isSubmitFlag() {
    return toJS(this.submitFlag);
  }

  @asyncAction
  async* apiOAuth2Jwt(params) {
    const param = {
      grant_type: ApiConst.OAuth.GRANT_TYPE,
      client_id: ApiConst.OAuth.CLIENT_ID,
      scope: ApiConst.OAuth.SCOPE,
      hrschema: ApiConst.OAuth.HRSCHEMA,
      hrifschema: ApiConst.OAuth.HRIFSCHEMA,
      hrtimezone: ApiConst.OAuth.HRTIMEZONE,
      ...params,
    };

    const apiData = yield axios({
      method: 'post',
      url: ApiConst.OAUTH_URI,
      headers: this.oAuthHeader,
      data: queryString.stringify(param),
      auth: {
        username: ApiConst.OAuth.CLIENT_ID,
        password: ApiConst.OAuth.CLIENT_SECRET,
      },
    }).then((data) => data, () => ({}));

    const { data } = apiData;
    if (data) {
      addToken(data);
      this.setJwtInfo(data);

      this.setLoginInfo({
        username: '',
        password: '',
        idsave: 'N',
      });
    }
    return data || {};
  }
}

export default OAuth2Store;
