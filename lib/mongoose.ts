import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(!process.env.uri) return console.log('MONGODB_URI is not defined');

    if(isConnected) return console.log("=> using exisiting database connection");

    try {
        await mongoose.connect(process.env.uri);

        isConnected = true;
        
        console.log('MongoDB Connected');
    } catch (error) {
        console.log(error);
    }
}