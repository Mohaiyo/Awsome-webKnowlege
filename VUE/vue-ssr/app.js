// 创建一个vue实例 与express结合
const Vue =require('vue')
const server = require('express')()
// const app = new Vue({
//     template:`<div>Hello  vue ssr</div>`
// })


//创建一个renderer
const renderer = require('vue-server-renderer').createRenderer({
    template: require('fs').readFileSync('./index.template.html', 'utf-8')
})

// 2.5.0版本之前帯回调的写法
// renderer.renderToString(app, (err, html)=>{
//     if (err) throw err
//     console.log(html)
// })


// renderer.renderToString(app).then(html=>{
//     console.log(html)
// }, err =>{
//     console.log(err)
// })

const context = {
    title: 'vue ssr demo 1.0',
    meta: `<meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=0,minimal-ui">`
}
server.get('*', (req, res)=>{
    const app = new Vue({
        data: {
            url: req.url
        },
        template: `<div>your request url is: {{ url }}</div>`
    })
    renderer.renderToString(app, context).then(html => {
        res.end(html)
    }).catch(err=>{
        res.status(500).end('Internal Server Error')
        return  
    })

})

server.listen(3000)