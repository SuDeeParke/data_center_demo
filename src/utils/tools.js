// 解码
export const decode = (str) => decodeURIComponent(window.atob(str));

export const encode = (str) => {
  // 对编码的字符串转化base64
  const base64 = window.btoa(encodeURIComponent(str));
  return base64;
};
