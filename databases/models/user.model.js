import mongoose from 'mongoose';

const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    age: Number,
    user_type: {
        type: String,
        enum: ['user', 'productOwner', 'admin'],
        default: 'user',
    },
    user_status: {
        type: String,
        enum: ['active', 'pending'],
        default: 'pending',
    },
}, { timestamps: true })


export const userModel = mongoose.model('user', userSchema)