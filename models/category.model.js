const {model, Schema} = require('mongoose')

const categorySchema = new Schema({
    name: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = model('Category', categorySchema)