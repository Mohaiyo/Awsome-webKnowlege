// function test() {
//     console.log('test')
//     return 'test something!'
// }

// async function asyncTest() {
//     console.log(' test async')
//     return Promise.resolve('Promise 1 resolve')
// }

// async function testAnother() {
//     console.log('first console')

//     let testFn1 = await test()
//     console.log(testFn1)

//     let testFn2 = await asyncTest()
//     console.log(testFn2)

//     console.log('test end')
// }

// testAnother()

// let promiseFn = new Promise(resolve => {
//     console.log('this is a promise fn')
//     return resolve('can I resolve now')
// })

// promiseFn.then(res => {
//     console.log(res)
// })

// console.log("==END==")


/* 执行顺序
* first console
* test
* 遇到await 跳出该函数 先执行后面的
* this is a promise fn
* == END ==
* test something!
* 遇到了第二个promise先不执行 先执行第一个promise队列
* can I resolve now
* test async
* Promise 1 resolve
* test end
*/


async function test() {
    console.log('test')
    return 'test something!'
}

async function asyncTest() {
    console.log(' test async')
    return Promise.resolve('Promise 1 resolve')
}

async function testAnother() {
    console.log('first console')

    let testFn1 = await test()
    console.log(testFn1)

    let testFn2 = await asyncTest()
    console.log(testFn2)

    console.log('test end')
}

testAnother()

let promiseFn = new Promise(resolve => {
    console.log('this is a promise fn')
    return resolve('can I resolve now')
})

promiseFn.then(res => {
    console.log(res)
})

console.log("==END==")


/* 执行顺序
 * first console
 * 遇到await 先执行发现第一个promise 放到promise队列等待resolve 跳到函数外继续执行
 * test
 * this is a promise fn 
 * 遇到第二个promise放到　promise队列
 * == END ==
 * 遇到了第二个promise先不执行 先执行第一个promise队列
 * test something!
 * test async
 * 遇到第三个promise放入队列 等待执行 跳出函数执行后面的promise
 * can I resolve now
 * 第二个promise执行完 回到函数内部执行await后面resolve的值
 * Promise 1 resolve
 * test end
 */