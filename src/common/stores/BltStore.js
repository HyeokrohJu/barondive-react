import {
  observable, action, configure, computed, toJS,
} from 'mobx';
import { asyncAction } from 'mobx-utils';
import { ReactConst } from '~/common/constants';

configure({ enforceActions: 'observed' });

class BltStore {
  constructor(store) {
    this.store = store;
    this.prefixPath = '/blt';
    this.reactConst = ReactConst;
  }

  @observable bltList = new Map();

  @observable bltInfo = {};

  @observable bltContent = '';

  @observable submitFlag = true;

  @observable bltState = false;

  @observable bltValidate = {};

  @observable searchObj = {};

  @action setBltList = (key, bltList) => {
    this.bltList.set(key, bltList);
  }

  @action setBltInfo = (bltInfo) => { this.bltInfo = bltInfo; }

  @action setBltInfoByKey = (key, val) => { this.bltInfo[key] = val; }

  @action setBltContent = (bltContent) => { this.bltContent = bltContent; }

  @action setSubmitFlag = (submitFlag) => { this.submitFlag = submitFlag; }

  @action setBltValidate = (bltValidate) => { this.bltValidate = bltValidate; }

  @action setBltValidateByKey = (key, val) => { this.bltValidate[key] = val; }

  @action setSearchObj = (searchObj) => { console.log(searchObj); this.searchObj = searchObj; }

  @action setSearchObjByKey = (key, val) => { this.searchObj[key] = val; }

  @computed get getBltList() {
    return this.bltList;
  }

  @computed get getBltInfo() {
    return this.bltInfo;
  }

  @computed get getBltContent() {
    return toJS(this.bltContent);
  }

  @computed get isBltState() {
    return toJS(this.bltState);
  }

  @computed get isSubmitFlag() {
    return toJS(this.submitFlag);
  }

  @computed get getBltValidate() {
    return this.bltValidate;
  }

  @computed get getSearchObj() {
    return this.searchObj;
  }

  @asyncAction
  async* apiBltList(params) {
    const { apiStore: { getAxios } } = this.store;
    const apiData = yield getAxios().get(`${this.prefixPath}/selectBltPg`, {
      params,
    });

    const { resMap } = apiData.data;
    if (resMap) {
      const { selectBltCnt } = resMap;
      const maxpage = Math.floor(selectBltCnt.cnt / params.itemsPerPage) + (selectBltCnt.cnt % params.itemsPerPage === 0 ? 0 : 1);
      Object.assign(selectBltCnt, {
        ...selectBltCnt,
        maxpage,
      });
      resMap.selectBltCnt = selectBltCnt;
      this.setBltList(params.brdid, resMap);
    }
  }

  @asyncAction
  async* apiBltInfo(params) {
    const { apiStore: { getAxios } } = this.store;
    const apiData = yield getAxios().get(`${this.prefixPath}/getBlt`, {
      params,
    });

    const { resMap } = apiData.data;
    if (resMap) {
      this.setBltInfo(resMap.getBlt);
    }
  }

  @asyncAction
  async* apiBltIns(params) {
    const { apiStore: { getAxios } } = this.store;
    this.bltState = false;
    const apiData = yield getAxios(true).post(`${this.prefixPath}/insertBlt`, {
      ...params,
    });

    const { resMap } = apiData.data;
    if (resMap) {
      this.bltState = true;
    }
  }

  @asyncAction
  async* apiBltUpd(params) {
    const { apiStore: { getAxios } } = this.store;
    this.bltState = false;
    const apiData = yield getAxios(true).put(`${this.prefixPath}/updateBlt`, {
      ...params,
    });

    const { resMap } = apiData.data;
    if (resMap) {
      this.bltState = true;
    }
  }

  @asyncAction
  async* apiBltDel(params) {
    const { apiStore: { getAxios } } = this.store;
    this.bltState = false;
    const apiData = yield getAxios(true).delete(`${this.prefixPath}/deleteBlt`, {
      params,
    });

    const { resMap } = apiData.data;
    if (resMap) {
      this.bltState = true;
    }
  }

  @asyncAction
  async* apiCntBltUpd(params) {
    const { apiStore: { getAxios } } = this.store;
    this.bltState = false;
    const apiData = yield getAxios().put(`${this.prefixPath}/updateCntBlt`, {
      ...params,
    });

    const { resMap } = apiData.data;
    if (resMap) {
      this.bltState = true;
    }
  }
}

export default BltStore;
