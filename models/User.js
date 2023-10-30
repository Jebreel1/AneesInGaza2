const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    email: {type: String, required: [true, 'email required' ], unique: true, lowercase: true},
    password: {type: String, required: [true, 'password required' ]}
    // role: {
    //     type: String,
    //     enum ['user', 'admin'],
    //     default('user')
    // }
}, {timestamps: true});

//Hashing user passwords
userSchema.pre('save', async function (next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

module.exports = mongoose.model('User', userSchema);