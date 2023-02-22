import { userModel } from "../../../databases/models/user.model.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';


const signUp = async (req, res) => {
    const { name, age, email, password } = req.body;
    // validation at first step // kan hena ben3eml el vlaidation bas for now it in middleware in router by validation and it take paramater shcema
    //check user if exist
    let userIfExist = await userModel.findOne({ email })
    if (!userIfExist) {
        // before insert data hash password
        // bcrypt.hash( password , 10 , async function ( err , hash )
        bcrypt.hash(password, 10, async function (err, hash) {
            //let addNewUser = await userModel.insertMany({ name, email, age, password: hash })  
            let addnewUser = await userModel.insertMany({ name, age, email, password: hash })
            res.json({ message: "sign up seccesfully", addedUser: { name: name, age: age, email: email } })
        });
    } else {
        res.json({ message: "This email is already exist" })
    }
}

const signIn = async (req, res) => {
    const { email, password } = req.body;
    // check user if exist or not
    let userIfExist = await userModel.findOne({ email })
    if (userIfExist) {
        // check password is true or not
        const matchPassword = await bcrypt.compare(password, userIfExist.password);
        if (matchPassword) {
            // make token for response
            let token = jwt.sign({ name: userIfExist.name, user_email: userIfExist.email, user_id: userIfExist._id, role: userIfExist.user_type, status: userIfExist.user_status }, 'seeetvan00ooo000ooos@com?EngyJojo')
            res.json({ message: "login successfully", token })
        } else {
            res.json({ message: "This password is not correct" })
        }
    } else {
        res.json({ message: "This email is not registerd yet" })
    }
}

const updateUserByOwner = async (req, res) => {
    const { email, age, name } = req.body;
    let checkUserExist = await userModel.findOne({ email });
    if (!checkUserExist) {
        let checkUserByIdToUpdate = await userModel.findByIdAndUpdate(req.decoded.user_id, { email, age, name }, { new: true, projection: { password: 0, user_type: 0, user_status: 0, _id: 0 } });
        res.json({ message: "udpated successfully ", checkUserByIdToUpdate })
    } else {
        if (checkUserExist.email == req.decoded.user_email) {
            let checkUserByIdToUpdate = await userModel.findByIdAndUpdate(req.decoded.user_id, { email, age, name }, { new: true, projection: { password: 0, user_type: 0, user_status: 0, _id: 0 } });
            res.json({ message: "udpated successfully ", checkUserByIdToUpdate })
        }
        else {
            res.json({ message: "This email is already reserved ....." })
        }
    }
}

const getUserDataByOwner = async (req, res) => {
    let getUserOwnerData = await userModel.findById(req.decoded.user_id, { password: 0, user_type: 0, user_status: 0, _id: 0 });
    res.json({ message: "gett user data successfully", getUserOwnerData })
}

const deleteUserByOwner = async (req, res) => {
    let getUserOwnerData = await userModel.findByIdAndDelete(req.decoded.user_id);
    res.json({ message: "delete user data successfully", getUserOwnerData })
}

// for admin
const getUsers = async (req, res) => {
    let getAllusers = await userModel.find({}, { password: 0, _id: 0 });
    res.json({ message: "Get All User Data Successfully", getAllusers })
}

const updateUserByAdmin = async (req, res) => {
    const { email, user_status, user_type } = req.body;
    let checkUserEmailIsExist = await userModel.findOneAndUpdate({ email }, { user_status, user_type }, { new: true, projection: { _id: 0, age: 0, password: 0, name: 0, email: 0 } });
    if (checkUserEmailIsExist) {
        res.json({ message: "success", checkUserEmailIsExist })
    } else {
        res.json({ message: "Thsi email is not valid" })
    }
}

export {
    signUp,
    signIn,
    updateUserByOwner,
    getUserDataByOwner,
    deleteUserByOwner,
    getUsers,
    updateUserByAdmin
}