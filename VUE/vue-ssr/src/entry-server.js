// 仅在服务端运行
import { createApp } from './app'

export default context => {
    const { app } = createApp()
    return app
}