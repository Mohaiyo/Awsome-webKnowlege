# 4.x API

## express()

> 创建一个 Express 应用。express() 是一个由 express 模块导出的入口（top-level）函数

- 用于创建express应用

```js
var express = require('express');
var app = express();
```

- methods

  - express.json([options])

  >  4.16.0以上才可以使用这个中间件 内置中间件方法，基于body-parser

  ``` javascript

  express.json({
    inflate:true, //是否可以处理压缩的请求体bodies 默认为true可以处理
    limit:"100kb", //控制最大的请求体尺寸 可以是单纯的数字
    reviver:null, //JSON.parse  直接作为第二个参数传递？
    strict:true, //严格模式 true 只接受数组或者对象  false接受任何JSON.parse接受的数据
    type:"application/json", //决定此中间件解析什么样的media type
    verify:undefined  // 鉴别
  })

  ```
  ***
  - express.static(root, [options])
  > 内置中间件，基于serve-static 设置静态文件目录 tips:使用反向代理可以提高性能
  ``` javascript
    var options = {
    dotfiles: 'ignore', //以'.'开头的文件或者文件夹被如何处理 默认为忽略这些文件
    etag: false,  //是否生成实体标签  默认是true
    extensions: ['htm', 'html'],  //设置文件扩展名
    fallthrough: true, //客户端请求出错是否继续执行下一个请求？
    index: false,
    maxAge: '1d',  //最大缓存时间
    redirect: false, //重定向
    setHeaders: function (res, path, stat) {  //设置HTTP header方法
      res.set('x-timestamp', Date.now())
    }
  }
  app.use(express.static('public', options))
  ```
  ***
  - express.Router([options])
  > 创建路由实例
  ```javascript
  let options={
    caseSensitive:Disabled, //默认大小写不敏感
    mergeParams:false,   //如果父路由与子路由参数名冲突，子路由的优先级高
    strict:Disabled   //  '/foo'与'/foo/'是一样的
  }
  ```
  ***

  - express.urlencoded([options]

  > 4.16.0以上才可以使用这个中间件  具体参数见 [express官网](http://expressjs.com/)

## Application

- 创建app应用，app拥有的方法(继承)

> 处理路由的http请求的方法   例如post get put delete
> 配置中间件
> 渲染html视图 app.render
> 注册模板引擎  app.engine

- Properties

  - app.locals

  > 本地变量 一旦设置可以在应用任何地方拿到这个本地变量，例如req.app.locals
  ***
  - app.mountpath
  > 应用挂载路径

  ```javascript
  var express = require('express');

  var app = express(); // the main app
  var admin = express(); // the sub app

  admin.get('/', function (req, res) {
    console.log(admin.mountpath); // /admin
    res.send('Admin Homepage');
  });

  app.use('/admin', admin); // mount the sub app 挂载admin到父应用
  ```
  ***
- Events
  - app.on('mount', callback(parent))

  > 监听路由挂载mounted时触发，如果挂载则触发回调

  ```javascript
  var admin = express();

  admin.on('mount', function (parent) {
    console.log('Admin Mounted');
    console.log(parent); // refers to the parent app
  });

  admin.get('/', function (req, res) {
    res.send('Admin Homepage');
  });

  app.use('/admin', admin);
  ```
  ***

- Methods
  - app.all(path, callback [, callback ...])

  > 可以处理所有的HTTP动作
  > 这个方法在给特定前缀路径或者任意路径上处理时会特别有用

  ```javascript
  app.all('/secret', function (req, res, next) {
    console.log('Accessing the secret section ...')
    next() // pass control to the next handler
  });
  ```
  ***
  - app.delete(path, callback [, callback ...])

  ```javascript
  app.delete('/', function (req, res) {
    res.send('DELETE request to homepage');
  });
  ```
  ***

  - app.disable(name)

  > 与 app.set(name,false)一样的

  - app.enable(name)

  > 与 app.set(name,true)一样的

  - app.disabled

  > 返回一个布尔值

  - app.enabled

  > 返回一个布尔值

  ***
  - app.engine(ext, callback)

  > 设置模板引擎

  ***

  - app.get(name)

  > 获取set设置的属性的值

  ***

  - app.get(path,callback[,callback ...])

  > http GET 请求

  ```javascript
  app.get('/', function (req, res) {
    res.send('GET request to homepage');
  });
  ```

  ***

  - app.listen(path, [callback])

  > 这个方法与原生nodejs http.Server.listen() 一样

  ***

  - app.listen(port, [hostname], [backlog], [callback])

  > 与原生nodejs http.Server.listen() 一样

  ***

  - app.METHOD(path, callback [, callback ...])

  > 处理http请求的方法GET,PUT,POST,DELETE,COPY...
  ***
  - app.param([name], callback)

  > 以后再解读，感觉用的不多   主要是处理路由参数之类的
  ***

  - app.path()

  > 返回应用的路径

  ```javascript
  var app = express()
    , blog = express()
    , blogAdmin = express();

  app.use('/blog', blog);
  blog.use('/admin', blogAdmin);

  console.log(app.path()); // ''
  console.log(blog.path()); // '/blog'
  console.log(blogAdmin.path()); // '/blog/admin'
  ```
  ***

  - app.post(path, callback [, callback ...])

  > post请求
  ***

  - app.put(path, callback [, callback ...])

  > put请求
  ***
  - app.render(view, [locals], callback)

  > 渲染模板 跟res.render()相似  除了不能发送渲染的视图到客户端以外  其实是一样的
  ***
  - app.route(path)

  > 返回一个单一路由实例
  ***
  - app.set(name, value)

  > 理论上你在应用上可以设置任何键名，但是有一些内置的app setting name
  ***

  - app.use([path,] callback [, callback...])

  > 使用middleware
  ***

## Request

- Properties
  > express 4 req.files已经被弃用，如果需要上传文件，使用multipart-handling中间件，比如：busboy, multer, formidable, multiparty, connect-multiparty, or pez.
  ***
  - req.app

  > 如果你使用以下的模式去创建一个模块，以中间件的形式暴露出去并且在你的主文件中引入这个中间件，那么这个中间件就可以通过req.app获取得到这个express实例

  ```javascript
  //index.js
  app.get('/viewdirectory', require('./mymiddleware.js'))
  ```
  ***
  ```javascript
  //mymiddleware.js
  module.exports = function (req, res) {
    res.send('The views directory is ' + req.app.get('views'));
  });
  ```

  ***

  - req.baseUrl

  > 与app.mountpath有点类似  但是只会返回匹配的基本路径 返回路由实例挂载的路径

  ***
  - req.body
  > 包含了提交的请求体的键值对，默认是undefined，不过，当你使用body-parsing中间件的时候，req.body植入到中间件内这样你就可以在里面取到请求体的数据
  > 下面的例子可以让你明白怎么第三方中间件怎么植入请求体数据

  ```javascript
  var app = require('express')();
  var bodyParser = require('body-parser');
  var multer = require('multer'); // v1.0.5
  var upload = multer(); // for parsing multipart/form-data

  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

  app.post('/profile', upload.array(), function (req, res, next) {
    console.log(req.body);
    res.json(req.body);
  });
  ```
  ***
  - req.cookie

  > 请求cookie 使用中间件cookie-parser  默认为{}
  > 如果cookie已经被声明，可以使用req.signedCookies
  ***

  - req.fresh

  > 如果请求头为 cache-control:no-cache 那么req.fresh值为true 也就是说没有缓存，必须每次都请求都会刷新
  ***

  - req.hostname

  > 请求的域名

  ```javascript
  // Host: "example.com:3000"
  req.hostname
  // => "example.com"
  ```
  ***

  - req.ip

  ```javascript
  req.ip
  // => "127.0.0.1"
  ```
  ***

  - req.ips

  > 受信任接口ip列表 返回值是一个数组

  ***
  - req.method

  > 请求方法
  ***
  - req.originalUrl

  > ps:req.url 不是express的属性  而是nodejs的原生属性
  > 这个属性与req.url 很相似，但是他可以重写 req.url
  ```javascript
  // GET /search?q=something
  req.originalUrl
  // => "/search?q=something"
  ```
  > 在中间件中，req.originalUrl 是 req.baseUrl 和 req.path的组合
  ```javascript
  app.use('/admin', function(req, res, next) {  // GET 'http://www.example.com/admin/new'
    console.log(req.originalUrl); // '/admin/new'
    console.log(req.baseUrl); // '/admin'
    console.log(req.path); // '/new'
    next();
  });
  ```
  ***
  - req.params
  > 请求参数 默认为{}
  ```javascript
  // GET /user/tj
  req.params.name
  // => "tj"
  ```
  > 如果使用正则表达式  则获取的参数形式是 req.params[n]
  ***

  - req.path
  ```javascript
  // example.com/users?sort=desc
  req.path
  // => "/users"
  ```
  ***

  - req.protocol
  ***
  - req.query
  > 请求查询参数
  ```javascript
  // GET /search?q=tobi+ferret
  req.query.q
  // => "tobi ferret"

  // GET /shoes?order=desc&shoe[color]=blue&shoe[type]=converse
  req.query.order
  // => "desc"

  req.query.shoe.color
  // => "blue"

  req.query.shoe.type
  // => "converse
  ```
  ***
  - req.route
  > 例子
  ```javascript
  app.get('/user/:id?', function userIdHandler(req, res) {
    console.log(req.route);
    res.send('GET');
  });
  ```
  > 上面的代碼會返回
  ```javascript
  { path: '/user/:id?',
    stack:
    [ { handle: [Function: userIdHandler],
        name: 'userIdHandler',
        params: undefined,
        path: undefined,
        keys: [],
        regexp: /^\/?$/i,
        method: 'get' } ],
    methods: { get: true } }
  ```
  ***

  - req.secure

  > 等同于 'https' == req.protocol;
  ***

  - req.signedCookies
  >声明一个cookie不是为了隐藏或者加密，其作用主要是用于防止篡改

  ```javascript
  // Cookie: user=tobi.CP7AWaXDfAKIRfH49dQzKJx7sKzzSoPq7/AcBBRVwlI3
  req.signedCookies.user
  // => "tobi"
  ```
  ***

  - req.subdomains

  > 获取请求子域名

  ```javascript
  // Host: "tobi.ferrets.example.com"
  req.subdomains
  // => ["ferrets", "tobi"]
  ```
  ***
  - req.xhr
  > 如果发起请求的请求头是  X-Requested-With:XMLHttpRequest 其值为true   如果是fetch 是false
  ***

- Methods

  - req.accepts(types)
  > 基于HTTP请求头，检查content type是否符合要求的类型，如果请求返回的数据类型不符合要求，返回false(这种情况下，应用应该返回406 'Not Acceptable')
  > type 值可能是一种单一的MIME类型，比如'application/json',但是可以扩展，可以是用逗号分隔的列表或者数组。

  ```javascript
  // Accept: text/*, application/json
  req.accepts('html');
  // => "html"
  req.accepts('text/html');
  // => "text/html"
  req.accepts(['json', 'text']);
  // => "json"
  req.accepts('application/json');
  // => "application/json"

  // Accept: text/*, application/json
  req.accepts('image/png');
  req.accepts('png');
  // => undefined

  // Accept: text/*;q=.5, application/json  逗号 “,” 作为规则分隔符，q代表客户端对该媒体类型的喜好系数。
  req.accepts(['html', 'json']);
  // => "json"  因为客户端偏向于application/json 所以返回的是json
  ```
  - req.get(field)
  > 精确返回HTTP请求头 大小写不敏感

  ```js
  req.get('Content-Type');
  // => "text/plain"

  req.get('content-type');
  // => "text/plain"

  req.get('Something');
  // => undefined

  ```
  - req.is(type)

  > 如果请求头content-type跟传进来的参数type匹配，则返回匹配的类型，否则返回false

  ```js
  // With Content-Type: text/html; charset=utf-8
  req.is('html');       // => 'html'
  req.is('text/html');  // => 'text/html'
  req.is('text/*');     // => 'text/*'

  // When Content-Type is application/json
  req.is('json');              // => 'json'
  req.is('application/json');  // => 'application/json'
  req.is('application/*');     // => 'application/*'

  req.is('html');
  // => false
  ```

  - req.param(name [, defaultValue])

  > 该方法已经被废弃，不再使用  请用req.params, req.body or req.query代替

  - req.range(size[, options])

  > size 参数是表示请求可以携带的最大数据

## Response 响应

> 表示一个express应用接收到http请求时的响应

```js
app.get('/user/:id', function(req, res){
  res.send('user ' + req.params.id);
});
```

- Properties

  - res.app
  > 和req.app一样的，返回中间见应用的实例

  - res.headersSent
  > Boolean property that indicates if the app sent HTTP headers for the response.

  ```js
  app.get('/', function (req, res) {
    console.log(res.headersSent); // false
    res.send('OK');
    console.log(res.headersSent); // true
  });
  ```

  - res.locals

  >真心不太明白用来干啥？

  ```js
  app.use(function(req, res, next){
    res.locals.user = req.user;
    res.locals.authenticated = ! req.user.anonymous;
    next();
  });
  ```

- Methods

  - res.append(field [, value])
  > res.append() is supported by Express v4.11.0+
  > 在响应头后插值，如果响应头没有设置，则使用该值设置
  > Note: calling res.set() after res.append() will reset the previously-set header value.

  ```js
  res.append('Link', ['<http://localhost/>', '<http://localhost:3000/>']);
  res.append('Set-Cookie', 'foo=bar; Path=/; HttpOnly');
  res.append('Warning', '199 Miscellaneous warning');
  ```

  - res.attachment([filename])

  > 返回附件？
  > 设置HTTP响应  Content-Disposition 头部信息为 'attachment',如果存在filename,则会基于文件类型res.type()扩展名设置Content-Type，并且设置 Content-Disposition “filename=” 参数

  ```js
  res.attachment();
  // Content-Disposition: attachment

  res.attachment('path/to/logo.png');
  // Content-Disposition: attachment; filename="logo.png"
  // Content-Type: image/png
  // 思考 如果是pdf格式的文件呢？
  ```

  - res.cookie(name, value [, options])

  > 设置返回的cookie键值对
  > The options parameter is an object that can have the following properties.

  | 属性    | 类型      | 描述                                                               |
  | ------  | --------- |:------------------------------------------------------------------ |
  | domain  | String   | Domain name for the cookie. Defaults to the domain name of the app. |
  | encode  | Function |  A synchronous function used for cookie value encoding. Defaults to encodeURIComponent.|
  | expires | Date     | Expiry date of the cookie in GMT. If not specified or set to 0, creates a session cookie.|
  | httpOnly | Boolean  | Flags the cookie to be accessible only by the web server            |
  | maxAge  | Number   |  Convenient option for setting the expiry time relative to the current time in milliseconds.|
  | path    | String   |  Path for the cookie. Defaults to “/”.                              |
  | secure  | Boolean  |  Marks the cookie to be used with HTTPS only.                       |
  | signed  | Boolean  |  Indicates if the cookie should be signed.                          |
  | sameSite | Boolean or String | Value of the “SameSite” Set-Cookie attribute.              |

  ```js
  res.cookie('name', 'tobi', { domain: '.example.com', path: '/admin', secure: true });
  res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true });
  ```

  > You can pass an object as the value parameter; it is then serialized as JSON and parsed by bodyParser() middleware.

  ```js
  res.cookie('cart', { items: [1,2,3] });
  res.cookie('cart', { items: [1,2,3] }, { maxAge: 900000 });
  ```

  > When using **cookie-parser** middleware, this method also supports signed cookies. Simply include the signed option set to true. Then res.cookie() will use the secret passed to cookieParser(secret) to sign the value.

  ```js
  res.cookie('name', 'tobi', { signed: true });
  ```

  - res.clearCookie(name [, options])
  > 通过name来清除cookie,option 可选选项，详见res.cookie

  ```js
  res.cookie('name', 'tobi', { path: '/admin' });
  res.clearCookie('name', { path: '/admin' });
  ```

  - res.download(path [, filename] [, fn])
  > 下载文件 在当前path传输文件附件 ，一般来说，浏览器会提示用户是否需要下载
  > 当文件传输过程中出错或者文件传输完成，此方法可以使用可选的回调函数fn。此方法使用res.sendFile()来传输文件

  ```js
  res.download('/report-12345.pdf');

  res.download('/report-12345.pdf', 'report.pdf');

  res.download('/report-12345.pdf', 'report.pdf', function(err){
    if (err) {
      // Handle error, but keep in mind the response may be partially-sent
      // so check res.headersSent
    } else {
      // decrement a download credit, etc.
    }
  });

  ```
  - res.end([data] [, encoding])
  > 结束响应进程，此方法实际来源于nodejs核心，尤其是`response.end() method of http.ServerResponse.`
  > 通常用于快速结束此响应进程，如果要发送数据，最好使用res.send()或者res.json()

  ```js
  res.end();
  res.status(404).end();
  ```

  - res.format(object)
  > 内容有点多 自己看英文去 大抵是内容协商，就是请求的数据格式与返回的数据格式能否对的上号
  ```js
  res.format({
    'text/plain': function(){
      res.send('hey');
    },

    'text/html': function(){
      res.send('<p>hey</p>');
    },

    'application/json': function(){
      res.send({ message: 'hey' });
    },

    'default': function() {
      // log the request and respond with 406
      res.status(406).send('Not Acceptable');
    }
  });
  ```

  > In addition to canonicalized MIME types, you may also use extension names mapped to these types for a slightly less verbose implementation:

  ```js
  res.format({
    text: function(){
      res.send('hey');
    },

    html: function(){
      res.send('<p>hey</p>');
    },

    json: function(){
      res.send({ message: 'hey' });
    }
  });
  ```

  - res.get(field)

  ```js
  res.get('Content-Type');
  // => "text/plain"
  ```

  - res.json([body])
  > 说白了如果发送的数据是对象或者数组，那么就等同于res.send()方法，然而他还有一个用处就是你可以使用该方法把值转换成json格式。比如说null/undefined

  ```js
  res.json(null)
  res.json({ user: 'tobi' })
  res.status(500).json({ error: 'message' })
  ```

  - res.jsonp([body])
  > 返回jsonp

  ```js
  res.jsonp(null)
  // => null

  res.jsonp({ user: 'tobi' })
  // => { "user": "tobi" }

  res.status(500).jsonp({ error: 'message' })
  // => { "error": "message" }
  ```

  > By default, the JSONP callback name is simply callback. Override this with the jsonp callback name setting.
  > The following are some examples of JSONP responses using the same code:

  ```js
  // ?callback=foo
  res.jsonp({ user: 'tobi' })
  // => foo({ "user": "tobi" })

  app.set('jsonp callback name', 'cb');

  // ?cb=foo
  res.status(500).jsonp({ error: 'message' })
  // => foo({ "error": "message" })
  ```

  - res.redirect([status,] path)
  > 重定向
  > 与当前路由有很大关系，决定了重定向到什么路由 与有没有`/`也有很大的关系

  - res.render(view [, locals] [, callback])
  > 主要用于模板渲染，如ejs等
  > 发送渲染后的视图到客户端

  - res.send([body])

  > 发送http响应
  > The body parameter can be a Buffer object, a String, an object, or an Array

  ```js
  res.send(new Buffer('whoop'));
  res.send({ some: 'json' });
  res.send('<p>some html</p>');
  res.status(404).send('Sorry, we cannot find that!');
  res.status(500).send({ error: 'something blew up' });
  ```

  - res.sendFile(path [, options] [, fn])
  > 该方法只在v4.8.0以上版本可用

  ```js
  app.get('/file/:name', function (req, res, next) {

    var options = {
      root: __dirname + '/public/',
      dotfiles: 'deny',
      headers: {
          'x-timestamp': Date.now(),
          'x-sent': true
      }
    };

    var fileName = req.params.name;
    res.sendFile(fileName, options, function (err) {
      if (err) {
        console.log(err);
        res.status(err.status).end();
      }
      else {
        console.log('Sent:', fileName);
      }
    });

  })
  ```
  > res.sendFile provides fine-grained support for file serving as illustrated in the following example:
  > 类似于权限控制？
  ```js
  app.get('/user/:uid/photos/:file', function(req, res){
    var uid = req.params.uid
      , file = req.params.file;

    req.user.mayViewFilesFrom(uid, function(yes){
      if (yes) {
        res.sendFile('/uploads/' + uid + '/' + file);
      } else {
        res.status(403).send('Sorry! you cant see that.');
      }
    });
  });
  ```

  - res.sendStatus(statusCode)

  ```js
  res.sendStatus(200); // equivalent to res.status(200).send('OK')
  res.sendStatus(403); // equivalent to res.status(403).send('Forbidden')
  res.sendStatus(404); // equivalent to res.status(404).send('Not Found')
  res.sendStatus(500); // equivalent to res.status(500).send('Internal Server Error')
  ```

  - res.set(field [, value])

  ```js
  res.set('Content-Type', 'text/plain');

  res.set({
    'Content-Type': 'text/plain',
    'Content-Length': '123',
    'ETag': '12345'
  })
  ```

  - res.status(code)

  ```js
  res.status(403).end();
  res.status(400).send('Bad Request');
  res.status(404).sendFile('/absolute/path/to/404.png');
  ```

  - res.type(type)

  ```js
  res.type('.html');              // => 'text/html'
  res.type('html');               // => 'text/html'
  res.type('json');               // => 'application/json'
  res.type('application/json');   // => 'application/json'
  res.type('png');                // => image/png:
  ```

## Router

> 路由对象是一个独立于中间件以及路由的实例，你可以认为他是一个微应用，胜任单独的路由功能！

- Router([options])
> Create a new router as follows:

```js
var router = express.Router([options]);
```

>options参数如下

| Property      | Description                                                             | Default  |
| ------------- | ----------------------------------------------------------------------- | -------- |
| caseSensitive | Enable case sensitivity.                                                | Disabled |
| mergeParams   | 维护从父路由得到的req.params,如果父子路由有冲突的参数名，子路由参数值优先级高 | false    |
| strict        | Enable strict routing.                                                  | Disabled |

> 可以使用get, put, post等以及其他任何的中间件

```js
// invoked for any requests passed to this router
router.use(function(req, res, next) {
  // .. some logic here .. like any other middleware
  next();
});

// will handle any request that ends in /events
// depends on where the router is "use()'d"
router.get('/events', function(req, res, next) {
  // ..
});
```
