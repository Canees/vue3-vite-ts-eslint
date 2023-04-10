/**
 *  关键字去重
 * @param arr 数组
 * @param key 关键字
 * @returns 去重后
 */
export const unique = (arr: Array<any>, key: string) => {
  const res = []
  const obj = {} as any
  for (let i = 0; i < arr.length; i++) {
    if (!obj[arr[i][key]]) {
      res.push(arr[i])
      obj[arr[i][key]] = true
    }
  }
  return res
}

/**
 * 同步睡眠
 * @param ms 毫秒
 */
export const sleep = (ms: number) => new Promise((resolve) => { setTimeout(resolve, ms) })

/**
 * 多维数组转一维
 * @param arr
 * @returns
 */
export const flatten: any = (arr: Array<any>) => [].concat(
  ...arr.map((x) => (Array.isArray(x) ? flatten(x) : x))
)

/**
 * 多字段匹配
 * @param  data 数组|数组对象
 * @param  key
 * @returns
 */
export const search = (data: Array<any>, key: string) => {
  const list = data.filter((el) => {
    let bt = ''
    bt += el.name
    bt += el.eg
    return bt.match(key)
  })
  return list
}

/**
 * 格式化日期
 * @param date Date
 * @param fmt 日期格式
 * @returns
 */
export const fomartTime = (date: Date, fmt = 'yyyy-MM-dd hh:mm:ss') => {
  if (!date) return ''
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  } as any
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length))
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)))
    }
  }
  return fmt
}

/**
* 格式化掌子面里程
* @param num 里程
* @returns
*/
export const mileage2string = (num: number) => {
  const a = Math.floor(num / 1000).toString()
  const ab = parseFloat((num % 1000).toFixed(1))
  const b = Math.floor(num % 1000).toString()
  const c = b.length === 1 ? `00${ab}` : b.length === 2 ? `0${ab}` : ab
  return `${a}+${c}`
}

/**
 * 对象数组去重
 * @param arr 传入数组
 * @param key 需要对比的键
 * @returns 去重后的数组
 */
export const uniqueArr = <T = any>(arr: T[], key: keyof T) => {
  const newArr = [] as T[]
  const valueList = [] as any[]

  for (const item of arr) {
    if (valueList.indexOf(item[key]) === -1) {
      valueList.push(item[key])
      newArr.push(item)
    }
  }
  return newArr
}

/**
 * 数组按指定key值分组
 * @param {*} array
 * @param {*} id
 * @returns
 */
export const groupBy = (array: Array<any>, id: string) => {
  const groups = {} as any
  array.forEach((o) => {
    let group = JSON.stringify(o[id])
    if (typeof o[id] === 'string') {
      group = o[id]
    }
    groups[group] = groups[group] || []
    groups[group].push(o)
  })
  // return Object.values(groups);
  return groups
}

/**
  * 解析后的浮点数转时间戳
  * @param num 时间浮点
  */
export const number2times = (num: number) => {
  const utc = (num - 25569) * 86400
  const date = new Date(utc * 1000).getTime()
  const newtime = (date - 8 * 3600 * 1000)
  return newtime
}