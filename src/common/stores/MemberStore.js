import {
  observable, action, configure, computed, toJS,
} from 'mobx';
import { asyncAction } from 'mobx-utils';
import { ReactConst } from '~/common/constants';

configure({ enforceActions: 'observed' });

class MemberStore {
  constructor(store) {
    this.store = store;
    this.prefixPath = '/member';
    this.reactConst = ReactConst;
  }

  @observable joinInfo = {
    loginid: '',
    passwd: '',
    usernm: '',
    email: '',
    mphone: '',
    sex: '',
    useyn: 'Y',
    roleid: '2',
    state: 'I',
  };

  @observable memberList = {};

  @observable memberInfo = {};

  @observable joinValidate = {};

  @observable memberState = false;

  @observable submitFlag = true;

  @action setMemberList = (memberList) => { this.memberList = memberList; }

  @action setJoinInfo = (joinInfo) => { this.joinInfo = joinInfo; }

  @action setJoinInfoByKey = (key, val) => { this.joinInfo[key] = val; }

  @action setMemberInfo = (memberInfo) => { this.memberInfo = memberInfo; }

  @action setMemberInfoByKey = (key, val) => { this.memberInfo[key] = val; }

  @action setJoinValidate = (joinValidate) => { this.joinValidate = joinValidate; }

  @action setJoinValidateByKey = (key, val) => { this.joinValidate[key] = val; }

  @action setSubmitFlag = (submitFlag) => { this.submitFlag = submitFlag; }

  @computed get getJoinInfo() {
    return this.joinInfo;
  }

  @computed get getMemberInfo() {
    return this.memberInfo;
  }

  @computed get getMemberList() {
    return this.memberList;
  }

  @computed get getJoinValidate() {
    return this.joinValidate;
  }

  @computed get isSubmitFlag() {
    return toJS(this.submitFlag);
  }

  @computed get isMemberState() {
    return toJS(this.memberState);
  }

  @asyncAction
  async* apiMemberInfo(params) {
    const { apiStore: { getAxios } } = this.store;
    const apiData = yield getAxios().get(`${this.prefixPath}/getMember`, {
      params,
    });

    const { resMap } = apiData.data;
    if (resMap) {
      resMap.getMember.passwd = '';
      this.setMemberInfo(resMap.getMember);
    }

    return resMap.getMember;
  }

  @asyncAction
  async* apiMemberIns(params) {
    const { apiStore: { getAxios } } = this.store;
    this.memberState = false;
    const apiData = yield getAxios().post(`${this.prefixPath}/insertMember`, {
      ...params,
    });

    this.setJoinInfo({
      loginid: '',
      passwd: '',
      usernm: '',
      email: '',
      mphone: '',
      sex: '',
      useyn: 'Y',
      roleid: '2',
      state: 'I',
    });

    const { resMap } = apiData.data;
    this.memberState = true;
    return resMap || {};
  }

  @asyncAction
  async* apiMemberUpd(params) {
    const { apiStore: { getAxios } } = this.store;
    this.memberState = false;
    const apiData = yield getAxios(true).put(`${this.prefixPath}/updateMember`, {
      ...params,
    });

    this.setMemberInfoByKey('passwd', '');

    const { resMap } = apiData.data;
    this.memberState = true;
    return resMap || {};
  }

  @asyncAction
  async* apiMemberList(params) {
    const { apiStore: { getAxios } } = this.store;
    const apiData = yield getAxios(true).post(`${this.prefixPath}/selectMemberPg`, {
      ...params,
    });

    const { resMap } = apiData.data;
    if (resMap) {
      const { selectMemberCnt } = resMap;
      const maxpage = Math.floor(selectMemberCnt.cnt / params.itemsPerPage) + (selectMemberCnt.cnt % params.itemsPerPage === 0 ? 0 : 1);
      Object.assign(selectMemberCnt, {
        ...selectMemberCnt,
        maxpage,
      });
      resMap.selectMemberCnt = selectMemberCnt;
      this.setMemberList(resMap);
    }
  }
}

export default MemberStore;
