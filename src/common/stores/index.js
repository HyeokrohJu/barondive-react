import ApiStore from './ApiStore';
import MenuStore from './MenuStore';
import BltStore from './BltStore';
import BrdStore from './BrdStore';
import AttachStore from './AttachStore';
import ContStore from './ContStore';
import OAuth2Store from './OAuth2Store';
import RevStore from './RevStore';
import MemberStore from './MemberStore';
import BltcmntStore from './BltcmntStore';
import KakaoStore from './KakaoStore';

class Store {
  constructor() {
    this.apiStore = new ApiStore(this);
    this.menuStore = new MenuStore(this);
    this.bltStore = new BltStore(this);
    this.brdStore = new BrdStore(this);
    this.attachStore = new AttachStore(this);
    this.contStore = new ContStore(this);
    this.oAuth2Store = new OAuth2Store(this);
    this.revStore = new RevStore(this);
    this.memberStore = new MemberStore(this);
    this.bltcmntStore = new BltcmntStore(this);
    this.kakaoStore = new KakaoStore(this);
  }
}

export default Store;
