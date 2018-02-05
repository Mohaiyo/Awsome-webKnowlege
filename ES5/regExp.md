# 正则表达式

## test() && exec() 方法

- test()  该方法只会返回false | true

- exec()  该方法返回匹配的数组 数组中包含匹配到的字符串，位置以及输入的字符串

```js
var pattern = /box/ig
var str = ' this is a box'
pattern.test(str)  // true
var newStr = 'this is a box! that is a box,too!'
pattern.exec(newStr)  // ["box", index: 10, input: "this is a box! that is a box,too!"]
```

## 字符串的正则表达式方法

- match(pattern)  返回pattern中的子串或者null
- replace(pattern, replacement) 用replacement 替换 pattern  返回替换之后的字符串
- search(pattern)  返回字符串中找到pattern开始的位置  找不到则返回-1
- split(pattern)  返回字符串按照指定pattern分割的数组

```js
let reg = /foo/ig
let str = 'foo is a string！Foo is upcaseper'
str.match(reg)  //  ["foo", "Foo"]
str.replace(reg, 'Tom')   // "Tom is a string！Tom is upcaseper"
str.search(reg) // 0
str.split(reg)  // ["", " is a string！", " is upcaseper"]
```

## RegExp对象的静态属性

> 基本上用得很少

|  属性      |  短名  |                 含义             |
| -----------| ------ | ------------------------------- |
| input      | $_     |   当前被匹配的字符串              |
| lastMatch  | $&     |   最后一个匹配的字符串            |
|  lastParen | $+     |   最后一对圆括弧内匹配的子串       |
|  leftContext | $`   |  最后一次匹配前的子串             |
|  multiline  |  $*   |  用于指定是否所有的表达式都用于多行的布尔值 |
|  rightContext | $'  |  在上次匹配之后的子串             |

```js
// 使用静态属性
// () 正则分组
let regExp = /(g)oogle/
let str = 'google chrome browser is so fast!'
regExp.test(str)  //  true 先用test 或者exec 方法执行一下
console.log(RegExp.input)   // google chrome browser is so fast!
console.log(RegExp.$_)    //只有这一个可以之前使用.
console.log(RegExp['$_'])   // google chrome browser is so fast!
console.log(RegExp.lastMatch)   // google
console.log(RegExp['$&'])   // google
console.log(RegExp.lastParen)   // g
console.log(RegExp['$+'])   // g
console.log(RegExp.leftContext)   // ''
console.log(RegExp['$`'])   // ''
console.log(RegExp.multiline)   // undefined
console.log(RegExp['$*'])   // undefined
console.log(RegExp.rightContext)   // chrome browser is so fast!
console.log(RegExp["$'"])   // chrome browser is so fast!
```

## RegExp对象的实例属性

> lastIndex 属性基本没什么用

|  属性       |                 含义             |
| ----------- | ------------------------------- |
| global      |   Boolean值，表示g是否已经被设置  |
| ignoreCase  |   Boolean值，表示i是否已经被设置  |
|  lastIndex  |   整数，代表下次匹配将从哪里字符位置开始 |
|  multiline  |  Boolean值，表示m是否已经被设置   |
|  source     |  正则表达式的源字符串形式         |

```js
let reg = /google/ig
console.log(reg.global)  // true
console.log(reg.ignoreCase)  // true
console.log(reg.multiline)  // false
console.log(reg.lastIndex)  // 0 第一次匹配从零开始
let str = 'google google google'
reg.test(str)
console.log(reg.lastIndex)  // 6 第二次从6开始
reg.test(str)
console.log(reg.lastIndex)  // 13 第三次从13开始
console.log(reg.source)  // google
```

## 获取控制

> 正则表达式元字符是包含特殊含义的字符串。他们有一些特殊功能，可以控制匹配模式的方式。反斜杠后的元字符将失去特殊含义。

|  元字符/元符号       |                 匹配情况             |
| ------------------- | ----------------------------------- |
| .                   |   匹配除换行符（\n、\r）之外的任何单个字符,要匹配包括 '\n' 在内的任何字符，请使用像"(.|\n)"的模式。 |
| [a-z0-9]            |   匹配括号中的字符集中的任意字符(1个)       |
|  [^a-z0-9]          |   匹配任意不在括号中的字符集中的字符   |
|  \d                 |  匹配数字                            |
|  \D                 |  匹配非数字，同[^0-9]                 |
|  \w                 |  匹配字母和数字以及_                 |
|  \W                 |  匹配非字母和数字以及_                 |
|  \D                 |  匹配非数字，同[^0-9]                 |
|  \D                 |  匹配非数字，同[^0-9]                 |

```js
let reg = /go.gle/ig
let str = 'google.com'
reg.test(str)  // true
let str1 = 'go!gle.com'
reg.test(str1)  // true
let str2 = 'go#gle.com'
reg.test(str2)  // true
let str3 = 'go2gle.com'
reg.test(str3)  // true
let str4 = 'go/ngle.com'
reg.test(str4)  // false
```

- 字符类：重复字符

|  元字符/元符号       |                 匹配情况             |
| ------------------- | ----------------------------------- |
| x?                  |   匹配0个或者1个x                    |
| x*                  |   匹配0个或者任意多个x                |
| x+                  |   匹配至少一个x                      |
|  (xyz)+             |   匹配至少一个xyz                    |
|  x{n, m}            |   匹配最少n个、最多m个x               |