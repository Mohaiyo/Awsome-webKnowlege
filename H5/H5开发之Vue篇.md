# vuejs开发H5页面总结

[http://www.huzerui.com/blog/2017/07/03/vuejs-develop-h5-experience/](原文)

## 关于布局方案

> 当拿到设计师给的UI设计图，前端的首要任务就是布局和样式，相信这对于大部分前端工程师来说已经不是什么难题了。移动端的布局相对PC较为简单，关键在于对不同设备的适配。之前介绍了一篇关于移动端rem布局方案，这大致是网易H5的适配方案。不过实践中发现淘宝开源的可伸缩布局方案效果更好且更容易使用。
> 网易云的方案总结为：根据屏幕大小 / 750 = 所求字体 / 基准字体大小比值相等，动态调节html的font-size大小。
> 淘宝的方案总结为：根据设备像素比设置scale的值，保持视口device-width始终等于设备物理像素，接着根据屏幕大小动态计算根字体大小，具体是将屏幕划分为10等分，每份为a，1rem就等于10a。
> 通常我们会拿到750宽的设计稿，这是基于iPhone6的物理分辨率。有的设计师也许会偷懒，设计图上面没有任何的标注，如果我们边开发边量尺寸，无疑效率是比较低的。要么让设计师标注上，要么自食其力。如果设计师实在没有时间，推荐使用markman进行标注，免费版阉割了一些功能（比如无法保存本地）不过基本满足了我们的需求了。
> 标注完成后开始写我们的样式，使用了淘宝的lib-flexible库之后，我们的根字体基准值就为750/100*10 = 75px。此时我们从图中若某个标注为100px，那么css中就应该设置为100/75 = 1.333333rem。所以为了提高开发效率，可以使用px转化为rem的插件。如果你使用sublimeText，可以用 rem-unit,如果你用vscode编辑器，推荐 cssrem!
> 使用rem单位注意以下几点：

* 在所有的单位中，font-size推荐使用px，然后结合媒体查询进行重要节点的控制，这样可以满足突出或者弱化某些字体的需求，而非整体调整。

* 众向的单位可以全部使用px，横向的使用rem，因为移动设备宽度有限，而高度可以无限向下滑动。但这也有特例，比如对于一些活动注册页面，需要在一屏幕内完全显示，没有下拉，这时候所有众向或者横向都应该使用rem作为单位。

* border、box-shadow、border-radius等一些效果应该使用px作为单位。

## 基于接口返回数据的属性注入

> 可能大家不明白什么叫"基于接口返回数据的属性注入"，在此之前，先说一下表单数据的绑定方式，一个重要的点是有几份表单就分开几个表单对象进行数据绑定。
> 以公积金查询为例，由于不同城市会有不同的查询要素，可能登陆方式只有一种，也可能有几种。比如上图有三种登陆方式，在使用vue布局时，有两种方案。一是只建立一个表单用于数据绑定，点击按钮触发判断；二是有几种登陆方式建立几个表单，用一个字段标识当前显示的表单。由于使用第三方的接口，一开始也没有先进行接口返回数据结构的查看，采用了第一种错误的方式，错误一是每种登陆方式下面的登陆要素的数量也不同，错误二是数据绑定在同一个表单data下，当用户在用户名登陆方式输入用户名密码后，切换到客户号登陆方式，就会出现数据错乱的情况。
> 解决完布局问题后，我们需要根据设计图定义一些状态，比如当前登陆方式的切换、同意授权状态的切换、按钮是否可以点击的状态、是否处于请求中的状态。当然还有一些app穿过来的数据，这里就忽略了。

``` js
data: {
    tags: {
        arr: [''],
        activeIndex: 0
    },
    isAgreeProxy: true,
    isLoading: false
}
```

> 接着审查一下接口返回的数据，推荐使用chrome插件postman，比如呼和浩特的登陆要素如下：

```json
{
    "code": 2005,
    "data": [
        {
            "name": "login_type",
            "label": "身份证号",
            "fields": [
                {
                    "name": "user_name",
                    "label": "身份证号",
                    "type": "text"
                },
                {
                    "name": "user_pass",
                    "label": "密码",
                    "type": "password"
                }
            ],
            "value": "1"
        },
        {
            "name": " login_type",
            "label": "公积金账号",
            "fields": [
                {
                    "name": "user_name",
                    "label": "公积金账号",
                    "type": "text"
                },
                {
                    "name": "user_pass",
                    "label": "密码",
                    "type": "password"
                }
            ],
            "value": "0"
        }
    ],
    "message": "登录要素请求成功"
}
```

> 可以看到呼和浩特有两种授权登陆方式，我们在data中定义了一个loginWays，初始为空数组，接着methods中定义一个请求接口的函数，里面就是基于返回数据的基础上为上面fields对象注入一个input字段用于绑定，这就是所谓的基于接口返回数据的属性注入

```js
methods: {
    queryloginWays: (channel_type, channel_code) => {
        var params = new URLSearchParams();
        params.append('channel_type', channel_type);
        params.append('channel_code', channel_code);
        axios.post(this.loginParamsProxy, params)
            .then(function(res) {
                console.log(res);
                var code = res.code || res.data.code;
                var msg = res.message || res.data.message;
                var loginWays = res.data.data ? res.data.data : res.data;
                // 查询失败
                if (code != 2005) {
                    alert(msg);
                    return;
                }
                // 添加input字段用于v-model绑定
                loginWays.forEach(function(loginWay) {
                    loginWay.fields.forEach(function(field) {
                        field.input = '';
                    })
                })
                this.loginWays = loginWays;
                this.tags.arr = loginWays.map(function(loginWay) {
                    return loginWay.label;
                })
            }.bind(this))
    }
}
```

> 即使返回的数据有我们不需要的数据也没有关系，这样保证我们不会遗失进行下一步登陆所需要的数据。
> 这样多个表单绑定数据问题解决了，那么怎么进行页面间数据传递？如果是app传过来，那么通常使用URL拼接的方式，使用window.location.search获得queryString后再进行截取；如果通过页面套入javaWeb中，那么直接使用"${字段名}"就能获取，注意要js中获取java字段需要加双引号。

```js
computed: {
        // 真实姓名
        realName: function() {
            return this.getQueryVariable('name') || ''
        },
        // 身份证
        identity: function() {
            return parseInt(this.getQueryVariable('identity')) || ''
        },
        /*If javaWeb
        realName: function() {
            return this.getQueryVariable('name') || ''
        },
        identity: function() {
            return parseInt(this.getQueryVariable('identity')) || ''
        }*/
    },
    methods: {
        getQueryVariable: function(variable) {
            var query = window.location.search.substring(1);
            var vars = query.split('&');
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split('=');
                if (decodeURIComponent(pair[0]) == variable) {
                    return decodeURIComponent(pair[1]);
                }
            }
            console.log('Query variable %s not found', variable);
        }
    }
```

## 关于前端跨域调试

> 在进行接口请求时，我们的页面通常是在sublime的本地服务器或者vscode本地服务器预览，所以请求接口会遇到跨域的问题。 在项目构建的时候通常我们源代码会放在src文件夹下，然后使用gulp进行代码的压缩、合并、图片的优化（根据需要）等等，我们会使用gulp。这里解决跨域的问题可以用gulp-connect结合http-proxy-middleware，此时我们在gulp-connect中的本地服务器进行预览调试。 gulpfile.js如下： 开发过程使用gulp server命令，监听文件改动并使用livereload刷新；使用gulp命令进行打包。

```js
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var useref = require('gulp-useref');
var connect = require('gulp-connect');
var proxyMiddleware = require('http-proxy-middleware');
// 定义环境变量，若为 dev，则代理src目录； 若为prod，则代理dist目录
var env = 'prod'
// 跨域代理  将localhost:8088/api 映射到 https://api.shujumohe.com/
gulp.task('server', ['listen'], function() {
    var middleware = proxyMiddleware(['/api'], {
        target: 'https://api.shujumohe.com/',
        changeOrigin: true,
        pathRewrite: {
            '^/api': '/'
        }
    });
    connect.server({
        root: env == 'dev' ? './src' : './dist',
        port: 8088,
        livereload: true,
        middleware: function(connect, opt) {
            return [middleware]
        }
    });
});
gulp.task('html', function() {
    gulp.src('src/*.html')
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});
gulp.task('css', function() {
    gulp.src('src/css/main.css')
        .pipe(concat('main.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/css/'));
    gulp.src('src/css/share.css')
        .pipe(concat('share.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/css/'));
    gulp.src('src/vendors/css/*.css')
        .pipe(concat('vendors.min.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/vendors/css'));
    return gulp
});
gulp.task('js', function() {
    return gulp.src('src/vendors/js/*.js')
        .pipe(concat('vendors.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/vendors/js'));
});
gulp.task('img', function() {
    gulp.src('src/imgs/*')
        .pipe(gulp.dest('dist/imgs'));
});
gulp.task('listen', function() {
    gulp.watch('./src/css/*.css', function() {
        gulp.src(['./src/css/*.css'])
            .pipe(connect.reload());
    });
    gulp.watch('./src/js/*.js', function() {
        gulp.src(['./src/js/*.js'])
            .pipe(connect.reload());
    });
    gulp.watch('./src/*.html', function() {
        gulp.src(['./src/*.html'])
            .pipe(connect.reload());
    });
});
gulp.task('default', ['html', 'css', 'js', 'img']);
```