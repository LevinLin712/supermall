// 防抖函数
 export function debounce(func, delay) {
   let timer = null
   // ...表示可以传入多个函数
   return function(...args) {
     // 如果timer有值则清除
     if (timer) clearTimeout(timer)
     timer = setTimeout(() => {
       func.apply(this, args)
     }, delay)
   }
 }

// 正则表达式:字符串匹配
export function formatDate(date,fmt){
  // 1.获取年份
  // y+ -> 1个或者多个y
  // y* -> 0个或者多个y
  // y? -> 0个或者1个y
  // yyyy - 2019
  // yyy - 019
  // yy - 19
  // y - 9
  if(/(y+)/.test(fmt)){
    fmt = fmt.replace(RegExp.$1,(date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  
  // 2.获取
  let o ={
    'M+':date.getMonth() + 1,
    'd+':date.getDate(),
    'h+':date.getHours(),
    'm+':date.getMinutes(),
    's+':date.getSeconds()
  };
  for(let k in o) {
    if(new RegExp(`(${k})`).test(fmt)){
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1,(RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
}