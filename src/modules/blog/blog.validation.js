import Joi from 'joi'

// validtion in for adding new blog 
export const addBlogSchema = Joi.object({
    _id : Joi.string().hex().optional(),
    title: Joi.string().min(3).max(50).required(),
    content: Joi.string().min(3).max(500).required(),
})
