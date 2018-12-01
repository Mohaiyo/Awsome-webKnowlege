# 遍历器iterator 和for...of循环

- 遍历器的概念
- 默认iterator接口
- 调用iterator接口的场合
- 字符串的Iterator接口
- Iterator接口与generator函数
- 遍历器对象的 return() 和 throw()
- for...of循环

## 1.遍历器的概念

它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。Iterator 的作用有三个：一是为各种数据结构，提供一个统一的、简便的访问接口；二是使得数据结构的成员能够按某种次序排列；三是 ES6 创造了一种新的遍历命令for...of循环，Iterator 接口主要供for...of消费。

> 代码实例

```js
const it = makeIterator([1, 2])

it.next() // {value: 1, done: false}
it.next() // {value: 2, done: false}
it.next() // {value: undefined, done: true}

function makeIterator (arr) {
  var nextIndex = 0
  return {
    next: function () {return nextIndex < arr.length ? {value: arr[nextIndex++], done: false} : {value: undefined, done: true}}
  }
}

// 简写形式 返回的done: false以及 value: undefined是没有必要的

function mekeItertorSimple (arr) {
  let nextIndex = 0
  return {
    next: () => {
      return nextIndex < arr.length ? {value: arr[nextIndex++]} : {done: true}
    }
  }
}
```

## 2.默认Iterator接口

for...of循环。当使用for..of循环遍历某种数据结构的时候，该循环会自动去寻找Iterator接口。
一种数据结构只要部署了 Iterator接口，我们就称这种数据结构是“可遍历的”（iterable）
原生具备 Iterator 接口的数据结构如下。

- Array
- Map
- Set
- String
- TypedArray
- 函数的 arguments 对象
- NodeList 对象

对于原生部署了Iterator接口的数据结构，我们无需再自己写一个遍历生成器函数，使用for...of即可。对象为啥不部署Iterator接口，主要是因为遍历其属性具有不确定性。本质上，遍历器是一种线性处理，对于任何非线性的数据结构，部署遍历器接口，就等于部署一种线性转换。不过，严格地说，对象部署遍历器接口并不是很必要，因为这时对象实际上被当作 Map 结构使用，ES5 没有 Map 结构，而 ES6 原生提供了。

如何进行对对象的改造，让其具有iterator接口属性。

```js
let obj = { // 类数组结构
  data: [ 'hello', 'world' ],
  [Symbol.iterator]() {
    const self = this;
    let index = 0;
    return {
      next() {
        if (index < self.data.length) {
          return {
            value: self.data[index++],
            done: false
          };
        } else {
          return { value: undefined, done: true };
        }
      }
    };
  }
};


let iterable = {
  0: 'x',
  1: 'y',
  2: 'z',
  length: 3,
  [Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for (let item of iterable) {
  console.log(item); // 'x', 'y', 'z'
}

// 普通对象部署数组的Symbol.iterator方法，并无效果。

let iterable = {
  a: 'x',
  b: 'y',
  length: 2,
  [Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for (let item of iterable) {
  console.log(item); // undefined, undefined
}
```

## 3.调用Iterator的场合

(1).解构赋值

> 对数组和Set结构进行解构赋值时，会默认调用Symbol.iterator方法

```js
let set = new Set(['q', 'w', 'e', 'r'])

let [x, y, z] = set  // x => 'q', y => 'w', z => 'e'
let [w, ...rest] = set // w => 'q', rest => ['w', 'e', 'r']
```

(2).扩展运算符

> 扩展运算符（...）也会调用默认的 Iterator 接口。

```js
let arr = ['1', '2']

let arr2 = ['a', ...arr, 'b']

var str = 'hello';
[...str] //  ['h','e','l','l','o']
```

这提供了一种简便机制，可以将任何部署了 Iterator 接口的数据结构，转为数组。即只要某个数据结构部署了 Iterator 接口，就可以对它使用扩展运算符，将其转为数组。

```js
let arr = [...iterable]
```

(3) yield*

> yield 后面跟的是一个可以遍历解构

```js
let generator = function* () {
  yield 1;
  yield* [2,3,4];
  yield 5;
};

var iterator = generator();

iterator.next() // { value: 1, done: false }
iterator.next() // { value: 2, done: false }
iterator.next() // { value: 3, done: false }
iterator.next() // { value: 4, done: false }
iterator.next() // { value: 5, done: false }
iterator.next() // { value: undefined, done: true }
```

(4）其他场合

由于数组的遍历会调用遍历器接口，所以任何接受数组作为参数的场合，其实都调用了遍历器接口。下面是一些例子。

- for...of
- Array.from()
- Map(), Set(), WeakMap(), WeakSet()（比如new Map([['a',1],['b', -2]])）
- Promise.all()
- Promise.race()

## 4.字符串的Iterator

字符串是一个类似数组的对象，也原生具有 Iterator 接口

## 5.Iterator接口与Generator函数

Symbol.iterator方法可以通过Generator函数简单实现

```js
let myIterable = {
  [Symbol.iterator]: function* () {
    yield 'z';
    yield 'x';
    yield 'c';
  }
}

[...myIterable1] // ["z", "x", "c"]

// 或者采用下面的简洁写法

let obj = {
  * [Symbol.iterator]() {
    yield 'hello';
    yield 'jack';
  }
};

for (let x of obj) {
  console.log(x);
}
// "hello"
// "jack"
```

## 6.遍历器对象的return() 与 throw()

## 7.for...of循环

for...of循环可以使用的范围包括数组、Set 和 Map 结构、某些类似数组的对象（比如arguments对象、DOM NodeList 对象）、后文的 Generator 对象，以及字符串。

7.1数组中使用

7.2 Map和Set结构中使用

```js
var engines = new Set(["Gecko", "Trident", "Webkit", "Webkit"]);
for (var e of engines) {
  console.log(e);
}
// Gecko
// Trident
// Webkit

var es6 = new Map();
es6.set("edition", 6);
es6.set("committee", "TC39");
es6.set("standard", "ECMA-262");
for (var [name, value] of es6) {
  console.log(name + ": " + value);
}
// edition: 6
// committee: TC39
// standard: ECMA-262
```

:ps 遍历的顺序是按照各个成员被添加进数据结构的顺序 Set 结构遍历时，返回的是一个值，而 Map 结构遍历时，返回的是一个数组，该数组的两个成员分别为当前 Map 成员的键名和键值

7.3计算生成的数据结构
有些数据结构是在现有数据结构的基础上，计算生成的。比如，ES6 的数组、Set、Map 都部署了以下三个方法，调用后都返回遍历器对象

`entries()` 返回一个遍历器对象，用来遍历[键名, 键值]组成的数组。对于数组，键名就是索引值；对于 `Set`，键名与键值相同。`Map` 结构的 `Iterator` 接口，默认就是调用entries方法。
`keys()` 返回一个遍历器对象，用来遍历所有的键名。
`values()` 返回一个遍历器对象，用来遍历所有的键值。

7.4 类似数组的对象

> nodeList str arguments

并不是所有类似数组的对象都具有 Iterator 接口，一个简便的解决方法，就是使用Array.from方法将其转为数组。

```js
let arrLike = {length: 2, 0: 'a', 1: 'b'}
for (let x of arrLike) {
  console.log(x)
}

for (let y of Array.from(arrLike)) {
  console.log(y) // a b
}

```

7.5对象

对于普通的对象，for...of结构不能直接使用，会报错，必须部署了 Iterator 接口后才能使用。但是，这样情况下，for...in循环依然可以用来遍历键名。

```js
let person = {
  name: 'wayne',
  age: 23,
  gender: 0,
  tel: 18578262001
}
for (let key in person) {
  console.log(key) // name age gender tel
}

for (let okey of person) {
  console.log(okey)
} // Uncaught TypeError: person is not iterable
```

一种解决方法是，使用Object.keys方法将对象的键名生成一个数组，然后遍历这个数组。

```js
for (let key of Object.keys(person)) {
  console.log(`${key}:${person[key]}`) // name:wayne age:23 gender:0 tel:18578262001
}
```

另外一种方法使用 Generator 函数将对象重新包装

```js
function* entries(obj) {
  for (let key of Object.keys(obj)) {
    yield [key, obj[key]];
  }
}

for (let [key, value] of entries(obj)) {
  console.log(key, '->', value);
}
// a -> 1
// b -> 2
// c -> 3
```