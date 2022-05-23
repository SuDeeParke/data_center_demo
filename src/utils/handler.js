import Tools from '../libs/Tools';

// 解码
export const decode = (str) => decodeURIComponent(window.atob(str));

export const encode = (str) => {
  // 对编码的字符串转化base64
  const base64 = window.btoa(encodeURIComponent(str));
  return base64;
};

export const showDeviceMark = (type) => {
  if (window.DataCenter && window.DataCenter[type]) {
    window.DataCenter[type].forEach((item) => {
      Tools.showMark(item, window.DataCenter.scene);
    });
  }
};

export const hideDeviceMark = () => {
  const types = ['lights', 'cabints', 'airs'];
  types.forEach((element) => {
    if (window.DataCenter && window.DataCenter[element]) {
      window.DataCenter[element].forEach((item) => {
        Tools.hideMark(item);
      });
    }
  });
};
