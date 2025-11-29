const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI);

const userModel = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,  
    },
    answer:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        default: 1,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
}, {timestamps:true})

module.exports = mongoose.model('user', userModel);
