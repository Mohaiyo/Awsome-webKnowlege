const mongoose = require('mongoose')

const uri = 'mongodb://localhost/mongo'

mongoose.connect(uri).then(res => {
    console.log('链接成功')
    const Schema = mongoose.Schema

    const TestSchema = new Schema({
        name: {type: String, default: 'wayne'},
        size: {type: String, default: "16"},
        num: {type: Number, default: 10}
    })
    const TestModel = mongoose.model('TestModle', TestSchema)
    // 插入数据
    // save方法
    // var doc = new TestModel({
    //     name: 'wayne',
    //     size: 'small',
    //     num: 11
    // })
    // doc.save(function(err, doc) {
    //     console.log(doc)
    // })
    // create方法
    // TestModel.create({name: 'test', size: 'large', num: 20}, {name: 'test2', size: 'normal', num: 25}, function(err, doc1, doc2) {
    //     console.log(doc1)
    //     console.log(doc2)
    // })

    // insertMany方法
    // TestModel.insertMany([{name: 'wayne', size: '12', num: 12}, {name: 'test3', size: '19', num: 20}], function(err, docs) {
    //     console.log(docs)
    // })

    //查找所有数据
    // find()
    // TestModel.find(function(err, docs) {
    //     console.log(docs)
    // })
    // 查找数字大于18岁的数据
    // TestModel.find({num: {$gt: 18}}, function(err, doc) {
    //     console.log(doc)
    // })
    // 查找名字带有test以及num大于18的数据
    // TestModel.find({num: {$gt: 18}, name: /test$/}, function(err, doc) {
    //     console.log(doc)
    // }).select({name: 1, _id: 0})

    // 只返回name
    // TestModel.find({num: {$gt: 18}, name: /test$/}, function(err, doc) {
    //     console.log(doc)
    // }).select({name: 1, _id: 0})
    // TestModel.find({num: {$gt: 18}, name: /test$/}, {name: 1, _id: 0},function(err, doc) {
    //     console.log(doc)
    // })

    // 跳过两条
    // TestModel.find(null, {name: 1, _id: 0}, {skip: 2}, function(err, doc) {
    //     console.log(doc)
    // })

    //findById
    // let arrId = []
    // TestModel.find(function(err, docs) {
    //     docs.forEach((item => {
    //         arrId.push(item._id)
    //     }))
    //     // TestModel.findById(arrId[0], function(err, doc) {
    //     //     console.log(doc)
    //     // })
    //     TestModel.findById(arrId[1], {name: 1, _id: 0}).exec(function(err, doc) {
    //         console.log(doc)
    //     })
    // })

    // 条件查询
    // $in
    // TestModel.find({num: {$in: [11, 12]}}).exec(function(err, doc){
    //     console.log(doc)
    // })
    // $in
    // TestModel.find({num: {$nin: [11, 12]}}).exec(function(err, doc){
    //     console.log(doc)
    // })
    // $all
    // TestModel.find({num: {$all: [20]}}).exec(function(err, doc){
    //     console.log(doc)
    // })

    // $regex
    // TestModel.find({name: {$regex: /^wa/}}).exec(function(err, doc){
    //     console.log(doc)
    // })

    //更新
    // update updateMany updateOne find() + save() findOne() + save() findOneAndUpdate() findByIdAndUpdate()

    // 删除remove() findOneAndRemove() findByIdAndRemove()

    TestModel.remove({name: 'wayne'}).exec()

    TestModel.find().exec((err, doc) => {
        console.log(doc)
    })

}, err => {
    console.log(err)
    console.log('链接失败')
})

