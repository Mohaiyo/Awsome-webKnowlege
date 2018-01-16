import Vue from 'vue'

// 参数筛选
const params = JSON.parse(localStorage.getItem('params'))

const paraFilter = (paraCode, paramNo) => {
  if (!paramNo || !paraCode) {
    return ''
  }
  let result
  for (let data of params) {
    if (data.paraNo == paramNo && data.paraCode == paraCode) {
      result = data.paraValue
    }
  }
  return result
}

// n等于0的时候，不留小数位
const moneyFormat = (s, n) => {
  if (!s || Number(s) < 0) return
  n = n >= 0 && n <= 20 ? n : 2
  let f = s < 0 ? '-' : ''; // 判断是否为负数
  s = parseFloat((Math.abs(s) + '').replace(/[^\d\.-]/g, '')).toFixed(n) + ''; // 取绝对值处理, 更改这里n数也可确定要保留的小数位
  s = s.replace(/\,/g, '')
  var l = s.split('.')[0].split('').reverse(),
    r = s.split('.')[1]
  let t = ''
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? ',' : '')
  }
  var res
  if (n == 0) {
    res = f + t.split('').reverse().join('')
  }else {
    res = f + t.split('').reverse().join('') + '.' + (r ? r.slice(0, n) : '')
  }
  return res
}

// 四位分割
const spaceFilter = (t) => {
  if (!t || t.length < 4) return t

  let tmp = '',
    n = t.length / 4
  for (let i = 0; i < n; i++) {
    tmp += t.substr(4 * i, 4) + ' '
  }
  return tmp.trim()
}

// 格式化日期yyyy-MM-dd HH:mm:ss
const dateFilter = (value, format) => {
  if (!value) return ''
  let timeStr
  if (value.length == 8) {
    value = value + '000000'
    timeStr = value.replace(/(\d{0,4})(\d{0,2})(\d{0,2})(\d{0,2})(\d{0,2})(\d{0,2})/, format)
  }else {
    timeStr = value.replace(/(\d{0,4})(\d{0,2})(\d{0,2})(\d{0,2})(\d{0,2})(\d{0,2})/, format)
  }
  return timeStr
}
const DateFormat = (date) => {
  if (date == null || date == '') {
    return ''
  }
  var strdate = ''
  if (date.length == 14) {
    strdate = date.substr(0, 4) + '-' + date.substr(4, 2) + '-' + date.substr(6, 2)
    + ' ' + date.substr(8, 2) + ':' + date.substr(10, 2) + ':' + date.substr(12, 2)
  }
  if (date.length == 8) {
    strdate = date.substr(0, 4) + '-' + date.substr(4, 2) + '-' + date.substr(6, 2)
  }
  if (date.length == 6) {
    strdate = date.substr(0, 2) + ':' + date.substr(2, 2) + ':' + date.substr(4, 2)
  }
  return strdate
}
// 格式化日期,如将20171215变成2017-12-15
const dateFilter2 = (date) => {
  if (date != null && date != '') {
    var year = date.substring(0, 4)
    var month = date.substring(4, 6)
    var date = date.substring(6, 8)
    var rdate = year + '-' + month + '-' + date
    return rdate
  }
}

const floatStrFilter = (str, n) => {
  if (str.length >= n) { // 保留指定位数
    return str.substr(0, n)
  }else if (str.length < n) {
    return this._floatStr(str + '0', n)
  }
}

const moment = (value, formatString) => {
  formatString = formatString || 'YYYY-MM-DD HH:mm:ss'
  return moment(value).format(formatString)
}

const convertCurrency = (currencyDigits) => {

  let [MAXIMUM_NUMBER, CN_ZERO, CN_ONE, CN_TWO, CN_THREE, CN_FOUR, CN_FIVE, CN_SIX, CN_SEVEN, CN_EIGHT, CN_NINE, CN_TEN, CN_HUNDRED, CN_THOUSAND, CN_TEN_THOUSAND, CN_HUNDRED_MILLION, CN_SYMBOL, CN_DOLLAR, CN_TEN_CENT, CN_CENT, CN_INTEGER, integral, decimal, outputCharacters, parts, digits, radices, bigRadices, decimals, zeroCount, i, p, d, quotient, modulus] = [ 99999999999.99, '零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖', '拾', '佰', '仟', '万', '亿', '人民币', '圆', '角', '分', '整' ]

  currencyDigits = currencyDigits.toString()
  if (currencyDigits == '') {
    return ''
  }
  if (currencyDigits.match(/[^,.\d]/) != null) {
    return ''
  }
  if ((currencyDigits).match(/^((\d{1,3}(,\d{3})*(.((\d{3},)*\d{1,3}))?)|(\d+(.\d+)?))$/) == null) {
    return ''
  }

  currencyDigits = currencyDigits.replace(/,/g, ''); // Remove comma delimiters.
  currencyDigits = currencyDigits.replace(/^0+/, ''); // Trim zeros at the beginning.
  // Assert the number is not greater than the maximum number.
  if (Number(currencyDigits) > MAXIMUM_NUMBER) {
    //        alert("金额过大，应小于1000亿元！")
    return '金额过大，应小于1000亿元！'
  }

  parts = currencyDigits.split('.')
  if (parts.length > 1) {
    integral = parts[0]
    decimal = parts[1]
    decimal = decimal.substr(0, 2)
  }else {
    integral = parts[0]
    decimal = ''
  }
  digits = new Array(CN_ZERO, CN_ONE, CN_TWO, CN_THREE, CN_FOUR, CN_FIVE, CN_SIX, CN_SEVEN, CN_EIGHT, CN_NINE)
  radices = new Array('', CN_TEN, CN_HUNDRED, CN_THOUSAND)
  bigRadices = new Array('', CN_TEN_THOUSAND, CN_HUNDRED_MILLION)
  decimals = new Array(CN_TEN_CENT, CN_CENT)
  // Start processing:
  outputCharacters = ''
  // Process integral part if it is larger than 0:
  if (Number(integral) > 0) {
    zeroCount = 0
    for (i = 0; i < integral.length; i++) {
      p = integral.length - i - 1
      d = integral.substr(i, 1)
      quotient = p / 4
      modulus = p % 4
      if (d == '0') {
        zeroCount++
      }else {
        if (zeroCount > 0) {
          outputCharacters += digits[0]
        }
        zeroCount = 0
        outputCharacters += digits[Number(d)] + radices[modulus]
      }
      if (modulus == 0 && zeroCount < 4) {
        outputCharacters += bigRadices[quotient]
        zeroCount = 0
      }
    }
    outputCharacters += CN_DOLLAR
  }
  // Process decimal part if there is:
  if (decimal != '') {
    for (i = 0; i < decimal.length; i++) {
      d = decimal.substr(i, 1)
      if (d != '0') {
        outputCharacters += digits[Number(d)] + decimals[i]
      }
    }
  }
  // Confirm and return the final output string:
  if (outputCharacters == '') {
    outputCharacters = CN_ZERO + CN_DOLLAR
  }
  if (decimal == '') {
    outputCharacters += CN_INTEGER
  }
  outputCharacters = outputCharacters
  return outputCharacters
}
Vue.filter('currency', function (value) { // 保留三位数过滤器
  return value.toString().match(/^\d+(?:\.\d{0,3})?/)[0]
})

Vue.filter('paraFilter', paraFilter)
Vue.filter('moneyFormat', moneyFormat)
Vue.filter('convertCurrency', convertCurrency)
Vue.filter('spaceFilter', spaceFilter)
Vue.filter('dateFilter', dateFilter)
Vue.filter('moment', moment)
Vue.filter('dateFilter2', dateFilter2)
Vue.filter('floatStrFilter', floatStrFilter)
Vue.filter('DateFormat', DateFormat)
