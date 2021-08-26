# Call Stack

[Call Stack](https://developer.mozilla.org/zh-CN/docs/Glossary/Call_stack)

```js
function fn() {
  // [1] some codes here
  sayHello()
  // [2] some codes here
}

function sayHello() {
  console.log('Hello call stack')
}

fn();

// [3] some codes here
```

## 调用顺序

- 忽略前面所有的函数，直到fn()函数被调用
- 将fn()添加进调用栈列表
- 执行fn()函数体中的所有代码
- 此时调用栈列表中有fn
- 执行到sayHello()函数时
- 将sayHello()添加到调用栈列表
- 执行sayHello()函数体中的所有代码，直到所有代码都执行完毕
- 此时调用栈列表中有fn sayHello
- 返回来继续执行 fn() 函数体中 sayHello() 后面的代码。
- 删除call stack中的sayHello()函数
- 当 fn() 函数体中的代码全部执行完毕，返回到调用 fn() 的代码行，继续执行剩下的 JS 代码。
- 此时调用栈列表中有fn
- 删除调用栈列表中的 fn() 函数。
