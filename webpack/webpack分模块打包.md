# vue项目优化之按需加载组件

> 使用 vue-cli构建的项目,在 默认情况下 ,执行 npm run build  会将所有的js代码打包为一个整体,打包位置是 dist/static/js/app.[contenthash].j

```js
import Home from '@/components/index'
import Index from '@/components/home'
import SignIn from '@/components/signIn'
import SignUp from '@/components/SignUp'
```

> 执行 npm run build 会打包为一个整体 app.[contenthash].js ,这个文件是非常大,可能几兆或者几十兆,加载会很慢,所以我们需要分模块打包,把我们想要组合在一起的组件打包到一个 chunk块中去,分模块打包需要下面这样使用 webpack的 require.ensure,并且在最后加入一个 chunk名,相同 chunk名字的模块将会打包到一起

- 将router/index.js 修改为懒加载组件

```js
import Vue from 'vue'
import Router from 'vue-router'
const Home = r => require.ensure([], () => r(require('@/pages/index.vue')), 'home')
const Index = r => require.ensure([], () => r(require('@/pages/home/home.vue')), 'home')
const SignIn = r => require.ensure([], () => r(require('@/pages/sign/signIn.vue')), 'sign')
const SignUp = r => require.ensure([], () => r(require('@/pages/sign/signUp.vue')), 'sign')
const Article = r => require.ensure([], () => r(require('@/pages/articles/article.vue')), 'articles')
```

> 根据 chunkame的不同, 上面的5个组件, 将会被分成3个块打包,最终打包之后与组件相关的js文件会分为3个 (除了app.js,manifest.js, vendor.js)
> 这样就把一个大的 js文件分为一个个小的js文件了,按需去下载,其他的使用方法和import的效果一样

##　require.ensure()
>　上面的分模块打包用到了webpack的require.ensure(),那么应该怎么去理解它的实现原理呢？webpack 在编译时，会静态地解析代码中的 require.ensure()，同时将模块添加到一个分开的 chunk 当中。这个新的 chunk 会被 webpack 通过 jsonp 来按需加载。

```js
require.ensure(dependencies: String[], callback: function(require), chunkName: String)
```

- 依赖dependencies

> 这是一个字符串数组，通过这个参数，在所有的回调函数的代码被执行前，我们可以将所有需要用到的模块进行声明。

- 回调 callback

> 当所有的依赖都加载完成后，webpack会执行这个回调函数。require 对象的一个实现会作为一个参数传递给这个回调函数。因此，我们可以进一步 require() 依赖和其它模块提供下一步的执行。

- chunk名称 chunkName

> chunkName 是提供给这个特定的 require.ensure() 的 chunk 的名称。通过提供 require.ensure() 不同执行点相同的名称，我们可以保证所有的依赖都会一起放进相同的 文件束(bundle)。
> 让我们来看以下的项目

```js
\\ file structure
    |
    js --|
    |    |-- entry.js
    |    |-- a.js
    |    |-- b.js
    webpack.config.js
    |
    dist
```

***

```js
\\ entry.js

require('a');
require.ensure([], function(require){
    require('b');
});

\\ a.js
console.log('***** I AM a *****');

\\ b.js
console.log('***** I AM b *****');
```

***

```js
\\ webpack.config.js
var path = require('path');

module.exports = function(env) {
    return {
        entry: './js/entry.js',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist')
        }
    }
}
```

> 通过执行这个项目的 webpack 构建，我们发现 webpack 创建了2个新的文件束， bundle.js 和 0.bundle.js。
> entry.js 和 a.js 被打包进 bundle.js.
> b.js 被打包进 0.bundle.js.
> W> require.ensure 内部依赖于 Promises。 如果你在旧的浏览器中使用 require.ensure 请记得 去 shim Promise.
[es6-promise polyfill.](https://github.com/stefanpenner/es6-promise)

## require.ensure() 的坑点

- 空数组作为参数

```js
require.ensure([], function(require){
    require('./a.js');
});
```

> 以上代码保证了拆分点被创建，而且 a.js 被 webpack 分开打包。

- 依赖作为参数

```js
require.ensure(['./a.js'], function(require) {
    require('./b.js');
});
```

> 上面代码， a.js 和 b.js 都被打包到一起，而且从主文件束中拆分出来。但只有 b.js 的内容被执行。a.js 的内容仅仅是可被使用，但并没有被输出。
> 想去执行 a.js，我们需要异步地引用它，如 require('./a.js')，让它的 JavaScritp 被执行。

[理解webpack异步加载的原理](https://cnodejs.org/topic/586823335eac96bb04d3e305)