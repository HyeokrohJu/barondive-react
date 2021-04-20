import {
  observable, action, configure, computed, toJS,
} from 'mobx';
import { asyncAction } from 'mobx-utils';

import { ReactConst } from '~/common/constants';

configure({ enforceActions: 'observed' });

class KakaoStore {
  constructor(store) {
    this.store = store;
    this.prefixPath = '/kakao';
    this.reactConst = ReactConst;
  }

    @observable kakaoState = false;

    @observable kakaotokenInfo = {};

    @action setKakaotokenInfo = (kakaotokenInfo) => { this.kakaotokenInfo = kakaotokenInfo; }

    @action setKakaotokenInfoByKey = (key, val) => { this.kakaotokenInfo[key] = val; }

    @computed get getKakaotokenInfo() {
      return toJS(this.kakaotokenInfo);
    }

    @computed get isKakaoState() {
      return toJS(this.kakaoState);
    }

    @asyncAction
    async* apiKakaotokenInfo(params) {
      const { apiStore: { getAxios } } = this.store;
      const apiData = yield getAxios().get(`${this.prefixPath}/getKakaotoekn`, {
        params,
      });
      const { resMap } = apiData.data;
      if (resMap) {
        this.setKakaotokenInfo(resMap.getKakaotoken);
      } else {
        this.setKakaotokenInfo({});
      }
    }

    @asyncAction
    async* apiKakaotokenIns(params) {
      const { apiStore: { getAxios } } = this.store;
      this.kakaoState = false;
      const apiData = yield getAxios(true).post(`${this.prefixPath}/insertKakaotoken`, {
        ...params,
      });

      const { resMap } = apiData.data;
      if (resMap) {
        this.kakaoState = true;
        return resMap.getKakaotoken;
      }
      return '';
    }
}

export default KakaoStore;
