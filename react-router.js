react-router的用法：
1.基本用法
使用时，路由器Router就是React的一个组件。
import { Router } from 'react-router';
render(<Router/>, document.getElementById('app'));

Router组件本身只是一个容器，真正的路由要通过Route组件定义。

import { Router, Route, hashHistory } from 'react-router';
<Router history={hashHistory}>
  <Route path="/" component={App}/>
  <Route path="/repos" component={Repos}/>
  <Route path="/about" component={About}/>
</Router>
上面代码中，用户访问/repos（比如http://localhost:8080/#/repos）时，加载Repos组件；访问/about（http://localhost:8080/#/about）时，加载About组件。

2、嵌套路由

Route组件还可以嵌套。
<Router history={hashHistory}>
  <Route path="/" component={App}>
    <Route path="/repos" component={Repos}/>
    <Route path="/about" component={About}/>
  </Route>
</Router>

上面代码中，用户访问/repos时，会先加载App组件，然后在它的内部再加载Repos组件。
<App>
  <Repos/>
</App>

App组件要写成下面的样子。

export default React.createClass({
  render() {
    return <div>
      {this.props.children}
    </div>
  }
})

上面代码中，App组件的this.props.children属性就是子组件。
子路由也可以不写在Router组件里面，单独传入Router组件的routes属性。

let routes = <Route path="/" component={App}>
  <Route path="/repos" component={Repos}/>
  <Route path="/about" component={About}/>
</Route>;

<Router routes={routes} history={browserHistory}/>

3、path 属性

Route组件的path属性指定路由的匹配规则。这个属性是可以省略的，这样的话，不管路径是否匹配，总是会加载指定组件。
请看下面的例子。

<Route path="inbox" component={Inbox}>
   <Route path="messages/:id" component={Message} />
</Route>
上面代码中，当用户访问/inbox/messages/:id时，会加载下面的组件。

<Inbox>
  <Message/>
</Inbox>
如果省略外层Route的path参数，写成下面的样子。

<Route component={Inbox}>
  <Route path="inbox/messages/:id" component={Message} />
</Route>
现在用户访问/inbox/messages/:id时，组件加载还是原来的样子。

<Inbox>
  <Message/>
</Inbox>


4、通配符

path属性可以使用通配符。

<Route path="/hello/:name">
// 匹配 /hello/michael
// 匹配 /hello/ryan

<Route path="/hello(/:name)">
// 匹配 /hello
// 匹配 /hello/michael
// 匹配 /hello/ryan

<Route path="/files/*.*">
// 匹配 /files/hello.jpg
// 匹配 /files/hello.html

<Route path="/files/*">
// 匹配 /files/ 
// 匹配 /files/a
// 匹配 /files/a/b

<Route path="/**/*.jpg">
// 匹配 /files/hello.jpg
// 匹配 /files/path/to/file.jpg


配符的规则如下。
（1）:paramName
:paramName匹配URL的一个部分，直到遇到下一个/、?、#为止。这个路径参数可以通过this.props.params.paramName取出。
（2）()
()表示URL的这个部分是可选的。
（3）*
*匹配任意字符，直到模式里面的下一个字符为止。匹配方式是非贪婪模式。
（4） **
** 匹配任意字符，直到下一个/、?、#为止。匹配方式是贪婪模式。

设置路径参数时，需要特别小心这一点。

<Router>
  <Route path="/:userName/:id" component={UserPage}/>
  <Route path="/about/me" component={About}/>
</Router>
上面代码中，用户访问/about/me时，不会触发第二个路由规则，因为它会匹配/:userName/:id这个规则。因此，带参数的路径一般要写在路由规则的底部。
???机制是什么？

5、IndexRoute 组件

6.Redirect 组件
<Redirect>组件用于路由的跳转，即用户访问一个路由，会自动跳转到另一个路由。

<Route path="inbox" component={Inbox}>
  {/* 从 /inbox/messages/:id 跳转到 /messages/:id */}
  ＜Redirect from="messages/:id" to="/messages/:id" />
</Route>
现在访问/inbox/messages/5，会自动跳转到/messages/5。

7、IndexRedirect 组件
IndexRedirect组件用于访问根路由的时候，将用户重定向到某个子组件。

<Route path="/" component={App}>
  ＜IndexRedirect to="/welcome" />
  <Route path="welcome" component={Welcome} />
  <Route path="about" component={About} />
</Route>

8.Link
Link组件用于取代<a>元素，生成一个链接，允许用户点击后跳转到另一个路由。它基本上就是<a>元素的React 版本，可以接收Router的状态。
render() {
  return <div>
    <ul role="nav">
      <li><Link to="/about">About</Link></li>
      <li><Link to="/repos">Repos</Link></li>
    </ul>
  </div>
}
}

如果希望当前的路由与其他路由有不同样式，这时可以使用Link组件的activeStyle属性。

<Link to="/about" activeStyle={{color: 'red'}}>About</Link>
<Link to="/repos" activeStyle={{color: 'red'}}>Repos</Link>

另一种做法是，使用activeClassName指定当前路由的Class。

<Link to="/about" activeClassName="active">About</Link>
<Link to="/repos" activeClassName="active">Repos</Link>
上面代码中，当前页面的链接的class会包含active。
在Router组件之外，导航到路由页面，可以使用浏览器的History API，像下面这样写。

import { browserHistory } from 'react-router';
browserHistory.push('/some/path');

9、IndexLink
如果链接到根路由/，不要使用Link组件，而要使用IndexLink组件。
这是因为对于根路由来说，activeStyle和activeClassName会失效，或者说总是生效，因为/会匹配任何子路由。而IndexLink组件会使用路径的精确匹配。

<IndexLink to="/" activeClassName="active">
  Home
</IndexLink>
上面代码中，根路由只会在精确匹配时，才具有activeClassName。
另一种方法是使用Link组件的onlyActiveOnIndex属性，也能达到同样效果。

<Link to="/" activeClassName="active" onlyActiveOnIndex={true}>
  Home
</Link>
实际上，IndexLink就是对Link组件的onlyActiveOnIndex属性的包装。

10.histroy 属性
Router组件的history属性，用来监听浏览器地址栏的变化，并将URL解析成一个地址对象，供 React Router 匹配。
history属性，一共可以设置三种值。
browserHistory
hashHistory
createMemoryHistory
如果设为hashHistory，路由将通过URL的hash部分（#）切换，URL的形式类似example.com/#/some/path。

import { hashHistory } from 'react-router'

render(
  <Router history={hashHistory} routes={routes} />,
  document.getElementById('app')
)
如果设为browserHistory，浏览器的路由就不再通过Hash完成了，而显示正常的路径example.com/some/path，背后调用的是浏览器的History API。

import { browserHistory } from 'react-router'

render(
  <Router history={browserHistory} routes={routes} />,
  document.getElementById('app')
)
但是，这种情况需要对服务器改造。否则用户直接向服务器请求某个子路由，会显示网页找不到的404错误。
如果开发服务器使用的是webpack-dev-server，加上--history-api-fallback参数就可以了。

$ webpack-dev-server --inline --content-base . --history-api-fallback
createMemoryHistory主要用于服务器渲染。它创建一个内存中的history对象，不与浏览器URL互动。

const history = createMemoryHistory(location)

11、表单处理
Link组件用于正常的用户点击跳转，但是有时还需要表单跳转、点击按钮跳转等操作。这些情况怎么跟React Router对接呢？
下面是一个表单。

<form onSubmit={this.handleSubmit}>
  <input type="text" placeholder="userName"/>
  <input type="text" placeholder="repo"/>
  <button type="submit">Go</button>
</form>
第一种方法是使用browserHistory.push

import { browserHistory } from 'react-router'

// ...
  handleSubmit(event) {
    event.preventDefault()
    const userName = event.target.elements[0].value
    const repo = event.target.elements[1].value
    const path = `/repos/${userName}/${repo}`
    browserHistory.push(path)
  },
第二种方法是使用context对象。

export default React.createClass({

  // ask for `router` from context
  contextTypes: {
    router: React.PropTypes.object
  },

  handleSubmit(event) {
    // ...
    this.context.router.push(path)
  },
})

12、路由的钩子
每个路由都有Enter和Leave钩子，用户进入或离开该路由时触发。

<Route path="about" component={About} />
＜Route path="inbox" component={Inbox}>
  ＜Redirect from="messages/:id" to="/messages/:id" />
</Route>
上面的代码中，如果用户离开/messages/:id，进入/about时，会依次触发以下的钩子。
/messages/:id的onLeave
/inbox的onLeave
/about的onEnter
下面是一个例子，使用onEnter钩子替代<Redirect>组件。

<Route path="inbox" component={Inbox}>
  <Route
    path="messages/:id"
    onEnter={
      ({params}, replace) => replace(`/messages/${params.id}`)
    } 
  />
</Route>
onEnter钩子还可以用来做认证。

const requireAuth = (nextState, replace) => {
    if (!auth.isAdmin()) {
        // Redirect to Home page if not an Admin
        replace({ pathname: '/' })
    }
}
export const AdminRoutes = () => {
  return (
     <Route path="/admin" component={Admin} onEnter={requireAuth} />
  )
}
下面是一个高级应用，当用户离开一个路径的时候，跳出一个提示框，要求用户确认是否离开。

const Home = withRouter(
  React.createClass({
    componentDidMount() {
      this.props.router.setRouteLeaveHook(
        this.props.route, 
        this.routerWillLeave
      )
    },

    routerWillLeave(nextLocation) {
      // 返回 false 会继续停留当前页面，
      // 否则，返回一个字符串，会显示给用户，让其自己决定
      if (!this.state.isSaved)
        return '确认要离开？';
    },
  })
)
上面代码中，setRouteLeaveHook方法为Leave钩子指定routerWillLeave函数。该方法如果返回false，将阻止路由的切换，否则就返回一个字符串，提示用户决定是否要切换。