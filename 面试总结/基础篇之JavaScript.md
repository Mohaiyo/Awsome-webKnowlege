一，基本知识

1，基本类型

字符串（String）、数字(Number)、布尔(Boolean)、 数组(Array)、  

对象(Object)、空（Null）、未定义（Undefined）

2，判断数据类型的方法

判断对象类型的方法有: typeof、instanceof、constructor、toString

 (1)，typeof

     typeof {}; // "object"
     
     typeof []; // "object"

     局限性：判断不完全正确。

 (2)， instanceof 

     function isArray(arr){

       return arr instanceof Array;

     }
     
     注意：不完全准确。

 (3)，constructor

    function isArray(arr){

      return typeof arr == "object" && arr.constructor == Array;

    }

 (4)，toString.call()

    简介： 通过调用Object原型下的toString.call()方法。    
    
     Object.prototype.toString.call(要判断的对象)。它的返回值是“[object 基本类型]”; 

     Object.prototype.toString.call([]);  // 返回 "[object Array]"

     Object.prototype.toString.call(/reg/ig); // 返回 "[object RegExp]"

     function isArray(arr){

       return Object.prototype.toString.call(arr) === "[object Array]";
     
     }
  
  (5)，通过JSON.stringify()判断非空对象
  
    const obj = {};
  
    if(JSON.stringify(obj)=="{}"){
      
      console.log('这是一个空对象');
      
    }
  
  
  
3，常用字符串方法

(1) 拼接：str.concat(str1)。
 
(2) 截取：
 
   str.substr(开始索引-含，截取数量) ；  //“点+长度”的截取方式
   
   str.slice(开始索引-含，结束索引-非) ； // 可以为负数，负数则按倒叙，从结尾开始截取。
   
   str.substring(开始索引-含，结束索引-非) ； // 不能为负数，如果没有结束索引则截取到结尾。   "点+点"的截取方式。
   
(3) 替换：str.replace(原值，新值)。

(4) 查找：    

  str.match(regexp正则匹配) ；
  
  str.indexOf(string);   // 返回该字符首次出现的索引，如果没有则返回-1
  
  str.search(string/正则);   // 返回该字符首次出现的索引，如果没有则返回-1

 
(5) 转数组： str.split(分隔符) ；  

(6) 除空格： str.trim();  // 去除字符两边的空白


4，常用数组方法

(1) 新增：  

   arr.push(新元素);     // 向结尾新增  
   
   arr.unshift(新元素);  // 向开头新增
   
(2) 删除:   

   arr.shift();    // 删除第一个元素  
   
   arr.pop();      // 删除最后一个元素
   
   arr.splice(index-开始索引，number-删除数量,items-新增元素);   // 删除指定元素，如果number为0则不删除  
     
   注意：splice方法会改变原数组。
   
(3) 查找:  

   arr.indexOf();   // 查询首次出现的位置(索引)，没有则返回-1   
   
   arr.lastIndexOf();  // 查询最后出现的位置(索引)，没有则返回-1    
   
   arr.filter(callback,thisValue) ;  // 通过callback来过滤查找需要的元素。thisValue为callback函数内的this指向。
   
    // 查询所有符合条件的，返回值是数组。
   
    // callback接受三个参数，第一个是当前元素，第二个是当前元素索引值，第三个是当前元素所属的数组。  
    
    arr.find()  // 查询到第一个符合条件的就返回，返回值不是数组而是单个值。不过IE不支持
   
(4) 排序:     

   arr.reverse();  // 数组倒叙   
   
   arr.sort((a,b)=>(a-b));  // 数字升序
   
   arr.sort((a,b)=>(b-a));  // 数字降序
     

(5) 计算:  

   求和：arr.reduce((total,num)=>(total+num));  // 从开头向结尾累加求和。
   
         arr.reduceRight((total,num)=>(total+num));  // 从结尾向开头累加求和。

(6) 转字符串:   

   arr.join(连接符);  // 用连接符将数组的每项连接成字符串。  
   
   arr.toString();  // 数组转字符串，以逗号隔开。  
   
(7) 数组去重:  

 const heavy =arr=>{
    let obj = {};
    let arrTmp = [];
    for(let i=0;i<arr.length;i++;){
      if(!obj[arr[i]){
         arrTmp.push(arr[i]); 
      }
    }
    return arrTmp;
 }



5，隐式转换

通常情况下：    

(0) 空字符串会转换成0

(1) null会隐式转换为0  
 
(2) undefined会隐式转换为NaN
 
(3) true会隐式转换为 1
 
(4) false会隐式转换为 0  

6，call、apply、bind的区别

共同点：  

  改变函数的this指向，this都指向第一个参数。

不同点：  

  (1), call和bind的参数是一个参数列表，apply的参数则是一个arguments数组
  
  (2), bind不会立即调用，而call和apply则会立即调用。
  
  (3)，bind实际上是会创建一个新函数，称为绑定函数，并以第一个参数作为this指向。 

二，面向对象

1，闭包

 定义：能够读取其他函数内部局部变量的函数。
 
 用途：
 
   (1) 能够读取函数内部私有变量。
   
   (2) 变量的值始终保存在内存之中。
   
2，原型与原型链

(1) 构造函数：

  用来实例化特定对象(Object)的函数。
  
(2) 原型&&原型链：

  function Fn(){
    // 构造函数
  }
  
  const P = new Fn();
  
  P.constructor;   // 构造函数
  
  Fn.prototype;    // 原型对象，只有函数才有。包含了初始化的属性，比如构造函数。
  
  P.__proto__;     // 指向原型对象prototype。是隐式原型对象。
  
  Fn.prototype.constructor; // 指向原型的构造函数，也就是包装对象Object。
  
  
  注意：访问P.prototype实际上是访问了prototype对象以及__proto__对象。
  
  
  注意：prototype只有函数才会有，是函数的一个属性。而__proto__是只要是对象都会有。
  
  
  注意：原型链实际上是通过__proto__去查找属性的。
  
  
  对象本身->Fn.prototype->__proto__->__proto__->……-> Object

2，原型继承


(1) call和apply继承：  

  在子对象的构造函数内用call或apply调用父对象的构造函数。
 
  Fn1  // 父对象构造函数
 
  function Fn2(){  // 子对象构造函数
 
    Fn1.call(this);
    或
    Fn1.apply(this,arguments);
   
   }
   
  缺点：只能继承父对象的属性，不能继承原型。

(2) prototype 实例继承   

   子对象的原型指向父对象实例。  
  
   并定义子对象的原型的构造函数等于子对象的构造函数。  
   
   Fn2.prototype = new Fn1(); 
   
   Fn2.prototype.constructor = Fn2;  
   
   
   缺点：会影响父对象的原型。  
   
   
(3) prototype 原型继承     


   子对象的原型指向父对象的原型。  
  
   并定义子对象的原型的构造函数等于子对象的构造函数。  
   
   Fn2.prototype = Fn1.prototype; 
   
   Fn2.prototype.constructor = Fn2;  

  
   缺点：会影响父对象的原型。   
   
   
   
(4) 空对象继承  

  const F = function(){};  // 定义媒介构造函数
  
  F.prototype = Fn1.prototype;  // 继承父对象的原型。
  
  Fn2.prototype = new F(); // 得到一个空对象
  
  
  Fn2.prototype.constructor = Fn2; // 把原型的构造函数指向构造函数本身。
  
  
  用函数封装：  
  
    function extend(Child, Parent) {
　　　　var F = function(){}; 
　　　　F.prototype = Parent.prototype; 
　　　　Child.prototype = new F();
　　　　Child.prototype.constructor = Child;
　　　　Child.uber = Parent.prototype;
　　}
  
   调用之后就实现了继承。   
   
   
(5) 拷贝继承     

  function extend2(Child, Parent) {
　　　　var p = Parent.prototype;
　　　　var c = Child.prototype;
　　　　for (var i in p) {
　　　　　　c[i] = p[i];
　　　　　　}
　　　　c.uber = p;
　　}

三，事件机制

w3c标准支持冒泡和捕获，默认捕获。  

IE8及以下只支持冒泡。  

1，事件冒泡

解析：自下而上的事件流。
 
阻止冒泡：event.stopPropagation() || event.cancelBubble == true;
 
2，事件捕获

 obj.addEventListener(事件名，事件函数，是否捕获);    
 
// 默认为false，即捕获，如果是true则冒泡。
 
四，模块化的实现方式

所谓模块化就是将特定的功能组织成一个模块或对象。

1，传统方式

对象写法 (暴露私有变量)：  
 
const module = {
  
  _private: 0,  // 模块私有变量
  
  fn1 : function(){},
  
  fn2 : function(){}
    
}


函数写法 (隐藏私有变量)：   

// 匿名自执行函数

const module = (function(){

  const _private = 0;
  
  const fn1 = function(){};
  
  const fn2 = function(){};
  
  return { _private, fn1, fn2 };
    
})()   


具体应用 (jquery模块化编程)：  

const module = (function($){
  
  $.fn.pluginName = function(){
    
    // ……  
    
  }
  
  // ……
  
})(jquery)  

2，三大规范

(1) commonJs： nodejs的require模块

(2) AMD： require.js

(3) CMD： seajs


3，类模块化 ES6-Module


export module;

import Modules from 'module';

五，异步编程的处理方式

1，异步加载

(1) 动态创建script标签:  

(function() {
     var s = document.createElement('script');
     s.type = 'text/javascript';
     s.async = true;
     s.src = 'assets/script.js';
     var x = document.getElementsByTagName('script')[0];
     x.parentNode.insertBefore(s, x);
 })();

(2) 定义script标签的defer或async属性 

 async:  
 
   <script src="file.js" async></script> 
   
   缺点：在onload之前执行，阻塞onload执行。
 
 defer:  
 
   <script src="file.js" defer></script> 

2，异步编程

(1) callback ：  

 封装函数传递callback，当异步执行结束时调用callback，并把异步的结果传递出去。

(2) promise ：

  三种状态：pending(进行中)、resolve(已成功)、reject(已失败)。
  
  new Promise((resolve,reject)=>{
     
    // 异步。。。
    if(success){ 
    
      resolve(result); 
      
    }else { 
    
      reject(error); 
      
    }
     
  }).then((result)=>{
    
    // todu  
    
  }).then(()=>{
      
    // todu  
    
  }).catch(()=>{
    // deal error
  })  
  
 
 多异步执行：  
 
 const result = Promise.all([pro1,pro2,pro3...]);
 
  // 所有promise都返回resolve才算成功，其中只要有一个返回reject，就失败。
  

(3) generator ：

 注意：*星号要在function和函数名之间，如果没有用function关键字，则放在函数名之前。

 *Fn(){
 
   const result = yield new Promise((resolve,reject)=>(resolve(result)));
     
  }

(4) async/await ：

 注意：async要放在function关键字之前，如果没有function关键字，则放在函数名之前。

 async function Fn(){
    
   const result = await new Promise((resolve,reject)=>(resolve(result)));
   
 }


六，es6常用新特性

1，基本类型拓展

(1)，定义变量  
 
   let name = value;  // 块级作用域
   
   const name = value;  // 常量，不可变   
  
  
(2)，模块化 module   

  导出： export、export defaut
  
  导入： import、import as   
  
  复合写法：
  
   export { module1, module2 } from 'module';
   
(3) 字符串 String:

  字符串模板，用反引号表示，字符串内可以使用变量。  
  
  `<div> ${ 变量名 } </div>`

(4) 数字  Number:  

  Number.isNaN(val);  // 判断是否是数字（包括字符串形式、布尔值）。  
  

(5) 数组  Array:   

  拓展运算符： ...
  
  数组合并：[...arr1,...arr2,...arr3]

(6) 对象  Object:  

  拓展运算符： let myobj = { ...obj };

  解构赋值： let { name, age, sex } = person;  
  
  let person = { name, age, sex };
  
  Object.is(val1,val2);   // 判断两个值是否相等，类似于"=="和"==="。  
  
  Object.assign(target,obj1,obj2,obj3...);  // 对象合并、浅拷贝。
  
 // 另外lodash的defaultsDeep方法可以实现深拷贝。  
 
  Object.keys(obj);  // 返回对象的键组成的数组。   
  
  Object.values(obj);  // 返回对象的值组成的数组。  
  
 
 (7) 函数  function:  
 
  默认传参：  
  
     (x,y=true)=>x+y;
 
  箭头函数：  
  
    ()=>{函数体}
    
    (num1,num2)=>num1+num2;  // 函数内只有单个语句时可以简写。
    
    const Fn =()=>{}
  
   注意点：  
  
   1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。且固定不可变。

   2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。

   3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

   4）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。


  
2，继承

 class类:  
 
  注意：es6 只有静态方法，没有静态属性。但es7有。
  
  如果没有添加构造函数constructor，会默认创建一个空的constructor。
 
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

3，异步编程

promise、generator、async/await
