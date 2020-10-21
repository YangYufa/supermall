export function debounce(func, delay) {
  let timer = null
  return function (...args) {
    // let timer = null
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

export function formatDate(date, fmt) {
  //获取年份
  if (/(y+)/.test(fmt)) {
    //RegExp.$1就是测试test得到的部分
    //substr是从哪一位开始截取
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      //如果是传来一个M，直接给它，如果当月是10月，直接丢给它，如果传来两个M，当月是4月，丢给它04
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};
