# 面试汇总

1. reat dom 原理（虚拟 dom render diff patch）

- 虚拟 dom 可以看做是一颗模拟了 dom 树的 js 对象树

```javascript
var virtualDom = {
  type: "div",
  props: {
    id: "gala",
    class: "gala-bem",
  },
  children: [
    {
      type: "span",
      props: {
        id: "text-id",
        title: "this is a span element",
      },
      children: "我是一段文本",
    },
  ],
};
```

- 为什么使用虚拟 dom,原生 js 的做法,每次数据的小变动都会引起 dom 树的重新渲染.虚拟 dom 的目的是将所有的操作累加起来统计算出所有的变化之后一次更新 dom

- 虚拟 dom diff 算法，给定任意两棵树，采用**先序深度优先遍历**的算法找到最少的转换步骤，DOM-diff 比较两个虚拟 DOM 的区别，也就是在比较两个对象的区别，根据两个虚拟对象创建出补丁，描述改变的内容，将这个补丁用来更新 DOM 先打左边节点 深度优先 再打右边 再回到第二层节点如此反复。 计算两棵树的常规算法大 O 复杂度是 3,O(n^3)

- React diff 算法的时间复杂度是 O(n), DOM 节点跨层级的移动操作少  到可以忽略不计, React 如何做优化 tree diff 同级比较 key, component diff(如果同类型组件，继续执行 tree diff，否则删除组件重新构建整个组件), Element Diff (插入，移动，删除)

- 总结 React 通过制定大胆的 diff 策略，将 O(n3) 复杂度的问题转换成 O(n) 复杂度的问题 React 通过分层求异的策略，对 tree diff 进行算法优化 React 通过相同类生成相似树形结构，不同类生成不同树形结构的策略，对 component diff 进行算法优化 React 通过设置唯一 key 的策略，对 element diff 进行算法优化

  2.css 布局？

这考啥玩意 flex 布局 grid 布局 传统的两列布局 float 布局？

3.js 原型链继承

- 原型链的理解

  prototype 如果对象没有该方法 往原型上寻找 直到 原型对象为 Object.prototype.**proto** 为 null

  prototype 原型对象 每个原型对象都有一个指向构造函数的指针**constructor**，实例都包含一个指向原型对象的隐形指针[[proto]]

- 继承
  
  经典继承 工厂函数 构造函数  原型对象继承  构造函数加原型对象的模式
  
  组合继承

  4.fetch 取消

```javascript
const controller = new AbortController();
const { signal } = controller;
fetch("http://localhost:8000", { signal })
  .then((response) => {
    console.log(`Request 1 is complete!`);
  })
  .catch((e) => {
    console.warn(`Fetch 1 error: ${e.message}`);
  });

// Abort request
controller.abort();
```

4.闭包

闭包能够访问其他函数内部变量的函数。

5.js实现千分位

- 正则的方式 /\d{1,3}(?=(\d{3})+$)/
- reduce方法 string split reverse  index % 3
- 

6.http请求消
  - 消息结构
  - 请求方法
  - content-type: 常见的类型
  - 状态码