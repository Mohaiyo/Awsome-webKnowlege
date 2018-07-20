// 编写通用的入口文件
import Vue from 'vue'
import App from './app.vue'

// 导出一个工厂函数，用于创建新的app/router/store实例

export function createApp() {
    const app = new Vue({
        // 根实例简单的渲染应用程序组件。
        render: h => h(App)
    })
    return { app }
}