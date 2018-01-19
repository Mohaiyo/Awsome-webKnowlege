# nodejs

## node的优势

- 前后端使用统一的js语言。

- 采用事件驱动、异步编程，为网络服务而设计

- node采用非阻塞IO机制(异步多线程的IO)，分块传输数据，善于高并发处理

- 基于npm庞大的生态，使用node开发时都能在生态中找到答案

- node基于V8引擎运行，以及异步IO带来性能的极大提升

- 常用的node模块

> http、path、fs、require、queryString、process、url、events。。

## 全局模块

- process

  - process.env: 环境变量(包括端口号)
  - process.argv: 一个包含命令行参数的数组
  - process.platform: 获取当前运行的平台，比如linux,win32等等
  - process.execPath  node启动的程序绝对路径，比如/usr/local/bin/node

- Buffer
  >Buffer类是一个全局变量类型，用来直接处理二进制数据的，支持各种解码编码
  > 图片，文件，视频，音频等等都可以使用buffer来处理。
  ***
  > 常用方法：
  - Buffer.isBuffer(obj) 判断是不是buffer
  - new Buffer(Number/obj/Array/string,encoding)  第二个参数为指定编码，比如utf8。可选
  > 除了new Buffer()，也可以使用Buffer.from()来创建新的Buffer
  - Buffer.isEncoding(encoding)
  > 判断是否是有效的编码
  - buf.toJSON(buffer) Buffer转json
  > buf为你所定义或获取的buffer对象
  - buf.toString(buffer)
  > Buffer编码转换,比如hex(16进制),base64,utf8等等
  - buf.indexOf(val)
  > 和数组的indexOf一样，返回该值在buffer中第一次出现的位置，如果没有就返回-1
  - buf.length  返回该buffer的长度
  - 可使用for of遍历buffer

- module
  - module.exports:  模块的导出
  - module.filename:  模块完全解析后的文件名

- require

- console
> console.error/log/info/warning/time/timeEnd/trace/exit

## 全局属性/方法

- _dirname:  当前目录绝对路径

- _filename： 当前文件绝对路径(包含文件名)

- setInterval/setTimeout

- clearInterval/clearTimeout

- setImmediate/clearImmediate:
  > 延迟调用cb函数,在I/o事件回调后，setInterval/setTimeout之前调用

- module
- require

## path（路径）模块

> 使用: `const path = require('path');`

- path.resolve(string)

  > 把路径或路径片段解析成绝对路径。
  > 如果生成的不是绝对路径，会自动把当前目录解析进去。

- path.join (字符串解析成路径字符串)

  > 使用当前系统的路径分隔符，把所有的参数连接到一起，生成路径。参数必须是字符串。
  > Unix系统是"/"，Windows系统是"\"。

  ```js
  path.join('/api','list','/item')    // 输出'/api/list/item'
  ```
- path.parse(string)

  > 路径字符串解析成路径对象
  > 路径解析，返回一个路径对象。

- path.format(obj)

  > 与path.parse相反，把路径对象解析成具体路径。

- path.isAbsolute(path): 判断是不是绝对路径。

- path.dirname(p):   返回当前目录名

- path.extname(p):   返回拓展名，比如js,html等等

## fs文件系统

- fs.read()/fs.readSync() :    异步/同步读取文件，需要配合fs.open()打开文件

- fs.write()/fs.writeSync():   异步/同步写入文件 ，需要配合fs.open()打开文件

- fs.exits()/fs.exitsSync():   判断文件是否存在

- fs.rename()/fs.renameSync():  文件重命名

- fs.unlink()/fs.unlinkSync():  异步/同步删除文件

- fs.watch()/fs.watchSync():   监听文件变化

- fs.readFile()/fs.readFileSync():  读取文件

- fs.writeFile()/fs.writeFileSync:  写文件

## stream 流处理

- 可读的流
  - http请求/响应;
  - fs读取流;
  - crypto流;
  - TCP套接字;
  - 进程流;

## 查询字符串

- querystring.stringify(obj)

  > 将对象序列化为一个查询字符串,比如'list=user&item=info&role=admin'

- querystring.parse(str)

  > 与1相反，将查询字符串序列化化一个对象。

## string_decoder 字符串解码

```js
const StringDecoder = require('string_decoder').StringDecoder;

const decoder = new StringDecoder('utf8');

// 将Buffer解码为字符串，支持utf8
```

## http模块 （https模块与之类似）

- const server = http.createServer(fun)   // 创建http.Server实例

- server.listen(port)   // 监听端口

- server.on('error',cb)  // 监听错误

- server.close()  // 关闭服务器

## Error模块

- new Error(message):  自定义错误。

## node异步编程

- EventEmitter 事件的监听/订阅

```js
var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();
emitter.on('some_event'，function() {
    console.log('some_event 事件触发');
});
setTimeout(function() {
    emitter.emit('some_event');
}，1000);
```

> EventEmitter实例对象支持的方法列表如下：

```js
emitter.on(name, f) // 监听事件

emitter.emit(name,传参)  // 触发事件

emitter.once(name, f) //与on方法类似，但是监听函数f是一次性的，使用后自动移除

emitter.listeners(name) //返回一个数组，成员是事件name所有监听函数

emitter.removeListener(name, f) //移除事件name的监听函数f

emitter.removeAllListeners(name) //移除事件name的所有监听函数
```

- 通过callback 回调

> 相关的库有async.js

- promise

- generator

- async/await

## node高并发处理

- 消息队列(MQ)

- cache