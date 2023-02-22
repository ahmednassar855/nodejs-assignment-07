import Joi from 'joi'

// validtion in signup 
export const signUpSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    age: Joi.number().min(10).max(100).required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().pattern(/^[A-Z][a-z0-9A-Z@&_]{3,20}$/).required(),
    rePassword: Joi.ref('password')
})

export const signInSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password: Joi.string().required(),
})

// validation on updating user type and user status are optional with default result if not in input
export const updateUserSchema = Joi.object({
    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    user_status: Joi.string().pattern(/active|pending/).default('pending'),
    user_type: Joi.string().pattern(/user|productOwner|admin/).default('user'),
    name: Joi.string().min(3).max(50).optional(),
    age: Joi.number().min(10).max(100).optional(),
})

