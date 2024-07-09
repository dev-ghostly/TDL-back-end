const {model, Schema} = require('mongoose')

const userSchema = new Schema({
    username: String,
    password: String,
    mainCategoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }
})

module.exports = model('User', userSchema)