import {
  observable, action, configure, computed, toJS,
} from 'mobx';
import { asyncAction } from 'mobx-utils';

import { ReactConst } from '~/common/constants';

configure({ enforceActions: 'observed' });

class BrdStore {
  constructor(store) {
    this.store = store;
    this.prefixPath = '/brd';
    this.reactConst = ReactConst;
  }

  @observable brdList = [];

  @observable brdInfo = {};

  @observable insBrdInfo = {};

  @observable brdState = false;

  @action setBrdList = (brdList) => { this.brdList = brdList; }

  @action setBrdInfo = (brdInfo) => { this.brdInfo = brdInfo; }

  @action setInsBrdInfo = (insBrdInfo) => { this.insBrdInfo = insBrdInfo; }

  @computed get getBrdList() {
    return toJS(this.brdList);
  }

  @computed get getBrdInfo() {
    return toJS(this.brdInfo);
  }

  @computed get getInsBrdInfo() {
    return toJS(this.insBrdInfo);
  }

  @computed get isBrdState() {
    return toJS(this.brdState);
  }

  @asyncAction
  async* apiBrdList(params) {
    const { apiStore: { getAxios } } = this.store;
    const apiData = yield getAxios().get(`${this.prefixPath}/selectBrdTree`, {
      params,
    });

    const { resMap } = apiData.data;
    if (resMap) {
      this.setBrdList(resMap.selectBrdTree);
    }
  }

  @asyncAction
  async* apiBrdInfo(params) {
    const { apiStore: { getAxios } } = this.store;
    const apiData = yield getAxios().get(`${this.prefixPath}/getBrd`, {
      params,
    });

    const { resMap } = apiData.data;
    if (resMap) {
      this.setBrdInfo(resMap.getBrd);
    }
  }

  @asyncAction
  async* apiBrdIns(params) {
    const { apiStore: { getAxios } } = this.store;
    this.brdState = false;
    const apiData = yield getAxios(true).post(`${this.prefixPath}/insertBrd`, {
      ...params,
    });

    const { resMap } = apiData.data;
    if (resMap) {
      this.brdState = true;
    }
  }
}

export default BrdStore;
