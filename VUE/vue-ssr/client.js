const Vue = require('vue')

module.exports = function createApp(context) {
    return new Vue ({
        data: {
            url: context.url
        },
        template: `<div>your request url is :{{url}}</div>`
    })
}