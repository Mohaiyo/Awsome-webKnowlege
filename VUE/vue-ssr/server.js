const server = require('express')()
const createApp = require('./client')
const renderer = require('vue-server-renderer').createRenderer({
    template: require('fs').readFileSync('./index.template.html', 'utf-8')
})


const templatecontext = {
    title: 'vue ssr demo 1.0',
    meta: `<meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=0,minimal-ui">`
}
server.get('*', (req, res) => {
    const context = {
        url: req.url
    }
    const app = createApp(context)
    renderer.renderToString(app, templatecontext).then(html =>{
        res.end(html)
    }).catch(err => {
        res.status(500).end('Internal Server Error')
    })
})

server.listen(3001)