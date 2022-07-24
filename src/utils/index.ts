export const getCookie = (name: string) => {
  var dc = document.cookie;
  var prefix = `${name}=`;
  var begin = dc.indexOf(`; ${prefix}`);
  var end = 0;
  if (begin === -1) {
    begin = dc.indexOf(prefix);
    if (begin !== 0) {
      return null;
    }
  } else {
    begin += 2;
    end = document.cookie.indexOf(";", begin);
    if (end === -1) {
      end = dc.length;
    }
  }
  // because unescape has been deprecated, replaced with decodeURI
  //return unescape(dc.substring(begin + prefix.length, end));
  return decodeURI(dc.substring(begin + prefix.length, end));
};
