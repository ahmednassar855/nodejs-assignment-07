import mongoose from "mongoose";

export function dbConnection() {
    
    mongoose.set('strictQuery', false);

    mongoose.connect('mongodb://127.0.0.1:27017/assignment07').then(() => {
        console.log('data base connected successfully');

    }).catch((err) => {
        console.log('Error', err);
    })
}