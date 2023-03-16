const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: true
    },
    work: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    cpassword: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    messages: [
        {
            name: {
                type: String,
                require: true
            },
            email: {
                type: String,
                require: true
            },
            phone: {
                type: Number,
                require: true
            },
            message: {
                type: String,
                require: true
            }
        }
    ],
    tokens: [
        {
            token: {
                type: String,
                require: true
            }
        }
    ],
})




//pwd hashing

userSchema.pre('save', async function (next) {
    console.log('hi');
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
});


//we are generate token
userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        console.log("token");
        console.log(token);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
}

//store the message

userSchema.methods.addMessage = async function (name, email, phone, message) {
    try {
        this.messages = this.messages.concat({name, email, phone, message});
        await this.save();
        console.log("this.messages");
        console.log(this.messages);
        return this.messages;


    }
    catch (error) { console.log(error); }


}

const User = mongoose.model('USER', userSchema);

module.exports = User;