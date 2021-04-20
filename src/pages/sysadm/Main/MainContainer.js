import React from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import KakaoLogin from 'react-kakao-login';
import axios from 'axios';
import queryString from 'query-string';

import { OAuth } from '~/common/constants';

import styles from './styles/mainStyle';

@inject((stores) => ({
  blt: stores.bltStore,
  menu: stores.menuStore,
  kakao: stores.kakaoStore,
}))
@withRouter
@withStyles(styles)
@observer
class Main extends React.Component {
  componentDidMount() {

  }

  responseKakao = (data) => {
    const { kakao } = this.props;
    console.log(data);
    kakao.apiKakaotokenIns({
      accesstoken: '',
      toekntype: '',
      refreshtoken: '',
      tokenexp: '',
      rtokenexp: '',
      scope: '',
    });
  }

  responseFail = (err) => {
    alert('카카오 로그인에 실패하였습니다.');
    console.log(err);
  }

  refreshToken = () => {
    axios({
      method: 'post',
      url: 'https://kauth.kakao.com/oauth/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      data: queryString.stringify({
        grant_type: 'refresh_token',
        client_id: 'c159a05edd7ce597b4fe3e46dae9539b',
        refresh_token: 'GXDcJXoQb-iZE6fPyrSbXjWgXMcLR_B_m5w1oQo9dZoAAAFwYfAc5g',
      }),
    }).then((data) => {
      console.log(data);
    });
  }

  sendKakao = () => {
    axios({
      method: 'post',
      url: 'https://kapi.kakao.com/v2/api/talk/memo/default/send',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        Authorization: 'Bearer etQjmBSJ5S3oJc4WZKASY0q74DxUiJH2OXVDxQorDR4AAAFwYflndQ',
      },
      data: queryString.stringify({
        template_object: {
          object_type: 'text',
          text: '텍스트 영역입니다. 최대 200자 표시 가능합니다.',
          link: {
            web_url: 'https://developers.kakao.com',
            mobile_web_url: 'https://developers.kakao.com',
          },
          button_title: '바로 확인',
        },
      }),
    }).then((data) => {
      console.log(data);
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classNames(classes.main, classes.mainRaised)}>
        <KakaoLogin
          jsKey={OAuth.KAKAO_JS_KEY}
          buttonText="Kakao"
          onSuccess={this.responseKakao}
          onFailure={this.responseFail}
        />
        <button type="button" onClick={this.refreshToken}>재발행</button>
        <button type="button" onClick={this.sendKakao}>카톡발송</button>
      </div>
    );
  }
}

export default Main;
