import {
  observable, action, configure, computed, toJS,
} from 'mobx';
import { asyncAction } from 'mobx-utils';
import { ReactConst } from '~/common/constants';

configure({ enforceActions: 'observed' });

class AttachStore {
  constructor(store) {
    this.store = store;
    this.prefixPath = '/attach';
    this.reactConst = ReactConst;
  }

  @observable attachState = false;

  @observable attachParam = {};

  @observable attachInfo = {};

  @observable attachList = [];

  @observable attachEditorList = [];

  @observable attachEditorInfo = [];

  @action setAttachParam = (attachParam) => { this.attachParam = attachParam; }

  @action setAttachInfo = (attachInfo) => { this.attachInfo = attachInfo; }

  @action setAttachList = (attachList) => { this.attachList = attachList; }

  @action setAttachEditorList = (attachEditorList) => { this.attachEditorList = attachEditorList; }

  @action setAttachEditorInfo = (attachEditorInfo) => { this.attachEditorInfo = attachEditorInfo; }

  @computed get getAttachParam() {
    return toJS(this.attachParam);
  }

  @computed get getAttachInfo() {
    return toJS(this.attachInfo);
  }

  @computed get getAttachList() {
    return toJS(this.attachList);
  }

  @computed get getAttachEditorList() {
    return toJS(this.attachEditorList);
  }

  @computed get getAttachEditorInfo() {
    return toJS(this.attachEditorInfo);
  }

  @computed get isAttachState() {
    return toJS(this.attachState);
  }

  @action
  fileUploadRequest = (evt) => {
    const { fileLoader } = evt.data;
    const formData = new FormData();
    const { xhr } = fileLoader;

    formData.append('file', fileLoader.file, fileLoader.fileName);
    Object.keys(this.attachInfo).forEach((key) => {
      formData.append(key, this.attachInfo[key]);
    });
    xhr.open('POST', fileLoader.uploadUrl, true);
    xhr.send(formData);
    evt.stop();
  };

  @action
  fileUploadResponse = (evt) => {
    evt.stop();
    const { data } = evt;
    const jsonStr = evt.data.fileLoader.xhr.responseText;
    const resJson = JSON.parse(jsonStr);
    const { resMap } = resJson;
    if (resMap) {
      data.uploaded = 1;
      data.fileName = resMap.filenm;
      data.url = resMap.fileurl;

      this.setAttachEditorInfo(resMap);
      this.setAttachEditorList(this.getAttachEditorList.concat([resMap]));
    }
  }

  @asyncAction
  async* apiAttachList(params) {
    const { apiStore: { getAxios } } = this.store;
    const apiData = yield getAxios().get(`${this.prefixPath}/selectAttachPg`, {
      params,
    });

    const { resMap } = apiData.data;
    if (resMap) {
      if (params.editoryn === 'Y') {
        this.setAttachEditorList(resMap.selectAttachPg);
      } else {
        const newAttachList = resMap.selectAttachPg.map((item) => {
          const nwitem = {
            ...item,
            id: item.attachid,
            name: item.filenm,
            origSize: item.filesize,
            percent: '100',
            priority: '',
            processedTimestamp: '',
            retries: '',
            size: item.filesize,
            startedTimestamp: '',
            state: '1',
            type: item.filetype,
            uid: item.attachid,
            uploaded: true,
          };

          return nwitem;
        });
        this.setAttachList(newAttachList);
      }
    }
  }

  @asyncAction
  async* apiAttachDelt(params) {
    const { apiStore: { getAxios } } = this.store;
    this.attachState = false;
    const apiData = yield getAxios().delete(`${this.prefixPath}/deleteAttach`, {
      params,
    });

    const { resMap } = apiData.data;
    if (resMap) {
      this.attachState = true;

      this.setAttachList(this.getAttachList.map((item) => item.attachid !== params.attachid && item));
    }
  }
}

export default AttachStore;
