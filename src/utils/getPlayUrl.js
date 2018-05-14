function o(t) {
  var e, i, r, o, n, a, s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  for(r = t.length, i = 0, e = ""; i < r;) {
    if(o = 255 & t.charCodeAt(i++), i === r) {
      e += s.charAt(o >> 2), e += s.charAt((3 & o) << 4), e += "===";
      break
    }
    if(n = t.charCodeAt(i++), i === r) {
      e += s.charAt(o >> 2), e += s.charAt((3 & o) << 4 | (240 & n) >> 4), e += s.charAt((15 & n) << 2), e += "=";
      break
    }
    a = t.charCodeAt(i++), e += s.charAt(o >> 2), e += s.charAt((3 & o) << 4 | (240 & n) >> 4), e += s.charAt((15 & n) << 2 | (192 & a) >> 6), e += s.charAt(63 & a)
  }
  return e
}

function n(t) {
  for(var e, i, r, o, n = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1), a = 0, s = t.length, p = ""; a < s;) {
    do e = n[255 & t.charCodeAt(a++)]; while (a < s && e === -1);
    if(e === -1) break;
    do i = n[255 & t.charCodeAt(a++)]; while (a < s && i === -1);
    if(i === -1) break;
    p += String.fromCharCode(e << 2 | (48 & i) >> 4);
    do {
      if(r = 255 & t.charCodeAt(a++), 61 === r) return p;
      r = n[r]
    } while (a < s && r === -1);
    if(r === -1) break;
    p += String.fromCharCode((15 & i) << 4 | (60 & r) >> 2);
    do {
      if(o = 255 & t.charCodeAt(a++), 61 === o) return p;
      o = n[o]
    } while (a < s && o === -1);
    if(o === -1) break;
    p += String.fromCharCode((3 & r) << 6 | o)
  }
  return p
}

function a(t) {
  var e = "",
    i = "",
    r = "";
  return 28 === t.length && t.lastIndexOf("0") === t.length - 1 ? (e = t.substr(0, 27) + "=", i = n(e), r = s(i), c(r)) : (e = t.substr(2, t.length - 2), i = n(e), s(i))
}

function s(t) {
  for(var e = "", i = 0; i < t.length;) {
    var r = t.charCodeAt(i++),
      o = t.charCodeAt(i++);
    if(e += l(p(r, o).z1), e += l(p(r, o).z2), i === t.length - 1) {
      e += l(t.charCodeAt(i));
      break
    }
  }
  return e
}

function p(t, e) {
  var i = 256,
    r = (t * x + e * w) % i,
    o = (t * b + e * _) % i;
  return {
    z1: r,
    z2: o
  }
}

function l(t) {
  return String.fromCharCode(t)
}

function c(t) {
  var e, i, r, o = "";
  for(t += "", e = 0, i = t.length; e < i; e++) r = t.charCodeAt(e).toString(16).toLocaleUpperCase(), o += r.length < 2 ? "0" + r : r;
  return o
}

function u(t) {
  console.log("updateKey", t), x = t[0], b = t[1], w = t[2], _ = t[3]
}
var x = 167,
  b = 11,
  w = 240,
  _ = 185,
  decode = a,
  base64_encode = o;

function getAuth() {
  wx.request({
    url: 'http://api-vmis.fun.tv/pre/?app=minifun',
    success: function (res) {
      console.log(res.data)
      if (res.data.status === 200) {
        u(res.data.data)
      }
    }
  })
}
getAuth();
export {
  decode,
  base64_encode
}