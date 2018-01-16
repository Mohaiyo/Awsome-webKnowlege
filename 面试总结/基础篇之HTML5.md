# HTML5

## HTML5基本知识

> 主要考察基本的知识点，如

### HTML5声明

```html
 <!DOCTYPE html>
```

### meta标签

## HTML5新特性

> 新特性很多，只列举常用的。

### 新元素

- 新增语义化标签：

> 布局：header、footer、aside、aticle、section、nav
> 功能：progress、figure、time

- 新的input类型:

> 常用：number、time、url、date、email、month、search、calendar
> 其他：datetime、datetime-local、range、tel、week
> 属性：autocomplete、placeholder、min/max、required

- 新的功能性标签

> canvas、audio、video、source、embed(比iframe强大)

- 新的长度单位：rem

> 1rem等于html标签的font-size大小

### 多媒体

- audio 音频:

```html
<audio controls>
  <source src="horse.ogg" type="audio/ogg">
  <source src="horse.mp3" type="audio/mpeg">
</audio>
```

- video 视频:

```html
<video width="320" height="240" controls>
  <source src="movie.mp4" type="video/mp4">
  <source src="movie.ogg" type="video/ogg">
</video>
```

### 图形图像

- canvas:

> 位图。与svg不同，canvas基于JavaScript来绘制 2D 图形。 不支持事件处理器和dom操作。HTML5 的 canvas 元素使用 JavaScript 在网页上绘制图像。画布是一个矩形区域，您可以控制其每一像素。

- svg:

> 矢量图。  适用于2D小游戏，图形图表等。svg是基于xml来描述 2D 图形的,支持事件处理器和dom操作。图像放大或者改变尺寸，图形质量不会改变。

- webGL:

> 基于JavaScript的web图形库，可在`<canvas>`标签中使用。 常用于开发地图，游戏以及3D展示。

### 地理定位

- Geolocation:

```js
const getLocation ()=>{

  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(callback,errCallback)
  }else{
      // "该浏览器不支持获取地理位置。";
  }
}

// callback中可获取当前经纬度。

// errCallback处理定位出错(无定位权限、定位失败等)
```

### web缓存与存储

- web缓存:
  - appication cache。
    > HTML5引入了应用程序缓存，意味着web应用也可以进行缓存了，有三个优势1、离线浏览 2、速度 3、减少服务器负担
    - 首先，配置manifest文件，并和代码一起放在服务器上(根目录)
    - 给html标签配置manifest属性，属性值等于manifest文件文件名。建议以`".appcache"`结尾。

  - manifest文件配置格式:
    - 由三部分组成，分别是：CACHE MANIFEST、NETWORK、FALLBACK

    > v1.0版本--注释前面应该有#
    > CACHE MANIFEST (在此标题下列出的文件将在首次下载后进行缓存)
    > /style.css
    > /loading.gif
    > /favicon.ico
    > /index.js
    ***
    > NETWORK (在此标题下列出的文件需要与服务器的连接，且不会被缓存)
    > /login.js
    > /data.js
    ***
    > FALLBACK (在此标题下列出的文件规定当页面无法访问时的回退页面(比如 404 页面))
    > /html/ /offline.html (注意: 第一个 URI 是资源，第二个是替补。)
    > 完整的mainifest文件

    ```appcache
    CACHE MANIFEST
    # 2012-02-21 v1.0.0
    /theme.css
    /logo.gif
    /main.js

    NETWORK:
    login.asp

    FALLBACK:
    /html5/ /404.html
    ```

- web存储

  - cookie (大小限制，不能跨域，可设置期限、与服务器通信)

  - locaStorage (限制5M，不能跨域，永久存储)

  - sessionStorage (限5M,不跨域，临时存储)

  - websql (离线本地数据库，不再更新)

  > iOS8、9的wkWebview不支持websql。

  - IndexedDB

  > 数据存储规范，但不是基于SQL，而是基于对象。Android4.4以上和iOS8以上才支持indexedDB。

  - plus.navigator.setCookie (支持跨域的cookie)

  > iOS8以后的wkWebview不支持setcookie

  - plus.storage (键值对，可跨域、无大小限制，但比locaStorage慢)

  - plus.io (针对文件的读写)

- 处理缓存更新的方法：

  - 给html、css、js都加上哈希值hash或者时间戳来解决

  - 禁用缓存，设置cache-control，如下：
  ```html5
  <meta http-equiv="expires" content="0">

  <meta http-equiv="pragma" content="no-cache">

  <meta http-equiv="cache-control" content="no-cache">
  ```

### 新通信方式

- websocket:

> websocket基于'ws'通信协议，用于长连接实时通信。

```js
var ws = new WebSocket("ws://localhost:9998/echo");

  ws.onopen = ()=>{
    // 连接成功的回调
    ws.send("已连接成功，请发送数据过来");
  }

  ws.onmessage = (evt)=>{
    // 接收数据
    const data = evt.data;
    ws.close();
  }

  ws.onclose = ()=>{
    // 连接已关闭
  }

  ws.onerror = ()=>{
    // 通信出错
  }
```

- web workers

```js
const w=new Worker("demo_workers.js");

w.onmessage = (event) =>{

  const data = event.data;

}
```

- SSE (服务器推送):

  - SSE是Server-sent Events的简称，是服务器推送事件。仅IE不支持。

  - 传统的实时通信方式有ajax轮询、comet(长连接)。

  - 而websocket和sse、以及http2的服务器推送都是全新的实时通信方式。

  - sse基于http协议，它的MIME类型为：text/event-stream。
  ```js
  const source = new EventSource("/api/user/get");

  source.onopen = () =>{
    // 通往服务器的连接被打开
  }

  source.onmessage= (event) =>{
    const data = event.data;
  };

  source.onerror= (err) =>{
    // 错误
  };

  source.addEventListener('myevent', function(e) {
    console.log(e.data);
  });

  // 解决sse不兼容ie问题的polyfill:(https://github.com/Yaffle/EventSource)
  ```
- XMLHttpRequest level 2 :

> 简称xhr2，基于http协议，是xhr的升级版，随着HTML5的到来而到来。xhr2不属于HTML5。

```js
xhr = new XMLHttpRequest();
xhr.open('GET', '/api/user/get');
var formData = new FormData();
formData.append(file);
xhr.send(formData);
xhr.onreadystatechange = () =>{
　 if ( xhr.readyState == 4 && xhr.status == 200 ) {
　　 alert( xhr.responseText );
　 } else {
　　 alert( xhr.statusText );
　 }
};
```

> xhr2的新特性：
***
a. 可以设置HTTP请求的时限。
b. 可以使用FormData对象管理表单数据。
c. 可以上传文件。
d. 可以请求不同域名下的数据（跨域请求）。
e. 可以获取服务器端的二进制数据。
f. 可以获得数据传输的进度信息。
***

### 拖拽

- 在拖动元素设置draggable="true"，可拖动。

- ondragstart() -- 开始拖拽。

- ondrag() -- 元素在拖动。

- ondragenter -- 进入目标元素。

- ondragover  -- 在目标元素内移动。

- ondragleave -- 从目标元素离开。

- ondrop  -- 放置到目标元素。

- ondragend -- 元素落下，拖拽完成。
