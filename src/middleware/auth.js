import jwt from 'jsonwebtoken';


export const isAuth = async (req, res, next) => {
    const token = req.header('token');
    jwt.verify(token, 'seeetvan00ooo000ooos@com?EngyJojo', async function (err, decoded) {
        if (err) {
            res.json({ message: " error in token ", err })
        } else {
            req.decoded = decoded;
            next()
        }
    });
}

export const adminAuth = async (req, res, next) => {
    const token = req.header('token');
    jwt.verify(token, 'seeetvan00ooo000ooos@com?EngyJojo', async function (err, decoded) {
        if (err) {
            res.json({ message: " error in token ", err })
        } else {
            if (decoded.role == "admin") {
                next()
            } else {
                res.json({ message: "You do not have the permission ,  Please Call The Admin !!!" })
            }
        }
    });
}

export const userActiveAuth = async (req, res, next) => {
    const token = req.header('token');
    jwt.verify(token, 'seeetvan00ooo000ooos@com?EngyJojo', async function (err, decoded) {
        if (err) {
            res.json({ message: " error in token ", err })
        } else {
            if (decoded.status == "active") {
                next()
            } else {
                res.json({ message: "Your Account is still in pending status ,  Please Call The Admin !!!" })
            }
        }
    });
}

export const blogAuth = async (req, res, next) => {
    const { _id } = req.params;
    const token = req.header('token');
    jwt.verify(token, 'seeetvan00ooo000ooos@com?EngyJojo', async function (err, decoded) {
        if (err) {
            res.json({ message: " error in token ", err })
        } else {
            blogId = _id;
            next()
        }
    });
}