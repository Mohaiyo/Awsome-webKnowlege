# vue-ssr初探

> 总结在feedforfun ssr上面遇到的问题以及解决方法

## ssr基础知识

### vue-ssr概念

> 服务器渲染的 Vue.js 应用程序也可以被认为是"同构"或"通用"，因为应用程序的大部分代码都可以在服务器和客户端上运行

### why-ssr

- 更好的seo,由于搜索引擎爬虫抓取工具可以直接查看完全渲染的页面
- google与bing可以进行同步代码应用程序进行索引**同步是关键**
- 更快的内容到达时间(time-to-content)

> 进行ssr之前的一些限制于权衡
- 开发条件受限--编写通用代码
- 构建设置与部署更多要求--ssr 需要处于 Node.js server 运行环境
- 更多的服务器端负载

### 基本用法

- 安装(npm/yarn)
- 渲染一个实例
- 通过koa或者express与服务器进行集成
- 使用页面模板(转义与不转义插值)
>  <!--vue-ssr-outlet--> 标记注入，类似于一个占位符
> 模板插值
> 资源加载等
> clientmanifest

### 编写通用代码

> 由于客户端环境与服务器环境api的差异存在。不同环境中，代码将不会完全相同，所谓的同构

- 服务器上的数据响应(客户端 服务端 渲染确定性-数据预取 pre-fetching data 响应式数据在服务端渲染是禁用的--为啥禁用)
- 组件生命周期钩子函数(服务端只会调用到beforeCreate 和 created)
- 访问特定平台(Platform-Specific) API(window document) 对于仅浏览器可用的 API，通常方式是，在「纯客户端(client-only)」的生命周期钩子函数中惰性访问(lazily access)它们。
- 自定义指令(大多数自定义指令直接操作 DOM，因此会在服务器端渲染(SSR)过程中导致错误)

### 源码结构

- 避免单例状态? **why?** **Node.js 服务器是一个长期运行的进程。当我们的代码进入该进程时，它将进行一次取值并留存在内存中。这意味着如果创建一个单例对象，它将在每个传入的请求之间共享**
- 其他用户访问这个实例他也会拿到这个实例的状态( router store vue都使用工厂函数，每次请都创建新的应用程序实例)
- 构建步骤 对于客户端应用程序和服务器应用程序，我们都要使用 webpack 打包 - 服务器需要「服务器 bundle」然后用于服务器端渲染(SSR)，而「客户端 bundle」会发送给浏览器，用于混合静态标记。

![vue-ssr](https://cloud.githubusercontent.com/assets/499550/17607895/786a415a-5fee-11e6-9c11-45a2cfdf085c.png)

- 使用webpack的源码结构

### 路由与代码分割

### **数据预取和状态**

- 数据预取存储容器(data store) 最好掌握vux理解vux的用法

>前后端分离，ssr需要用到异步数据，开始渲染之前，为了确定状态快照，需要先预取和解析这些数据
***
>在客户端，需要获取到与服务端应用程序完全相同的数据-如果不同会混合失败
***
>Vux的使用
***

- 带有逻辑配置的组件(Logic Collocation with Components)
> 在路由组件中放置数据预取逻辑
***
> asyncData(无法调用this)

- 服务端数据预取
> 在 entry-server.js 中，我们可以通过路由获得与 router.getMatchedComponents() 相匹配的组件，如果组件暴露出 asyncData，我们就调用这个方法。然后我们需要将解析完成的状态，附加到渲染上下文(render context)中。Promise

- 客户端数据预取(判断匹配的组件有没有预取数据钩子)
  - 1.在路由导航之前解析数据(feedforfun用的是这种)
  - 2.匹配要渲染的视图后，再获取数据(beforeMount)

- Store 代码拆分(Store Code Splitting)

### 客户端激活

> 客户端激活，指的是 Vue 在浏览器端接管由服务端发送的静态 HTML，使其变为由 Vue 管理的动态 DOM 的过程。
> 客户端标记混合可能存在的一些坑

### bundle Renderer指引

> 有几大优点
- 内置source Map
- 开发过程中支持HMR
- 关键css注入
- clientManifest

### 构建配置

- 服务端配置 用与生成传递给createBundleRenderer 的 sever Bundle
- 客户端配置
> 除了 server bundle 之外，我们还可以生成客户端构建清单(client build manifest)。使用客户端清单(client manifest)和服务器 bundle(server bundle)，renderer 现在具有了服务器和客户端的构建信息，因此它可以自动推断和注入资源预加载 / 数据预取指令(preload / prefetch directive)，以及 css 链接 / script 标签到所渲染的 HTML。

### css管理

### head管理

> seo优化以及自定义meta信息等

### 缓存

虽然 Vue 的服务器端渲染(SSR)相当快速，但是由于创建组件实例和虚拟 DOM 节点的开销，无法与纯基于字符串拼接(pure string-based)的模板的性能相当。在 SSR 性能至关重要的情况下，明智地利用缓存策略，可以极大改善响应时间并减少服务器负载

- 页面级别缓存(Page-level Caching)

如果内容不是用户特定(user-specific)（即对于相同的 URL，总是为所有用户渲染相同的内容），我们可以利用名为 micro-caching 的缓存策略，来大幅度提高应用程序处理高流量的能力,这通常在 Nginx 层完成，但是我们也可以在 Node.js 中实现它

```js
const microCache = LRU({
  max: 100,
  maxAge: 1000 // 重要提示：条目在 1 秒后过期。
})

const isCacheable = req => {
  // 实现逻辑为，检查请求是否是用户特定(user-specific)。
  // 只有非用户特定(non-user-specific)页面才会缓存
}

server.get('*', (req, res) => {
  const cacheable = isCacheable(req)
  if (cacheable) {
    const hit = microCache.get(req.url)
    if (hit) {
      return res.end(hit)
    }
  }

  renderer.renderToString((err, html) => {
    res.end(html)
    if (cacheable) {
      microCache.set(req.url, html)
    }
  })
})
```

由于内容缓存只有一秒钟，用户将无法查看过期的内容。然而，这意味着，对于每个要缓存的页面，服务器最多只能每秒执行一次完整渲染

- 组件级别缓存(Component-level Caching)
> 要启用组件级别缓存，你需要在创建 renderer 时提供具体缓存实现方式(cache implementation)。典型做法是传入 lru-cache：

```js
const LRU = require('lru-cache')

const renderer = createRenderer({
  cache: LRU({
    max: 10000,
    maxAge: ...
  })
})

```

然后，你可以通过实现 serverCacheKey 函数来缓存组件。

```js
export default {
  name: 'item', // 必填选项
  props: ['item'],
  serverCacheKey: props => props.item.id,
  render (h) {
    return h('div', this.item.id)
  }
}

```

- 何时使用组件缓存

在大多数情况下，你不应该也不需要缓存单一实例组件。适用于缓存的最常见类型的组件，是在大的 v-for 列表中重复出现的组件。由于这些组件通常由数据库集合(database collection)中的对象驱动，它们可以使用简单的缓存策略：使用其唯一 id，再加上最后更新的时间戳，来生成其缓存键(cache key)

```js
serverCacheKey: props => props.item.id + '::' + props.item.last_updated
```

## 滚动加载问题

> 采用指令滚动加载的时候，不同组件之间由于组件监听事件的存在，会导致滚动触发不同组件指令已经加载数据影响
> 采用vue-infinite-scroll实现滚动加载，会报window is undefined，由于服务端不支持window,所以只能把这个指令添加到entry-client.js上进行解决

## 服务端与客户端混合数据失败的问题

> 这个原因主要是服务端渲染的时候没有拿到cookie 所以导致服务端渲染的 html tag 与客户端渲染的html tag不一致导致的混合失败
> 解决办法---在server.js使用cookie-parser解析req的cookie然后通过context传入服务端入口文件entry-server.js 然后放到store.state中，这样就可以在组件中拿到cookie了
> 如果要向服务端传cookie数据，需要把 api拆成两个部分 一个是客户端的一个是sever端的，通过store实例传到服务端的API上，然后放在header头部传给后台，这样后端便可以拿到前端的cookie进行使用了

## 目前nav-header组件为何不使用router-view

> 两个原因
- fb插件需要（此问题测试可以使用增加一层router-view来解决，在性能上面可能会更好，毕竟页面资源不需要重新加载，侧边栏也不需要重绘）
- ga分析要针对不同的页面进行区分，若果使用了router-view，类似于单页面应用，会导致使用了router-view的页面上面设置的ga信息都会纪录在另外一个跳转进来的页面.

***

- 如何解决

[https://developers.google.com/analytics/devguides/collection/analyticsjs/single-page-applications?hl=zh-cn](google-GA单页面如何设置)

## css预编译为啥不用上(sass, stylus)

- 也想用，但是重构的话一开始用的是模板。样式很多都写好了，只能使用之前已经写好的样式，否则返工需要花比较多的时间进行重新和设计
- 已经用了sass,组件内使用
