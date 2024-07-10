const {model, Schema} = require('mongoose')

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = model('Category', categorySchema)