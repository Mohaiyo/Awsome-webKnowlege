# 数组的扩展

## 扩展运算符

> 扩展运算符（spread）是三个点（...）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。

- 扩展运算符后面可以放置表达式

```js
const arr = [...(x > 0 ? ['a'] : []), 'b']
```

- 如果扩展运算符后面是一个空数组，则不产生任何效果

```js
[...[], 1]
// [1]
```

- 替代函数apply方法

> 由于扩展运算符可以展开数组，所以不再需要apply方法，将数组转为函数的参数了。

```js
// es5
function fn(x, y, z) {
    //
}
var args = [0, 2, 3]
fn.apply(null, args);

// es6
function f(nx, y, z) {
  // ...
}
let args = [0, 1, 2];
fn(...args);
```

```js
// 利用扩展运算符求最大值
// es5
Math.max.apply(null, [14, 3, 77])

// ES6 的写法
Math.max(...[14, 3, 77])

// 等同于
Math.max(14, 3, 77);

```

```js
// 将一个数组添加到另一个数组的尾部。

let arr1 = [0, 1, 2, 4]
let arr2 = [3, 5]

Array.prototype.push.apply(arr1, arr2)
// [0, 1, 2, 4, 3, 5]

// ES6 的写法
let arr1 = [0, 1, 2];
let arr2 = [3, 4, 5];
arr1.push(...arr2);]
```