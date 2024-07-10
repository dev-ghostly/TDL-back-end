const {model, Schema} = require('mongoose')

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mainCategoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
})

module.exports = model('User', userSchema)