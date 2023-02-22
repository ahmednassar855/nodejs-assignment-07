import mongoose from 'mongoose';

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    addedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    }
}, { timestamps: true, })


export const blogModel = mongoose.model('blog', blogSchema)