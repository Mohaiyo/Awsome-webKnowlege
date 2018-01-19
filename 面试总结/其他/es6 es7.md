# ES6/7相关

## 模块化实现

> 目前模块化的实现有三大规范和es6 module四种方式。 三大规范分别为CommonJS、AMD、CMD三大规范。

- CommonJS

> nodejs中的module，通过module.exports导出，然后通过require导入。

- AMD规范

> requirejs遵循的就是AMD规范。

- CMD规范

> seajs遵循的就是CMD规范。

- ES Module

> ES6规范，自成体系。通过export导出，import导入。
>还有一种方式，整体导出：import * as Object from 'module'。
> 模块中可能有很多的输出(export)，平常的import都是导入指定的模块。
> 而 * as 整体导出的方式则是将所有输出的模块赋给一个对象。
> 更有趣的，你可以同时导入导出，写在一起，如下

```js
 export { LoginComponent } from 'UserComponents';

//  等同于：
 import { LoginComponent } from 'UserComponents';
 export LoginComponent;

// 另外node中require提供了resovle方法用于解析模块的路径。返回包含该模块名的绝对路径。

require.resolve(module path)
```

## 严格模式

> 由es5推出的，即在文件顶部加上"use strict"。
> 另外ES6 的模块自动采用严格模式。
> 严格模式主要有以下限制：

- 变量必须声明后再使用
- 函数的参数不能有同名属性，否则报错
- 不能使用with语句
- 不能对只读属性赋值，否则报错
- 不能使用前缀0表示八进制数，否则报错
- 不能删除不可删除的属性，否则报错
- 不能删除变量delete 8，prop，会报错，只能删除属性delete global[prop]
- eval不会在它的外层作用域引入变量
- eval和arguments不能被重新赋值
- arguments不会自动反映函数参数的变化
- 不能使用arguments.callee
- 不能使用arguments.caller
- 禁止this指向全局对象
- 不能使用fn.caller和fn.arguments获取函数调用的堆栈
- 增加了保留字（比如protected、static和interface）

> 注意：ES6 模块之中，顶层的this指向undefined，即不应该在顶层代码使用this。