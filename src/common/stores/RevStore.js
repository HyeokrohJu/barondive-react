import {
  configure, observable, computed, toJS, action,
} from 'mobx';
import { asyncAction } from 'mobx-utils';
import { ReactConst } from '~/common/constants';
import { getUUID } from '~/common/utils';

configure({ enforceActions: 'observed' });

class RevStore {
  constructor(store) {
    this.store = store;
    this.prefixPath = '/rev';
    this.reactConst = ReactConst;
  }

  @observable revState = false;

  @observable revInfo = {
    revid: '',
    startdt: null,
    enddt: null,
    cont: '',
    status: 'RR',
    pickupyn: '',
    stayyn: '',
    revnm: '',
    revphone: '',
    revemail: '',
    pickuploc: '',
    pickupdt: null,
    droploc: '',
    dropdt: null,
    acnum: '',
    locphone: '',
    canceldesc: '',
    usdtotprice: null,
    phptotprice: null,
  };

  @observable revList = new Map();

  @observable revDiver = [{
    revdiverkey: getUUID(),
    revdiverid: '',
    revid: '',
    kornm: '',
    engnm: '',
    flynum: '',
    flystartdt: null,
    flyenddt: null,
    divingstartdt: null,
    divingenddt: null,
    divingtype: '',
    divingcert: '',
    erentalyn: '',
    stature: '',
    weight: '',
    shoessize: '',
    age: '',
    sex: '',
    address: '',
    etcstayyn: '',
    staydesc: '',
  }];

  @observable revInvoice = {};

  @observable revValidate = {};

  @observable submitFlag = true;

  @action setRevList = (key, revList) => {
    this.revList.set(key, revList);
  }

  @action setRevInfo = (revInfo) => { this.revInfo = revInfo; }

  @action setRevInfoByKey = (key, val) => { this.revInfo[key] = val; }

  @action setRevDiver = (revDiver) => { this.revDiver = revDiver; }

  @action setRevDiverByKey = (arr, key, value) => {
    this.revDiver[arr][key] = value;
  }

  @action setRevInvoice = (revInvoice) => { this.revInvoice = revInvoice; }

  @action setRevInvoiceByKey = (key, val) => { this.revInvoice[key] = val; }

  @action setRevValidate = (revValidate) => { this.revValidate = revValidate; }

  @action setRevValidateByKey = (key, val) => { this.revValidate[key] = val; }

  @action setSubmitFlag = (submitFlag) => { this.submitFlag = submitFlag; }

  @computed get getRevInfo() {
    return this.revInfo;
  }

  @computed get getRevList() {
    return this.revList;
  }

  @computed get getRevDiver() {
    return this.revDiver;
  }

  @computed get getRevInvoice() {
    return toJS(this.revInvoice);
  }

  @computed get getRevValidate() {
    return this.revValidate;
  }

  @computed get isSubmitFlag() {
    return toJS(this.submitFlag);
  }

  @asyncAction
  async* apiRevIns(params) {
    const { apiStore: { getAxios } } = this.store;
    this.revState = false;
    const apiData = yield getAxios(true).post(`${this.prefixPath}/insertRev`, {
      ...params,
    });

    const { resMap } = apiData.data;
    if (resMap) {
      this.revState = true;
    }
  }

  @asyncAction
  async* apiRevList(params) {
    const { apiStore: { getAxios } } = this.store;
    const apiData = yield getAxios(true).get(`${this.prefixPath}/selectRevPg`, {
      params,
    });

    const { resMap } = apiData.data;
    if (resMap) {
      const { selectRevCnt } = resMap;
      const maxpage = Math.floor(selectRevCnt.cnt / params.itemsPerPage) + (selectRevCnt.cnt % params.itemsPerPage === 0 ? 0 : 1);
      Object.assign(selectRevCnt, {
        ...selectRevCnt,
        maxpage,
      });
      resMap.selectRevCnt = selectRevCnt;
      this.setRevList(params.creid || 'ADM', resMap);
    }
  }

  @asyncAction
  async* apiRevInfo(params) {
    const { apiStore: { getAxios } } = this.store;
    const apiData = yield getAxios(true).get(`${this.prefixPath}/getRev`, {
      params,
    });

    const { resMap } = apiData.data;
    if (resMap) {
      resMap.getRevDiver.map((item) => {
        const nwitem = item;
        nwitem.revdiverkey = item.revdiverid;
        return nwitem;
      });
      this.setRevInfo(resMap.getRev);
      this.setRevDiver(resMap.getRevDiver);
      this.setRevInvoice(resMap.getRevInvoice);
    }
  }

  @asyncAction
  async* apiRevUpd(params) {
    const { apiStore: { getAxios } } = this.store;
    this.revState = false;
    const apiData = yield getAxios(true).put(`${this.prefixPath}/updateRev`, {
      ...params,
    });

    const { resMap } = apiData.data;
    if (resMap) {
      this.revState = true;
    }
  }
}

export default RevStore;
