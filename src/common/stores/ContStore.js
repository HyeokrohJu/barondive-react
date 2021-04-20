import {
  observable, action, configure, computed, toJS,
} from 'mobx';
import { asyncAction } from 'mobx-utils';

import { ReactConst } from '~/common/constants';

configure({ enforceActions: 'observed' });

class ContStore {
  constructor(store) {
    this.store = store;
    this.prefixPath = '/cont';
    this.reactConst = ReactConst;
  }

  @observable contState = false;

  @observable contList = new Map();

  @observable contInfo = {};

  @action setContList = (key, contList) => {
    this.contList.set(key, contList);
  }

  @action setContInfo = (contInfo) => { this.contInfo = contInfo; }

  @action setContInfoByKey = (key, val) => { this.contInfo[key] = val; }

  @computed get getContList() {
    return this.contList;
  }

  @computed get getContInfo() {
    return toJS(this.contInfo);
  }

  @computed get isContState() {
    return toJS(this.contState);
  }

  @asyncAction
  async* apiContList(params) {
    const { apiStore: { getAxios } } = this.store;
    const apiData = yield getAxios(true).get(`${this.prefixPath}/selectContPg`, {
      params,
    });

    const { resMap } = apiData.data;
    if (resMap) {
      this.setContList(params.menucd, resMap.selectContPg);
    }
  }

  @asyncAction
  async* apiContInfo(params) {
    const { apiStore: { getAxios } } = this.store;
    const apiData = yield getAxios().get(`${this.prefixPath}/getCont`, {
      params,
    });
    const { resMap } = apiData.data;
    if (resMap) {
      if (resMap.getCont.cont) {
        this.setContInfo(resMap.getCont);
      } else {
        this.setContInfo({});
      }
    } else {
      this.setContInfo({});
    }
  }

  @asyncAction
  async* apiContIns(params) {
    const { apiStore: { getAxios } } = this.store;
    this.contState = false;
    const apiData = yield getAxios(true).post(`${this.prefixPath}/insertCont`, {
      ...params,
    });

    const { resMap } = apiData.data;
    if (resMap) {
      this.contState = true;
      return resMap.contid;
    }
    return '';
  }
}

export default ContStore;
