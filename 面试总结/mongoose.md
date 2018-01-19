# mongoose

## schemaType 基本模式类型

> (N S B D O M A B) NSB DOM AB

- Mixed：混合类型

```js
const Any = new Schema({
  any: {}
})
// 或者
const Any = new Schema({
  any: Schema.Types.Mixed
})
```

- ObjectId:  Schema.Type.ObjectId

- Array: 数组类型

```js
const Any = new Schema({
    field:[{type:Schema.Types.ObjectId,ref:'Parent'}]
  })

// 插入时使用$push:
update({},{$push:{field:value}})
```

- 字符串：Schema.Types.String

- 数字：Schema.Types.Number

- 日期：Schema.Types.Date

- 布尔值：Schema.Types.Boolean

- Buffer：Schema.Types.Buffer

```js
const exampleSchema = new Schema({
  name: String,
  binary: Buffer,
  living: Boolean,
  updated: { type: Date, default: Date.now },
  age: { type: Number, min: 18, max: 65},
  mixed: Schema.Types.Mixed,
  _someId: Schema.Types.ObjectId,
  array: [],
  ofString: [String],
  ofNumber: [Number],
  ofDates: [Date],
  ofBuffer: [Buffer],
  ofBoolean: [Boolean],
  ofObjectId: [Schema.Types.ObjectId],
  ofMixed: [Schema.Types.Mixed],
  ofArrays: [[]],
  ofArrayOfNumbers: [[Number]],
  nested: {
    stuff: { type: String, lowercase: true, trim: true }
  }
})

// 使用示例

let exampleModel = mongoose.model('Thing', exampleSchema)

let m = new exampleModel;
m.name = 'lowy';
m.age = 25;
m.updated = new Date;
m.binary = new Buffer(0);
m.living = false;
m.mixed = { any: { thing: "I WANT YOU "}};
m.markModified('mixed');
m._someId = new mongoose.Types.ObectId;
m.array.push(1);
m.ofString.push("strings") ;
m.ofNumber.unshift(1,2,3,4);
m.ofDates.addToSet(new Date);
m.ofBuffer.pop();
m.ofMixed = [1, [], 'three',{four: 5}];
m.nested.stuff = 'good';
m.save(callback)
```

- All Schema Types
  - lowercase 保存到数据库之前把字符串转化成小写
  ```js
  var schema2 = new Schema({
    test: {
      type: String,
      lowercase: true // Always convert `test` to lowercase
    }
  });
  ```
  - required
  > boolean or function, 如果为true那么该属性为必须
  - default
  > any or function 设置默认值
  - select
  > boolean 精确设置查询项目？
  - validate
  > function 为此属性增加一个验证函数
  - get
  > 使用Object.defineProperty()自定义一个getter函数
  - set
  > 使用Object.defineProperty()自定义一个setter函数
  - alias
  > string mongoose>=4.10.0 only.定义该属性的别名

```js
// 示例
var numberSchema = new Schema({
  integerOnly: {
    type: Number,
    get: v => Math.round(v),
    set: v => Math.round(v),
    alias: 'i'
  }
});

var Number = mongoose.model('Number', numberSchema);

var doc = new Number();
doc.integerOnly = 2.001;
doc.integerOnly; // 2
doc.i; // 2
doc.i = 3.001;
doc.integerOnly; // 3
doc.i; // 3
```

- 自定义schema类型
  > 需要使用cast()方法

[mongoose官方文档](http://mongoosejs.com/docs/4.x/docs/schematypes.html)

## model 模型

> 模型基于schema，通过调用mongoose.model(模型名称,schema)方法注入

const mymodel = mongoose.model('Mymodel',schema)

## documents 文档

> 文档是模型的实例，也就是document是model的实例.

## 增删改查

- 增
  - model新增： model.create(data,callback)

  - entity新增
  ```js
  const entity = new model(data);
  entity.save(callback);
  ```

- 删
  - model.remove(filter,callback);
  - model.findByIdAndRemove(id,options,callback)
    - options配置如下:
      - sort： 如果有多个查询条件，按顺序进行查询更新。
      - select： 设置数据的返回。
  - model.findOneAndRemove(filter,options,callback);
    - options配置如下:
      - sort： 如果有多个查询条件，按顺序进行查询更新。
      - maxTimeMS： 查询用时上限。
      - select： 设置数据的返回。
- 改
  - model.update(filter,data,options,callback)
  > options的配置与findOneAndUpdate相同
  - model.findOneAndUpdate(filter,data,options,options.passRawResult,options.strict,callback)
    - options.passRawResult为布尔值
    - options.strict为布尔值
      - options配置对象如下
        - new(): 布尔值，是否返回修改后的文档，默认为false
        - upsert: 布尔值，若不存在，是否创建为新的文档，默认为false
        - fields: 对象或字符串，筛选需要更新的字段
        - sort: 字符串，查询时的排序
        - maxTimeMS：超时时间
        - runValidators: 布尔值, 如果值为true，执行Validation验证。
        - setDefaultsOnInsert: 布尔值, 如果upsert选项为true，在新建时插入文档定义的默认值。
        - passRawResult: 布尔值, 如果为true，将原始结果作为回调函数第三个参数。
        - context: 字符串
  - model.findByIdAndUpdate(id,data,options,callback);
    - options的配置与findOneAndUpdate基本相同
    - 不同在于可选择返回的字段: select 对象或字符串

  - model.updateOne(filter,data,options,callback);
  > 一次只更新一条
  - model.updateMany(filter,data,options,callback);
  > 一次更新多条

- 查
  - model.find(filter,select,options,callback);
  - model.findOne(filter,select,callback);
  - model.findById(id,select,callback);

## 复杂查询之——比较运算符查询

- 等于: $equals
> model.find({field:{$equals:value}})

- 不等于：$ne
> model.find({field:{$ne:value}})

- 大于：$gt / 大于等于：$gte
> model.find({field:{$gt:value}})
> model.find({field:{$$gte:value}})

- 小于：$lt / 小于等于：$lte
> model.find({field:{$lt:value}})
> model.find({field:{$lte:value}})

- 是否在数组中：$in
> model.find({filed:{$in:value}})  // 是否存在
> model.find({filed:{$in:[value1,value2,…]}}) 是否存在数组中值的文档

- 是否不在数组中：$nin
> model.find({field:{$nin:value}})

## 复杂查询之——逻辑运算符查询

- 或者：$or
> model.find({$or:[{field1:value},{field2:value}]})

```js
model.find({$or:[{name:'小米'},{age:24}]})
```

- 并且：$and
> model.find({$and:[{field:value},{field:value2}]})

- 都不：$nor
> model.find({$nor:[{field:value},{field:value2}]})

## 复杂查询之——元素运算符查询

- $exists
> 查询的字段值是否存在

```js
model.find({field:{$exists:true}})
```

## 复杂查询之——评估运算符查询

- $mod
> 与数据进行取模运算筛选

```js
model.find({field:{$mod:[4,0]}})
// 查询field字段取模4后，值为0的数据
```

- $regex
> 正则表达式查询

```js
model.find({field:{$regex:"正则表达式"}})
UserModel.find({name:{$regex:"李"}})    // 查询名字中有"李"字的用户
```

- $where
> js表达式查询/多条件查询
> where查询通常与其他查询方法搭配使用，如下：

```js
UserModel.find({})
  .where('name').equals('李白')
  .where('age').gt(18).lt(24)
  .where('adress').in(['china',US])
  .select('name age adress')
  .exec(cb)
```

## 复杂查询之——数组查询

- 普通数组查询

```js
model.find(field:[value1,value2])

// 查询field字段值同时包含[value1,value2]的数据。若是只包含数组中的一个则不返回此数据。
```

- 查询数组的交集：$elemMatch(path,filter)

```js
model.find($elemMatch:{field1:value1,field2;value2});
```

- 查询指定大小的数组：$size

```js
model.find(field:{$size:2})
// 或者
model.where(field).size(2)
```

## 复杂查询之——游标查询

- limit(val)
> 限制返回数量

```js
model.find().limit()
```

- skip(val)
> 跳过前N个查询

```js
model.find().limit(5).skip(10);
```

- sort(str) 排序
> 升序：1/asc
> 降序：-1/desc

```js
model.find().sort({filed1:1,field2:-1})
或者
model.find().sort({field1:'asc',field2:'desc'})
```

- count()
> 查询数量

```js
model.find({field:value}).count(cb)
```

- select(field)
> 筛选返回的字段

```js
model.find().select('field1,field2,field3,…')
model.find().select('-field,-field2,…') // 加-表示排除该字段
```

## 关联查询/联表查询——populate

- 关联单个表

```js
model.find().populate('author',select).exec(cb)

// 或者传入对象详细查询

model.find().populate({
      patch:'author',            // path匹配关联表的字段
      match: { age:{$gt:22} },   // match是一些关联查询条件
      select: '-_id -password',  // select是选择返回的字段
      options: { limit: 5 }      // 一些游标查询条件
    }).exec(cb);
```

- 关联多个表

```js
model.find().populate('form1 form2 form3').exec(cb)
// 等同于
model.find()
    .populate('form1',select)
    .populate('form2',select)
    .populate('form3',select)
    .exec(cb)
// 或者传入对象详细查询(同上)
```

- 多级嵌套查询

```js
model.find()
    .populate({
      path:'form1_field',
      populate:{
        path:'form2_field'
      }
    })
// 解析：查询form1，并且查询form1关联的form2
```

## 聚合查询——aggregate

> 比aggregate更高级的数据分析方法是mapreduce

```js
model.aggregate([
  {
    $match: {
    "shop": shop._id //获取shop字段为shop._id，如同find
    }
  },
  {
    $project : {
        day : {$substr: [{"$add":["$created_at", 28800000]}, 0, 10] },//时区数
        据校准，8小时换算成毫秒数为8*60*60*1000=288000后分割成YYYY-MM-DD日期格式便于分
        组
        "price": 1 //设置原有price字段可用，用于计算总价
    },
  },
  {
    $group: {
        _id:"$day", //将_id设置为day数据
        totalPrice:{$sum: "$price"}, //统计price
  }
  },
  {
    $sort: {_id: 1}//根据date排序
  }
]).exec(function (err, turnover){//返回结果
    console.log(turnover);
});
```

- 代码解读
  - $match用于匹配满足条件的文档，如同find函数。
  - $project用于指示字段是否输出以及字段输出控制。
  - $substr与$add，一个是分割操作，另一个相加操作。
    > 不难发现我们的原始数据created_at字段是具体到秒，因此如果想根据日期进行分割的话，
    > 那么需要将created_at分割成我们想要的日期格式，这其中需要特别注意的是mongoodb存储的数据是按照世界时存储的，
    > 因此进行分割操作时候需要对时间进行时区校正，
    > 因此需使用$add加上时区差8小时(毫秒数)才能得到正确的数据，最后一步便是利用$group进行分组了。
    > 细心的小伙伴可以会发现aggregate自带日期操作$year,$month,$dayOfMonth用于获取年，月，日，
    > 会想着通过这三个参数来拼装成yyyy-MM-dd日期格式，可惜，fidding之前也是这么操作的，
    > 只是最后发现appregate并解析不了，故在此使用了$substr分割方法。

    - $group分组以及统计，其中_id对应值便是我们所需分组的字段数据
    > totalPrice则是用$sum对同组数据的字段price进行求和，并将结果存放于totalPrice中。
    - $sum字段求和。
    - $sort排序。

- 查询结果如下

```js
[
  {_id: "2016-07-01", totalPrice: 30},
  {_id: "2016-07-02", totalPrice: 5}
]
```