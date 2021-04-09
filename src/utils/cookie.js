// 设置cookie
export function setCookie(c_name, value, expiredays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie =
    c_name +
    '=' +
    encodeURIComponent(value) +
    ';expires=' +
    exdate.toGMTString() +
    ';path=/';
}
// 读取cookie
export function getCookie(c_name) {
  let c_start = null;
  let c_end = null;
  if (document.cookie.length > 0) {
    c_start = document.cookie.indexOf(c_name + '=');
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1;
      c_end = document.cookie.indexOf(';', c_start);
      if (c_end == -1) c_end = document.cookie.length;
      return decodeURIComponent(document.cookie.substring(c_start, c_end));
    }
  }
  return '';
}
// 检查cookie
export function checkCookie(c_name) {
  let username = getCookie(c_name);
  console.log(username);
  if (username != null && username != '') {
    return true;
  } else {
    return false;
  }
}
// 清除cookie
export function clearCookie(name) {
  setCookie(name, '', -1);
}

