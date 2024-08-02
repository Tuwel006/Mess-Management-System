require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const { Member, Flag } = require('./db/models/members');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const session = require('express-session');
const crypto = require('crypto');
const rateLimit = require('express-rate-limit');

const axios = require('axios');
const nodemailer = require('nodemailer');
// server.js
const connectionState = require('./connectionState');

console.log(connectionState.getState());  // Outputs: connected
connectionState.setState('disconnected');
console.log(connectionState.getState());  // Outputs: disconnected

let userAdmin;


const async = require('hbs/lib/async.js');
const { NONAME } = require('dns');
const { Console, error, group } = require('console');
const { verify } = require('crypto');
const { availableParallelism } = require('os');


const port = process.env.PORT || 3000;


const static_path = path.join(__dirname, './public');
const templet_path = path.join(__dirname, './templates/views');
const partials_path = path.join(__dirname, './templates/partials');

app.use(express.static(static_path));
app.set('view engine', 'hbs');
app.set('views', templet_path);
hbs.registerPartials(partials_path);
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

hbs.registerHelper('json', function(context) {
    return JSON.stringify(context);
});
hbs.registerHelper('increment', (value) => value + 1);



if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
 }
 
 localStorage.setItem('myFirstKey', 'myFirstValue');
 console.log(localStorage.getItem('myFirstKey'));



app.get('/run-server-file', (req, res) => {
    exec('node your-server-file.js', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).send('Error running server file');
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        res.send('Server file run successfully');
    });
});

app.use((req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        try {
            // Verify the token using the secret key
            const verifyUser = jwt.verify(token, process.env.Secret_Key);
            req.isAuthenticated = true;
            req.userId = verifyUser._id;
            
           
        } catch (error) {
            req.isAuthenticated = false;
        }
    } else {
        req.isAuthenticated = false;
    }

    next();
});



const otpRateLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 3, // Limit each IP to 3 requests per `window` (1 minute)
    message: 'Too many OTP requests, please try again later.'
});

let otpStore = {};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ali18sabbir@gmail.com',
      pass: 'ktqb jfsf wupt vrbh'
    }
  });

// Function to generate a new OTP
function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
}

// Function to hash OTPs
function hashOtp(otp) {
    return crypto.createHash('sha256').update(otp).digest('hex');
}

// Endpoint to send OTP


app.post('/send-otp', otpRateLimiter, (req, res) => {
    const { email } = req.body;

    if (otpStore[email] && otpStore[email].expires > Date.now()) {
        return res.json({ success: false, message: 'Please wait before requesting a new OTP.' });
    }

    const otp = generateOtp();
    const hashedOtp = hashOtp(otp);
    const expires = Date.now() + 60000;

    otpStore[email] = { hashedOtp, expires };

    // Send OTP via Nodemailer
    const mailOptions = {
        from: 'ali18sabbir@gmail.com', // Replace with your email
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP is ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending OTP:', error);
            return res.json({ success: false, message: 'Failed to send OTP. Please try again.' });
        } else {
            console.log(`OTP sent to ${email}: ${info.response}`);
            res.json({ success: true });
        }
    });
});




   







app.get('/', (req, res) => {
    
    if(req.isAuthenticated){
        const flag = "home";
        res.render('home', {flag});
    }
    else{
        res.sendFile(path.join(__dirname, 'public', 'default.html'));
    }
         
})


app.get('/register', (req, res) => {
    if(!req.isAuthenticated){
        res.render('register');
    }
    else{
        res.send("You are alredy Registerd or Login");
    }
})


app.get('/login', (req, res) => {
    if(!req.isAuthenticated){
        res.render('login');
    }
    else{
        res.send(`<h1>You have registered successfully Please<a href="login">Log In</a><h1>`);
    }
})

app.get('/home', (req, res) => {
    if(req.isAuthenticated){
        const flag = "home";
        res.render('home', {flag});
    }else{
        res.redirect('/');
    }
})


app.get('/moneydeposit', (req, res) => {
    console.log("UserAdmin: "+req.userEmail);
    if(req.isAuthenticated && userAdmin === true){
        res.render('moneydeposit');
    }else{
        res.redirect('/');
    }    
})



app.get('/addmeal', async (req, res) => {
    
    if(req.isAuthenticated && userAdmin === true){
        const group = await Member.findOne({'groupMembers._id': req.userId});
        const groupMembers = group.groupMembers;
        const x = 1;

        res.render('addmeal', {group,groupMembers,x});

    }else{
        res.redirect('/');
    }    
})



app.get('/spendmoney', (req, res) => {
    if(req.isAuthenticated && userAdmin === true) {
        res.render('spendmoney');
    }
    else{
        res.redirect('/');
    }
})

app.get('/seeMeal', async (req, res) => {
    if (req.isAuthenticated) {
        const group = await Member.findOne({'groupMembers._id': req.userId});
        const groupMembers = group.groupMembers;
        const x = 1;
        res.render('seeMeal', {groupMembers,x});
    }
    else{
        res.redirect('/')
    }
})

app.get('/seeDepositList', async (req, res) => {
    if (req.isAuthenticated) {
        const group = await Member.findOne({'groupMembers._id': req.userId});
        const groupMembers = group.groupMembers;
        const x = 1;
        res.render('seeDeposit', {groupMembers,x});
    }
    else{
        res.redirect('/')
    }
})

app.get('/seeSpendList', async (req, res) => {
    if (req.isAuthenticated) {
        const group = await Member.findOne({'groupMembers._id': req.userId});
        const groupMembers = group.groupMembers;
        const x = 1;
        res.render('seeSpend', {groupMembers,x});
    }
    else{
        res.redirect('/')
    }
})

app.get('/getGroupName', async (req, res) => {
    const userId = req.userId;
    try {
        const user = await Member.findOne({'groupMembers._id': userId});
        req.groupMembers = user.groupMembers;
        if(user) {
            res.json({groupName: user.groupName});
        }
        else{
            res.json({groupName: 'DefaultGroupName'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({groupName: 'DefaultGroupName'});
    }
    
});




app.get('/getMembers', async (req, res) => {
    const userId = req.userId;

    try {
        const user = await Member.findOne({'groupMembers._id': userId});
        
        if(user){
            res.status(200).json({groupMembers: user.groupMembers});
        }
        else{
            res.status(404).json({groupMembers: []});
        }
    } catch (error) {
        console.log(error);
        res.json({groupMembers: []});
    }
})



app.get('/getMembersForReg', async (req, res) => {
    const groupName = req.query.groupName;

    try {
        const group = await Member.findOne({'groupName': groupName});
        

        if(group){
            res.json({groupMembers: group.groupMembers});
        }
        else{
            res.json({groupMembers: []});
        }
    } catch (error) {
        console.log(error);
        res.json({groupMembers: []});
    }
})




app.post('/register', async(req, res) => {
    try {
        const day = new Date().getDate();
        const otp = req.body.otp;
        console.log("Otp: "+otp);
        const email = req.body.email;
        const hashedOtp = hashOtp(otp);

        console.log("Verify OTP");
        if (otpStore[email] && otpStore[email].hashedOtp === hashedOtp && otpStore[email].expires > Date.now()) {
            delete otpStore[email];
        } else {
            return res.send('Invalid or expired OTP.');
        }


    const groupName = req.body.groupName;
    const existGroupName = await Member.findOne({'groupName': groupName});
    const userType = req.body.userType;
    if(existGroupName && userType === 'admin'){
        return res.send('Mess Name Alreddy Exist');
    }
    const name1 = req.body.name1;
    const name2 = req.body.name2;
    
    const phone = req.body.phone;
    const password = req.body.password;
    const cpassword = req.body.cpassword;
    const existEmail = await Member.findOne({'groupMembers.email':email});
    const existPhone = await Member.findOne({'groupMembers.phone':phone});
    if(email === "" || phone=== "" ||password === "" || cpassword === ""){
        return res.send("Enter the required fields");
    }
    if(existEmail || existPhone){
        return res.status(400).send('email or phone alredy registerd');
    }
    if(!name1 && !name2){
        res.status(400).send("Name is required");
    }
    const nameToSave = name1 || name2;
    
    if(password == cpassword){
        const passwordHash = await bcrypt.hash(password, 10);
        const existingGroup = await Member.findOne({groupName});
        

        if(existingGroup){
           

            const memberWithMatchingName = existingGroup.groupMembers.find(
                (member) => member.name === nameToSave
              );
        
              if (memberWithMatchingName) {
                memberWithMatchingName.Admin = 0;
                // If a member with the same name exists, save user data under that member
                memberWithMatchingName.email = email;
                memberWithMatchingName.phone = phone;
                memberWithMatchingName.password = passwordHash;
                memberWithMatchingName.cpassword = cpassword;
                const token = jwt.sign({_id: req.userId}, process.env.Secret_Key);
                memberWithMatchingName.tokens.push({token});

                
              }

            await existingGroup.save();
            res.redirect('/login');
        }
        else{
            
            const registerMember = new Member({
                groupName,
                
                groupMembers: [{ //, 
                    name: nameToSave,Admin: true,regType: req.body.regType, email: req.body.email, phone: req.body.phone, password: passwordHash, 
                    }]    
            })
            const stored = await registerMember.save();
            // const token = await registerMember.generateAuthToken();
            const group = await Member.findOne({'groupName': groupName});
            const token = jwt.sign({ _id: group.groupMembers[group.groupMembers.length - 1]._id }, process.env.Secret_Key);
            group.groupMembers[group.groupMembers.length - 1].tokens.push({ token });
            
            
            await group.save();
            res.redirect('/login');
        }
        
        
        
    }else{
        res.send('password not match');
    }
    

    } catch (error) {        
            res.send(error);
        console.log(error);
        
    }
})


app.post('/login', async (req, res) => {
    try {
        const password = req.body.password;
        const email = req.body.email;
        
        const userEmail = await Member.findOne({'groupMembers.email':email});
        const member = userEmail.groupMembers.find((member) => member.email === email);
        passwordMatch = await bcrypt.compare(password, member.password);

        if(!passwordMatch){
            return res.send('Invalid Email or password');          
        }

        const token = jwt.sign({ _id: member._id }, process.env.Secret_Key);
        member.tokens.push({ token });
        await userEmail.save();
        res.cookie('jwt', token, {
            expires: new Date(Date.now()+600000000),
            httpOnly:true,
            secure: true
        })
        
        
        res.redirect('/');

    } catch (error) {
        res.send('Invalid Email or password');
        console.log(error);
    }
})




// Logout endpoint
app.get('/logout', async (req, res) => {
    try {
        const token = req.cookies.jwt; // Get the token from the cookie

        // Find the group and specific member based on the token's email
        const group = await Member.findOne({ 'groupMembers.tokens.token': token });
        
        if (!group) {
            return res.status(401).json({ error: 'User not found' });
        }

        const member = group.groupMembers.find(member => {
            const userToken = member.tokens.find(t => t.token === token);
            return userToken !== undefined;
        });
        if (!member) {
            return res.status(401).json({ error: 'User not found' });
        }

        // Remove the token from the user's tokens array
        member.tokens = member.tokens.filter(t => t.token !== token);
        await group.save();

        // Clear the cookie
        res.cookie('jwt', token);
        res.clearCookie('jwt');

        res.status(200).redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});







app.post('/addMember', async (req, res) => {
    const { name } = req.body;
    const userId = req.userId;
    try {
        const group = await Member.findOne({'groupMembers._id': userId});
        if(group){
            let existName = false;
            group.groupMembers.forEach(member => {
                if(member.name === name) {
                    existName = true;
                    return;
                }
            })
            if(existName) {
                return res.json({message: 'existName'});
            }
            group.groupMembers.push({name});
            await group.save();
            const day = new Date().getDate();
            group.groupMembers.forEach(member => {
                if(member.name === name){
                    member.meal.push({Day: 'false', Night: 'false', day: day});
                }
            })
            await group.save();
            res.json({success: true});
        }
        else{
            res.json({success: false, message: 'User Not found'});
        }
    } catch (error) {
        console.log(error);
        res.json({success: false, message: 'Server Error'});
    }
})



app.get('/your-route', async (req, res) => {
    try {
        // Fetch group member data from your database
        const groupMembersData = await Member.find({'_id': req.userId});

        // Render the HTML using the Handlebars template
        res.render('mealTableRow', { groupMembers: groupMembersData });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});



app.post('/storeDate', async (req, res) => {
    const currDate = new Date();
    const day = currDate.getDate();
    const month = currDate.getMonth()+1;
    const year = currDate.getFullYear();
    const userId = req.userId;
    try {
        const group = await Member.findOne({'groupMembers._id': userId});
        group.mealStartDate = {
            day,
            month,
            year,
        }
        group.mealSave.push(null);
        group.groupMembers.forEach((member=>{
            member.meal.push({Day: false, Night: false, day: day});
        }))
        await group.save();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.status(500).json({Error: error});
    }
});




app.get('/api/getInitialData', async (req, res) => {
    try {
        const userId = req.userId;
        const group = await Member.findOne({'groupMembers._id': userId});
        if(group) {
            const groupMembers = group.groupMembers;
            const dates = group.mealStartDate;

            res.json({ success: true, dates, groupMembers });
        }
        else{
            res.json({success: false});
        }
    } catch (error) {
        res.json({success:false});
        console.log(error);
    }
})


app.post('/storeMeal', async (req, res) => {
    try {
        const group = await Member.findOne({'groupMembers._id': req.userId});
        const {day} = req.body;
        if(group) {
            
            group.groupMembers.forEach(member => {
                member.meal.push({Day: 'false', Night: 'false', day: day});
            });
            group.mealSave.push("false");
            await group.save();
            res.sendStatus(200);
        }
        
        
    } catch (error) {
        console.log(error);
    }
})

app.post('/mealStop', async (req, res) => {
    try {
        const group = await Member.findOne({'groupMembers._id': req.userId});
        if(group) {
            group.mealSave = [];
            group.groupMembers.forEach(member => {
                member.meal = [];
            })
            group.mealStartDate = {
                day: null,
                month: null,
                year: null
            }
            await group.save();
            res.sendStatus(200);
        }
        else{
            console.log('Group Not Found');
        }
    } catch (error) {
        console.log(error);
    }
})


app.post('/flag', async (req, res) => {
    try {
        const group = await Member.findOne({'groupMembers._id': req.userId});
        if(group) {
            
            res.json(group);
        }
        else{
            console.log('Group Not Found');
        }
    } catch (error) {
        console.log(error);
    }
})



app.post('/addAmount', async (req, res) => {
    try {
        const { name, enterAmount} = req.body;
        const group = await Member.findOne({'groupMembers._id': req.userId});
        const groupMembers = group.groupMembers;
        let totalDeposit = 0;
        groupMembers.forEach(user => {
            let tdeposit = 0;
            const currDate = new Date();
            const day = currDate.getDate();
            const month = currDate.getMonth()+1;
            const year = currDate.getFullYear();
            const formatDate = `${day}/${month}/${year}`;
            if(user.name === name) {
                user.depositMoney.push({value: enterAmount, depositDate: formatDate});
            }
            user.depositMoney.forEach(data=>{
                tdeposit+=data.value;
            })
            totalDeposit+=tdeposit;
            user.tdeposit = tdeposit;
            tdeposit = 0;
        })
        group.totalDeposit = totalDeposit;
        await group.save();
        res.status(200).json(groupMembers);
    } catch (error) {
        console.log(error);
    }
})


app.get('/getgroups', async (req, res) => {
    try {
        const group = await Member.findOne({'groupMembers._id': req.userId});
        res.status(200).json(group);
    } catch (error) {
        console.log(error);
    }
})

app.get('/getUser', async (req, res) => {
    try {
        const group = await Member.findOne({'groupMembers._id': req.userId});
        
        group.groupMembers.forEach((user, index) => {
            if((user._id) == (req.userId)) {
                userAdmin = user.Admin;
                console.log("Admin: "+userAdmin)
                console.log("user is Found");
                res.status(200).json(user);
            }
            else{
                
            }
        })
        
    } catch (error) {
        console.log(error);
    }
})


app.post('/mealSaveDb', async (req, res) => {
    try {

        const group = await Member.findOne({'groupMembers._id': req.userId});
        const { myMeal, index } = req.body;
        let totalMeal=0;
        const maxMeal = group.groupMembers[0].meal.length;
        console.log("MAx Meal: "+maxMeal);
        group.groupMembers.forEach((member, idx) => {
            let mealLen = member.meal.length;
            console.log("meal Length: "+mealLen);
            let gap = maxMeal-mealLen;
            console.log(gap);
            const newIndex = index-gap;
            if(newIndex>=0){
                member.meal[newIndex].Day = myMeal[idx+1].Day;
            member.meal[newIndex].Night = myMeal[idx+1].Night;
            }
            let tmeal = 0;
            member.meal.forEach(date=>{
                if(date.Day){
                    tmeal++;
                }
                if(date.Night){
                    tmeal++;
                }
            })
            member.tmeal = tmeal;
            totalMeal+=tmeal;
            tmeal = 0;
            
        })
        group.mealSave[index] = 'true';
        group.totalMeal = totalMeal;
        console.log(totalMeal);
        await group.save();
        

        res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
    
})

app.post('/mealSaveStatus', async (req, res) => {
    try {

        const group = await Member.findOne({'groupMembers._id': req.userId});
        const {index} = req.body;
        group.mealSave[index] = 'false';
        
        await group.save();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
    
})


app.post('/mealSaveFlag', async (req, res) => {
    try {

        const group = await Member.findOne({'groupMembers._id': req.userId});
        const { index } = req.body;
        
        group.mealSave[index] = 'false';
        
        await group.save();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
    
})


app.post('/addSpend', async (req, res) => {
    try {
        const group = await Member.findOne({'groupMembers._id': req.userId});
        const {index, amount} = req.body;
        let spendMoney = group.spendMoney;
        if(group) {
            let totalSpend = 0;
            if(spendMoney[index]) {
                let value = parseInt(spendMoney[index]);
                spendMoney[index] = value+parseInt(amount);
            }
            else{
                spendMoney.push(amount);
            }
            group.spendMoney.forEach(value=>{
                totalSpend+=value;
            })
            group.totalSpend = totalSpend;
        await group.save();
        }
        
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }

})

async function mealCal() {
    try {
        const groups = await Member.find();
        groups.forEach(async (group) => {
            const groupMembers = group.groupMembers;
            let tlMeal = 0;
            let tlDepo = 0;
            let tlSpend = 0;
            groupMembers.forEach(member => {
                let mMeal = 0;
                let mDepo = 0;
                member.depositMoney.forEach(slot => {
                    mDepo+=(slot.value);
                })
                member.tdeposit = mDepo;
                tlDepo+=mDepo;
                
                member.meal.forEach(meals => {
                    if(meals.Day === true) {
                        mMeal++;
                    }
                    if(meals.Night === true) {
                        mMeal++;
                    }
                })
                member.tmeal = mMeal;
                tlMeal+=mMeal;
            })
            group.spendMoney.forEach(amount => {
                tlSpend+=parseInt(amount);
            })
            group.totalDeposit = tlDepo;
            group.totalSpend = tlSpend;
            group.totalMeal = tlMeal;
            await group.save();
        })
    
    } catch (error) {
        console.log(error);
    }
}
mealCal();

async function dateUpdate() {
    try {
        const currDate = new Date();
        
        const flagDoc = await Flag.findOne();
        
        const currDay = currDate.getDate();
        

        if(!flagDoc) {
            const newFlagDoc = new Flag({lastdate: currDay});
            await newFlagDoc.save();         
        }
        else{
            const lastRunDay = flagDoc.lastdate;
            if(lastRunDay!==currDay) {
                addMealBox();
                flagDoc.lastdate = currDay;
                await flagDoc.save();
            }
        }
        
    } catch (error) {
        console.log(error);
    }
}



async function addMealBox() {
    const day = new Date().getDate();
    try {
        const groups = await Member.find();
        groups.forEach(async (group) => {
            const mealStarted = group.mealStartDate;
            if(mealStarted.day !== null) {
                group.mealSave.push('null');
                const groupMembers = group.groupMembers;
                groupMembers.forEach(member => {
                const meal = member.meal;

                meal.push({Day: 'false', Night: 'false', day: day});
                })
            }
            
            await group.save();
        })
        
    } catch (error) {
        console.log(error);
    }
}


dateUpdate();

app.post('/adminValue', async (req, res) => {
    try {
        
        const {newName, adminValue} = req.body;
        const group = await Member.findOne({'groupMembers._id': req.userId});
        group.groupMembers.forEach(member => {
            if(member.name === newName) {
                member.Admin = adminValue;
            }
            else{
                console.log("name Not Found");
            }
        })
        await group.save();
        res.status(200);
    } catch (error) {
        console.log(error);
    }
})


const sendMessage= async ()=>{
    try {
        const allGroup = await Member.find();
        allGroup.forEach(group=>{
            console.log(group);
            let mealCharge = group.totalSpend/group.totalMeal;
            group.groupMembers.forEach(member=>{
                let userMealAmount = mealCharge*member.tmeal;
                if(userMealAmount>member.tdeposit){
                    const mailCalculations = {
                        from: 'ali18sabbir@gmail.com', // Replace with your email
                        to: member.email,
                        subject: 'Your Meal Count',
                        text: `Your Total Meal Charge Amount is ${userMealAmount} and you Deposited ${member.tdeposit} Rupee. Please Deposit more than ${userMealAmount-member.tdeposit} as soon as possible
                        Thank you.`
                    };
                
                    transporter.sendMail(mailCalculations, (error, info) => {
                        if (error) {
                            console.error('Error sending message:', error);
                            return res.json({ success: false, message: 'Failed to send OTP. Please try again.' });
                        } 
                    });
                }
            })
        })
    } catch (error) {
        console.log(error);
    }
}
setInterval(sendMessage, 86400000)

app.listen(port, () => {
    console.log(`Server is runing at Port: ${port}`);
})