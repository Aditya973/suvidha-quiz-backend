const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: [5,"Password should have minimum length of 5"]
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    subscriptions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subscription'
        }
    ]
},{timestamps:true});

const User = mongoose.model('User',userSchema);

module.exports = User;
