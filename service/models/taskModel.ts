import mongoose, {Schema} from 'mongoose'

const noteSchema = new mongoose.Schema({
    user: { 
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    description: String,
    completed: Boolean
})

const Task = mongoose.model('tasks', noteSchema)

export { Task }