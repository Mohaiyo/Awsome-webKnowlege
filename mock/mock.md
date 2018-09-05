# mock.js

## 语法规范

Mock.js 的语法规范包括两部分：

- 数据模板定义规范（Data Template Definition，DTD）
- 数据占位符定义规范（Data Placeholder Definition，DPD

### 数据模板定义规范 DTD

***

数据模板中的每个属性由 3 部分构成：属性名、生成规则、属性值:

```js
// 属性名   name
// 生成规则 rule
// 属性值   value
'name|rule': value
```

> rule由value值来确定
> rule的详细规则见官方文档

### 数据占位符定义规范 DPD

占位符 只是在属性值字符串中占个位置，并不出现在最终的属性值中。

> 占位符实际的使用规则见官方文档