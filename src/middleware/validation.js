


// shcema will be change based on the recevied schema name signup , signin etc...

export const validation = (schema) => {
    return (req, res, next) => {
        let { error } = schema.validate(req.body, { abortEarly: true })
        if (error?.details) {
            res.json(error?.details)
        } else {
            next()
        }
    }
}

export const ValidationHeader = (schema) => {
    return (req, res, next) => {
        let { error } = schema.validate(req.header, { abortEarly: true })
        if (error?.details) {
            res.json(error?.details)
        } else {
            next()
        }
    }
}



