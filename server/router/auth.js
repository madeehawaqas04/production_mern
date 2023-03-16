//const { response } = require('express');
const express = require('express');
const jwt = require('jsonwebtoken');
const authenticate = require("../middleware/authenticate");
const router = express.Router();
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser')

require('../db/conn');
const User = require("../models/userSchema");

// router.use(cookieParser());
//setup express app
const app = express()

// let’s you use the cookieParser in your application
app.use(cookieParser());

router.use(cookieParser());

//router.get('/',);

router.get('/', (req, res) => {
    res.send('hello world');
});

// router.get('/about', (req, res) => {
//     res.send('hello about router');
// });

// router.get('/contactus', (req, res) => {
//     res.send('hello contactus');
// });

// router.get('/signin', (req, res) => {
//     res.send('hello signin');
// });

// router.get('/signup', (req, res) => {
//     res.send('hello signup');
// });

//using promise
// router.post('/register', (req, res) => {

//     const { name, email, phone, work, password, cpassword } = req.body;

//     if (!name || !email || !phone || !work || !password || !cpassword) {
//         return res.status(422).json({ error: "Please fill all fields" })
//     }

//     User.findOne({ email: email })
//         .then((userExist) => {
//             if (userExist) {
//                 return res.status(422).json({ error: "email address already exists" });
//             }

//             const user = new User({ name, email, phone, work, password, cpassword })
//             user.save().then(() => {
//                 res.status(201).json({ message: "user reqister successfuly" })
//             }).catch((err) => res.status(500).json({ error: "Failed to registered" }));
//         }).catch(err => { console.log(err); });
//     //console.log(name);
//     //console.log(email);
//     //res.send("regist");
//     //res.json({message : req.body});

// })


router.post('/register', async (req, res) => {

    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "Please fill all fields" })
    }

    try {

        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(422).json({ error: "email address already exists" });
        } else if (password != cpassword) {
            return res.status(422).json({ error: "password are not matching" });
        } else {

            const user = new User({ name, email, phone, work, password, cpassword })

            //pwd hashing'

            await user.save();

            res.status(201).json({ message: "user reqister successfuly" });
        }

    } catch (err) {
        console.log(err);
    }

});

//login code




router.post('/signinUser', async (req, res) => {
    res.cookie(`Cookie token name`, `encrypted cookie string Value`);
    console.log(req.body);
    console.log(res.cookie);
    try {
        let token;
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Please fill the data" });
        }

        const userLogin = await User.findOne({ email: email });
        console.log(userLogin);
        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            token = await userLogin.generateAuthToken();
            //console.log(token);
            //console.log(userLogin);

            res.cookie(`Cookie token name`, `encrypted cookie string Value`);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });

            if (!isMatch) {
                return res.status(400).json({ error: "Invalid credential" });

            } else {
                return res.status(200).json({ message: "user signin successfully" });
            }

        } else {
            return res.status(400).json({ error: "Invalid credential" });
        }


    } catch (err) {
        console.log(err);
    }
});

//aboutus

router.get('/about', authenticate, (req, res) => {
    console.log('Hello about');
    //console.log(req.rootUser);
    res.send(req.rootUser);
    //console.log(req.cookies)
});

//get user data for contactus and home page
router.get('/getdata', authenticate, (req, res) => {
    console.log('hi get data');
    res.send(req.rootUser);
});



router.post('/contact', authenticate, async(req, res) => {
    try {

        const { name, email, phone, message } = req.body;
        console.log('contact req.body');
        console.log(req.body);
        if (!name || !email || !phone || !message) {
            console.log("error in contact form");
            return res.json({ error: "Please fill the contact form" });
        }

        const userContact =await User.findOne({ _id: req.userID });

        console.log(userContact);
        if (userContact) {
            const userMessage = await userContact.addMessage(name, email, phone, message);
        await userContact.save();
       return res.status(200).json({message:"Send message successfully"});
       //return res.status(200).json({ message: "user signin successfully" });
        
        }

    } catch (error) {
        console.log(error);

    }


});

//logout

router.get('/Logout', (req, res) => {
    console.log('Hello logout');
    //console.log(req.rootUser);
    res.clearCookie('jwtoken',{path:'/'});
    res.status(200).send('User logout');
    //console.log(req.cookies)
});


module.exports = router;


