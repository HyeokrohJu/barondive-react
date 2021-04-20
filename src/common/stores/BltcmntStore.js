import {
  observable, action, configure, computed, toJS,
} from 'mobx';
import { asyncAction } from 'mobx-utils';
import { ReactConst } from '~/common/constants';

configure({ enforceActions: 'observed' });

class BltcmntStore {
  constructor(store) {
    this.store = store;
    this.prefixPath = '/bltcmnt';
    this.reactConst = ReactConst;
  }

  @observable bltcmntList = new Map();

  @observable submitFlag = true;

  @observable bltcmntState = false;

  @observable bltcmntValidate = {};

  @observable cmntReplyId = '';

  @observable cmntModId = '';

  @action setBltcmntList = (key, bltcmntList) => {
    this.bltcmntList.set(key, bltcmntList);
  }

  @action setSubmitFlag = (submitFlag) => { this.submitFlag = submitFlag; }

  @action setBltcmntValidate = (bltcmntValidate) => { this.bltcmntValidate = bltcmntValidate; }

  @action setBltcmntValidateByKey = (key, val) => { this.bltcmntValidate[key] = val; }

  @action setCmntReplyId = (cmntReplyId) => { this.cmntReplyId = cmntReplyId; }

  @action setCmntModId = (cmntModId) => { this.cmntModId = cmntModId; }

  @computed get getBltcmntList() {
    return this.bltcmntList;
  }

  @computed get isBltcmntState() {
    return toJS(this.bltcmntState);
  }

  @computed get isSubmitFlag() {
    return toJS(this.submitFlag);
  }

  @computed get getBltcmntValidate() {
    return this.bltcmntValidate;
  }

  @computed get getCmntReplyId() {
    return this.cmntReplyId;
  }

  @computed get getCmntModId() {
    return this.cmntModId;
  }

  @asyncAction
  async* apiBltcmntList(params) {
    const { apiStore: { getAxios } } = this.store;
    const apiData = yield getAxios().get(`${this.prefixPath}/selectBltcmntPg`, {
      params,
    });

    const { resMap } = apiData.data;
    if (resMap) {
      const { selectBltcmntCnt } = resMap;
      const maxpage = Math.floor(selectBltcmntCnt.cnt / params.itemsPerPage) + (selectBltcmntCnt.cnt % params.itemsPerPage === 0 ? 0 : 1);
      Object.assign(selectBltcmntCnt, {
        ...selectBltcmntCnt,
        maxpage,
      });
      resMap.selectBltcmntCnt = selectBltcmntCnt;
      console.log(params.brdid, resMap);
      this.setBltcmntList(params.brdid, resMap);
    }
  }

  @asyncAction
  async* apiBltcmntIns(params) {
    const { apiStore: { getAxios } } = this.store;
    this.bltcmntState = false;
    const apiData = yield getAxios(true).post(`${this.prefixPath}/insertBltcmnt`, {
      ...params,
    });

    const { resMap } = apiData.data;
    if (resMap) {
      this.bltcmntState = true;
    }
  }

  @asyncAction
  async* apiBltcmntUpd(params) {
    const { apiStore: { getAxios } } = this.store;
    this.bltcmntState = false;
    const apiData = yield getAxios(true).put(`${this.prefixPath}/updateBltcmnt`, {
      ...params,
    });

    const { resMap } = apiData.data;
    if (resMap) {
      this.bltcmntState = true;
    }
  }

  @asyncAction
  async* apiBltcmntDel(params) {
    const { apiStore: { getAxios } } = this.store;
    this.bltcmntState = false;
    const apiData = yield getAxios(true).delete(`${this.prefixPath}/deleteBltcmnt`, {
      params,
    });

    const { resMap } = apiData.data;
    if (resMap) {
      this.bltcmntState = true;
    }
  }
}

export default BltcmntStore;
