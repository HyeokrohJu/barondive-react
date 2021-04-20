import queryString from 'query-string';
import moment from 'moment';

export const arrDivision = (arr, n) => {
  const len = arr.length;
  const cnt = Math.floor(len / n);
  const tmp = [];

  for (let i = 0; i <= cnt; i++) {
    tmp.push(arr.splice(0, n));
  }

  return tmp;
};

export const parseQuery = (search) => {
  if (search) {
    return queryString.parse(search);
  }
  return {};
};

export const stringQuery = (params) => queryString.stringify(params);

export const getUUID = () => {
  const date = moment().format('YYYYMMDDHHmmss');
  const s4 = ((1 + Math.random()) * 0x10000 || 0).toString(16).substring(1);
  return `${date}-${s4}`;
};
