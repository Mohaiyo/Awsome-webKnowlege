const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TestSchema = new Schema({
    name: {type: String, default: 'wayne'},
    size: {type: String, default: "16"},
    num: {type: Number, default: 10}
})

export default mongoose.model("TestModle", TestSchema)