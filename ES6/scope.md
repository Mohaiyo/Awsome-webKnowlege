# javascript深入执行上下文

```js
var scope = "global scope";
function checkscope(){
  var scope = "local scope";
  function f(){
    return scope;
  }
  return f;
}
checkscope()();
```

## 具体执行分析

上面一段代码执行过程如下

1.执行全局代码，创建全局上下文，全局上下文被压入执行上下文栈

```js
ECStack = [
  globalContext
]
```

2.全局上下文初始化

```js
  globalContext = [
    VO: [global],
    Scope: [globalContext.VO],
    this: globalContext.VO
  ]
```

3.初始化的同时，checkscope函数被创建，保存作用域链到函数的内部属性[[scope]]

```js
checkscope.[[scope]] = [
  globalContext.VO
]
```

4.执行checkscope函数，创建checkscope函数执行上下文，并且把该上下文压入执行上下文栈

```js
ECStack = [
  checkscopeContext,
  globalContext
]
```

5.checkscope 函数执行上下文初始化：

复制函数 [[scope]] 属性创建作用域链，
用 arguments 创建活动对象，
初始化活动对象，即加入形参、函数声明、变量声明，
将活动对象压入 checkscope 作用域链顶端。

```js
checkscopeContext = {
  AO: {
    arguments: {
      length: 0
    },
    scope: undefined,
    f: reference to function f(){}
  },
  Scope: [AO, globalContext.VO],
  this: undefined
}
```

6.初始化的同时，f函数被创建，保存作用域链到函数的内部属性[[scope]]

```js

f.[[scope]] = [
  checkscopeContext.Scope
]
```

7.checkscope函数执行完毕，checkscope函数上下文从执行上下文中弹出

```js
ECStack = [
  globalContext
]
```

8.执行f函数，f函数执行上下文被创建，压入执行上下文栈

```js
ECStack = [
  fContext,
  globalContext
]
```

9.f函数执行上下文初始化：

复制f函数内的属性[[scope]]创建作用域链
用 arguments 创建活动对象，
初始化活动对象，即加入形参、函数声明、变量声明，
将活动对象压入 f函数 作用域链顶端。

fContext = [
  AO: {
    arguments:{
      length: 0
    }
  },
  Scope: [AO, checkContext.AO, globalContext.VO],
  this: undefined
]

10.f函数执行完毕，f函数上下文从执行上下文中弹出

```js
ECStack = [
  globalContext
]
```
