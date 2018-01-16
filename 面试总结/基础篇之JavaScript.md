# JavaScript 基础

## 基本知识

### js数据类型

- 基本类型:字符串（String）、数字(Number)、布尔(Boolean)、空（Null）、未定义（Undefined）、ES6新增（Symbol）
- 对象类型(引用类型): 对象(Object)

### 判断js数据类型的方法

> 判断数据类型的方法有: typeof、instanceof、constructor、Object.toString.call()

- typeof

```js
typeof {}; // "object"
typeof []; // "object"
typeof null; //"object"
```

> 局限性：判断不完全正确。一般用于判断基本类型 除了引用类型的function会返回 'function'外，其余的无法判断，况且null也是返回"object"

- instanceof

```js
function isArray(arr){

  return arr instanceof Array;

}
```

> 注意：不完全准确。 例如有多个iframe的情况下就会

- constructor

```js
function isArray(arr){
  return typeof arr == "object" && arr.constructor == Array;
}
```

- Object.toString.call()

```js
// 简介： 通过调用Object原型下的toString.call()方法
// Object.prototype.toString.call(要判断的对象)。 //它的返回值是“[object 引用的类型]”;

Object.prototype.toString.call([]);  // 返回 "[object Array]"

Object.prototype.toString.call(/reg/ig); // 返回 "[object RegExp]"

function isArray(arr){
  return Object.prototype.toString.call(arr) === "[object Array]";
}
```

- 通过JSON.stringify()判断非空对象

```js
const obj = {};

if(JSON.stringify(obj)=="{}"){

  console.log('这是一个空对象');

}
```

### 常用字符串方法

- 拼接

```js
str.concat(str1, str2, ..., strX) //该方法没有改变原有字符串，但是会返回连接两个或多个字符串新字符串
```

- 截取

```js
str.substr(start, length)  //“点+长度”的截取方式

str.slice(start, end) // 可以为负数，负数则按倒叙，从结尾开始截取。截取长度为end - start

str.substring(start, end) // 不能为负数，如果没有结束索引则截取到结尾。   "点+点"的截取方式。
```

- 替换

```js
str.replace(原值，新值)。
```

- 查找

```js
str.match(regexp)

str.indexOf(string);   // 返回该字符首次出现的索引，如果没有则返回-1

str.lastIndexOf(string);  //回一个指定的字符串值最后出现的位置，在一个字符串中的指定位置从后向前搜索

str.search(string/regexp);   // 返回该字符首次出现的索引，如果没有则返回-1

str.includes(matchStr)        // es6查找   返回bool值
```

- 转数组

```js
 str.split(separator,limit)  // 如果把空字符串 ("") 用作 separator，那么 stringObject 中的每个字符之间都会被分割  split() 方法不改变原始字符串。
```

- 除空格：

```js
str.trim();  // 去除字符两边的空白
```

### 常用数组方法

- 新增

```js
arr.push(新元素);     // 向结尾新增
arr.unshift(新元素);  // 向开头新增
```

- 删除

```js
arr.shift()  // 删除第一个元素
arr.pop()     // 删除最后一个元素
arr.splice(index, howmany, item1, ..., itemX)  // 删除指定元素，如果number为0则不删除,如果未规定howmany，则删除从 index 开始到原数组结尾的所有元素,item 可选  要插入的参数
// 注意：splice方法会改变原数组。
```

- 查找

```js
arr.indexOf()   // 查询首次出现的位置(索引)，没有则返回-1
arr.lastIndexOf() // 查询最后出现的位置(索引)，没有则返回-1
array.filter(function(currentValue, index, arr), [thisValue]) // 通过callback来过滤查找需要的元素。thisValue可选，为callback函数内的this指向。查询所有符合条件的，返回值是数组。callback接受三个参数，第一个是当前元素，第二个是当前元素索引值，第三个是当前元素所属的数组。
arr.find()  // 查询到第一个符合条件的就返回，返回值不是数组而是单个值。不过IE不支持
arr.includes(searchElement,[fromIndex])  //searchElement 必须。需要查找的元素值。
```

- 排序

```js
arr.reverse();  // 数组倒叙
arr.sort((a,b)=>(a-b));  // 数字升序
arr.sort((a,b)=>(b-a));  // 数字降序
```

- 计算

```js
arr.reduce((total,num)=>(total+num));  // 从开头向结尾累加求和。
arr.reduceRight((total,num)=>(total+num));  // 从结尾向开头累加求和。
```

- 转字符串

```js
arr.join();  // 用连接符将数组的每项连接成字符串。

arr.toString();  // 数组转字符串，以逗号隔开。
```

- 数组去重 利用对象属性的去重

```js
const heavy = arr => {
  let obj = {}
  let arrTmp = []
  for(let i=0;i<arr.length;i++;){
    if(!obj[arr[i]){
        arrTmp.push(arr[i])
    }
  }
  return arrTmp
}
```

- 遍历

```js
arr.forEach(function(currentValue, index, arr), [thisValue])  //thisValue 可选。传递给函数的值一般用 "this" 值。如果这个参数为空， "undefined" 会传递给 "this" 值
arr.map(function(currentValue,index,arr), thisValue)  //通过指定函数处理数组的每个元素，并返回处理后的数组。 map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。
//  map() 不会改变原始数组。
```

### 隐式转换

> 通常情况下

- 空字符串会转换成0

- null会隐式转换为0

- undefined会隐式转换为NaN

- true会隐式转换为 1

- false会隐式转换为 0

### call、apply、bind的区别

- 共同点

> 改变函数的this指向，this都指向第一个参数。

- 不同点

  - call和bind的参数是一个参数列表，apply的参数则是一个arguments数组
  - bind不会立即调用，而call和apply则会立即调用。
  - bind实际上是会创建一个新函数，称为绑定函数，并以第一个参数作为this指向。

## 面向对象

### 闭包

- 定义：闭包是指能够读取其他函数内部局部变量的函数。

- 用途

  - 能够读取函数内部私有变量。

  - 变量的值始终保存在内存之中。

### 原型与原型链

- 构造函数：用来实例化特定对象(Object)的函数。

- 原型 prototype && 原型链 __proto__

```js
function SingleDog(name, age, sex){
  this.name = name
  this.age = age
  this.sex = sex
}

const f = new SingleDog('ohaiyo', 40, 'man');

f.constructor;   // 构造函数why  cause: f.__proto__ === SingleDog.prototype && SingleDog.prototype.constructor === SingleDog  so  f.constructor === SingleDog

SingleDog.prototype;    // 原型对象，只有函数才有。包含了初始化的属性，比如构造函数。

f.__proto__;     // 指向原型对象prototype。是隐式原型对象。

SingleDog.prototype.constructor === SingleDog; // true 指向原型的构造函数，也就是构造函数。

// 注意：prototype只有函数才会有，是函数的一个属性。而__proto__是只要是对象都会有。

// 注意：原型链实际上是通过__proto__去查找属性的。

// 对象本身.__proto__ -> SingleDog.prototype.__proto__ -> Object.prototype.__proto__ -> null
```

### 原型继承

- call和apply继承

> 在子对象的构造函数内用call或apply调用父对象的构造函数。

```js
Fn1  // 父对象构造函数

function Fn2(){  // 子对象构造函数

  Fn1.call(this);
  // 或
  Fn1.apply(this,arguments);

  }
```

> 缺点：只能继承父对象的属性，不能继承原型。

- prototype 实例继承

> 子对象的原型指向父对象实例。并定义子对象的原型的构造函数等于子对象的构造函数。

```js
Fn2.prototype = new Fn1();

Fn2.prototype.constructor = Fn2;
```

> 缺点：会影响父对象的原型

- prototype 原型继承

> 子对象的原型指向父对象的原型。并定义子对象的原型的构造函数等于子对象的构造函数。

```js
Fn2.prototype = Fn1.prototype;

Fn2.prototype.constructor = Fn2;
```

> 缺点：会影响父对象的原型。

- 空对象继承

```js
const F = function(){};  // 定义媒介构造函数

F.prototype = Fn1.prototype;  // 继承父对象的原型。

Fn2.prototype = new F(); // 得到一个空对象


Fn2.prototype.constructor = Fn2; // 把原型的构造函数指向构造函数本身。


// 用函数封装：

function extend(Child, Parent) {
　　　　var F = function(){};
　　　　F.prototype = Parent.prototype;
　　　　Child.prototype = new F();
　　　　Child.prototype.constructor = Child;
　　　　Child.uber = Parent.prototype;
　　}

// 调用之后就实现了继承。
```

- 拷贝继承

```js
function extend2(Child, Parent) {
　　　　var p = Parent.prototype;
　　　　var c = Child.prototype;
　　　　for (var i in p) {
　　　　　　c[i] = p[i];
　　　　　　}
　　　　c.uber = p;
　　}
```

## 事件机制

> w3c标准支持冒泡和捕获，默认捕获。IE8及以下只支持冒泡。

- 事件冒泡

> 解析：自下而上的事件流。
> 阻止冒泡

```js
event.stopPropagation() || event.cancelBubble == true;
```

- 事件捕获

```js
obj.addEventListener(事件名，事件函数，是否捕获);
// 默认为false，即捕获，如果是true则冒泡。
```

## 模块化的实现方式

> 所谓模块化就是将特定的功能组织成一个模块或对象。

### 传统方式

- 对象写法 (暴露私有变量)

```js
const module = {

  _private: 0,  // 模块私有变量

  fn1 : function(){},

  fn2 : function(){}

}
```

- 函数写法 (隐藏私有变量)

```js
// 匿名自执行函数

const module = (function(){

  const _private = 0;

  const fn1 = function(){};

  const fn2 = function(){};

  return { _private, fn1, fn2 };

})()
```

- 具体应用 (jquery模块化编程)：

```js
const module = (function($){

  $.fn.pluginName = function(){

    // ……

  }

  // ……

})(jquery)
```

### 三大规范

- commonJs： nodejs的require模块 module.exports  exports

- AMD： require.js

- CMD： seajs

### 类模块化 ES6-Module

- export module;

- import Modules from 'module';

## 异步编程的处理方式

### 异步加载

- 动态创建script标签

```js
(function() {
  var s = document.createElement('script');
  s.type = 'text/javascript';
  s.async = true;
  s.src = 'path/to/target.js';
  var x = document.getElementsByTagName('script')[0];
  x.parentNode.insertBefore(s, x);
})();
```

- 定义script标签的defer或async属性

  - async
  ```js
   <script src="file.js" async></script>
  //  缺点：在onload之前执行，阻塞onload执行。
  ```
  - defer
  ```js
  <script src="file.js" defer></script>
  ```
- 异步编程

- callback

> 封装函数传递callback，当异步执行结束时调用callback，并把异步的结果传递出去。 如ajax

- promise ：

> 三种状态：pending(进行中)、resolve(已成功)、reject(已失败)。

```js
new Promise((resolve,reject)=>{
  // 异步。。。
  if(success){
    resolve(result)
  }else {
    reject(error);
  }
}).then((result)=>{
  // todo
}).then(()=>{
  // todo
}).catch(()=>{
  // deal error
})
```

- 多异步执行

```js
const result = Promise.all([pro1,pro2,pro3...]);

// 所有promise都返回resolve才算成功，其中只要有一个返回reject，就失败。
```

- generator

> 注意：*星号要在function和函数名之间，如果没有用function关键字，则放在函数名之前。

```js
function* Fn(){
  const result = yield new Promise((resolve,reject)=>(resolve(result)));
}
```

- async/await

> 注意：async要放在function关键字之前，如果没有function关键字，则放在函数名之前。

```js
async function Fn(){
  const result = await new Promise((resolve,reject)=>(resolve(result)))
}
```

## es6常用新特性

### 基本类型拓展

- 定义变量

```js
let name = value;  // 块级作用域

const name = value;  // 常量，不可变
```

- 模块化 module

```js
export || export defaut  // 导出

import || import as  //导入

export { module1, module2 } from 'module';  // 复合写法
```

- 字符串 String

> 字符串模板，用反引号表示，字符串内可以使用变量

```js
`<div> ${ 变量名 } </div>`
```

- 数字  Number

```js
Number.isNaN(val);  // 判断是否是数字（包括字符串形式、布尔值）
```

- 数组  Array

> 拓展运算符： ...

```js
[...arr1,...arr2,...arr3]  // 数组合并
```

- 对象  Object

```js
let myobj = { ...obj }           // 拓展运算符

let { name, age, sex } = person; // 解构赋值

let person = { name, age, sex };

Object.is(val1,val2);   // 判断两个值是否相等，类似于"=="和"==="。

Object.assign(target,obj1,obj2,obj3...);  // 对象合并、浅拷贝。

// 另外lodash的defaultsDeep方法可以实现深拷贝。

Object.keys(obj);  // 返回对象的键组成的数组。

Object.values(obj);  // 返回对象的值组成的数组。
```

- 函数  function

```js
(x,y=true)=>x+y;  //  默认传参


()=>{函数体}  // 箭头函数

(num1,num2)=>num1+num2;  // 函数内只有单个语句时可以简写

const Fn =()=>{}
```

> 注意点
***
> 函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。且固定不可变。
***
> 不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
***
> 不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
***
> 不可以使用yield命令，因此箭头函数不能用作 Generator 函数。

### 继承

- class类

> 注意：es6 只有静态方法，没有静态属性。但es7有。
> 如果没有添加构造函数constructor，会默认创建一个空的constructor。

```JS
class 类名 extend 继承对象 {

  // es6写法
  constructor(props){
      super(props);
      this.state = value;
  }

  // es7写法
  state = value;

  static state = value

}

const P = new 类名();  // 实例化。
```

### 异步编程

> promise、generator、async/await
