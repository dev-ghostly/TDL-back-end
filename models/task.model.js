const {model, Schema} = require('mongoose')

const taskSchema = new Schema({
    title: String,
    description: String,
    completed: Boolean,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = model('Task', taskSchema)