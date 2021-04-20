const Restful = {
  PROTOCOL: 'http',
  DOMAIN: 'local.barondive.com',
  PORT: '8081',
  PATH: '/api',
};

const OAuth = {
  PROTOCOL: 'http',
  DOMAIN: 'local.barondive.com',
  PORT: '8082',
  CLIENT_ID: 'rest_client_id',
  CLIENT_SECRET: '',
  SCOPE: '',
  GRANT_TYPE: 'password',
  PATH: '/oauth/token',
  REFRESH_GRANT_TYPE: 'refresh_token',
  HRSCHEMA: 'barondive',
  HRIFSCHEMA: 'barondive',
  HRTIMEZONE: 'GMT+9:00',
  KAKAO_JS_KEY: '',
};

export const ApiConst = {
  Restful,
  OAuth,
  OAUTH_HOST: `${OAuth.PROTOCOL}://${OAuth.DOMAIN}${OAuth.PORT === '80' ? '' : `:${OAuth.PORT}`}`,
  OAUTH_URI: `${OAuth.PROTOCOL}://${OAuth.DOMAIN}${OAuth.PORT === '80' ? '' : `:${OAuth.PORT}`}${OAuth.PATH}`,
  RESTFUL_HOST: `${Restful.PROTOCOL}://${Restful.DOMAIN}${Restful.PORT === '80' ? '' : `:${Restful.PORT}`}`,
  RESTFUL_URI: `${Restful.PROTOCOL}://${Restful.DOMAIN}${Restful.PORT === '80' ? '' : `:${Restful.PORT}`}${Restful.PATH}`,
};

export const FileConst = {
  EDITOR_UPLOAD_URL: `${ApiConst.RESTFUL_URI}/attach/uploadAttach`,
  EDITOR_DELETE_URL: `${ApiConst.RESTFUL_URI}/attach/deleteAttach`,
};
