# 默认类型转换

> 在比较或者加法运算符中，都会涉及到将运算符两侧的操作对象转换为原始对象的步骤。toPrimitive函数就是执行这种转换的。

```js
let toPrimitive = function (obj, prefferedType) {
  let APIs = {
    typeOf: function (obj) {
      return Object.prototype.toString.call(obj).slice(8, -1)
    },
    isPrimitive: function (obj) {
      let _this = this
      let types = ['Null', 'Undefined', 'String', 'Boolean', 'Number']
      return types.indexOf(_this.typeOf(obj)) !== -1
    }
  }
  if(APIs.isPrimitive(obj)) {return obj}
  // 对于 Date 类型，会优先使用其 toString 方法；否则优先使用 valueOf 方法
  preferredType = (preferredType === 'String' || APIs.typeOf(obj) === 'Date' ) ? 'String' : 'Number';
  if(preferredType === 'Number'){
    if(APIs.isPrimitive(obj.valueOf())) { return obj.valueOf()}
    if(APIs.isPrimitive(obj.toString())) { return obj.toString()}
  }else{
    if(APIs.isPrimitive(obj.toString())) { return obj.toString()}
    if(APIs.isPrimitive(obj.valueOf())) { return obj.valueOf()}
  }
  throw new TypeError('TypeError')
}
```

*对于数组类型的隐式转换，使用valueOf转换之后还是数组，所以数组类型的隐式转换结果是字符串*