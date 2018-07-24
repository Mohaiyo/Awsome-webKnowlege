# Set 和 Map 数据结构

## set

### 基本用法

> Set 类似于数组，但是其成员都是唯一的，没有重复的值。
> Set 本身是一个构造函数，用来生成Set数据结构

```js
let s = new Set();

let arr = [2, 3, 4, 5, 6, 2, 5, 3]

arr.forEach(item => s.add(item))

for( let i of s ){
    console.log(i)
}
// 2 3 4 5 6
```

> 可以用于数组去重
> 向Set加入值的时候，不会发生类型转换，所以5和'5'是两个不同的值。
> set 内部判断两个值是否不同，使用的算法叫做“Same-value-zero equality”，它类似于精确相等运算符（===），主要的区别是NaN等于自身，而精确相等运算符认为NaN不等于自身。

```js
let set = new Set();
let a = NaN;
let b = NaN;
set.add(a);
set.add(b);
set // Set {NaN}


let set2 = new Set();

set2.add({});
set2.size // 1

set2.add({});
set2.size // 2

```

### Set实例的属性和方法

> Set 实例的方法分为两大类：操作方法和遍历方法
- add(value): 添加某个值，返回Set结构本身
- delete(value) : 删除某个值，返回布尔值，表示是否删除成功
- has(value): 返回一个布尔值，表示是否存在该成员
- clear(): 清除所有成员，没有返回值

```js
let s = new Set()
s.add(1).add(2).add(1)

s.size
// 2

s.has(1)
// true
s.has(2)
//true

s.delete(1)

// true 
s.delete(3)

// false

s.clear()

// undefined

s

// Set(0) {}

```

> 如何去除重复数组成员

```js

function dedupe(arr){
    return Array.from(new Set(arr));
}

// 此方法对于数组对象无效
```

### 遍历操作

- keys()
- values()
- entries()
- forEach()

```js
let s2 = new Set(['a', 'b', 'c'])

for(let item of s2.keys()){
    console.log(item)
}
// 'a'
// 'b'
// 'c'

for(let item of s2.values()){
    console.log(item)
}
// 'a'
// 'b'
// 'c'

for(let item of s2.entries()){
    console.log(item)
}
// ['a', 'a']
// ['b', 'b']
// ['c', 'c']
```

> Set 结构的实例默认可遍历，它的默认遍历器生成函数就是它的values方法。

```js
Set.prototype[Symbol.iterator] === Set.prototype.values
// true
```

> 这意味着，可以省略values方法，直接用for...of循环遍历 Set。

```js
let s3 = new Set(['a', 'b', 'c'])

for (let item of s3){
    console.log(item)
}
// 'a'
// 'b'
// 'c'
```

> forEach方法与数组的类似

```js
let s4 = new Set([3, 6, 9])

s4.forEach((val, key) => {
    console.log(key +  ':' + val)
})
// 3:3
// 6:6
// 9:9
```

## Map

### 含义以及基本用法

> JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。这给它的使用带来了很大的限制。

```js
const data = {}
const el = document.getElementById('myDiv')

data[el] = 'metadata';
data['[object HTMLDivElement]'] // "metadata"
// 上面代码原意是将一个 DOM 节点作为对象data的键，但是由于对象只接受字符串作为键名，所以element被自动转为字符串[object HTMLDivElement]。
```
> 为了解决这个问题，ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适。

```js
const m = new Map();
const o = {p: 'Hello World'};

m.set(o, 'content')
m.get(o) // "content"

m.has(o) // true
m.delete(o) // true
m.has(o) // false
```
