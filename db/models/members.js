const mongoosse = require('mongoose');
const async = require('hbs/lib/async.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const DB = 'mongodb+srv://tu527350:wCMp5fa8SE4Ul9Ru@cluster0.9ojksya.mongodb.net/Meal_Count?retryWrites=true&w=majority&appName=Cluster0';

mongoosse.connect(DB).then(()=>{
    console.log("connection Successful");
}).catch((error)=>{
    console.log(error);
})

const memberSchema = new mongoosse.Schema({
    groupName: {
        type: String,
        required: true,
        unique: true
    },
    mealStartDate: {
        day: Number,
        month: Number,
        year: Number
    },

    spendMoney: {
        type: [Number]
    },
    totalMeal: Number,
    totalDeposit: Number,
    totalSpend: Number,

    mealSave: [],
    // name: String,
    // password: String,
    // email: {type: String, unique: true},
    // phone: {type: String, unique: true},
    groupMembers: [{
        name: String,
        Admin: Boolean,
        userType: String,
    email:{
    type: String,
    //required: true,
    
    unique: false
    },
    phone: {
    type: String,
    // required: true,
    unique: false
    },
    meal: [{
        Day: Boolean,
        Night: Boolean,
        day: Number,
    }],
    tmeal: Number,
    tdeposit: Number,
    depositMoney: [{
        value: Number,
        depositDate: String
    }],
    password:{
    type: String,
    // required: true
    },
    cpassword:{
    type: String,
    // required: true
    },
    tokens: [{
        token: {
            type: String,
            // required: true
        }
    }]
        
    }],
    
    
    
})


// memberSchema.index({groupName: 1, groupId: 1}, {unique: true});



// memberSchema.pre('save', async function(next){

//     try {
//         if(this.isModified('groupMembers') || this.isNew){
//             const memberIndex = this.groupMembers.findIndex((member) => member.password);
//         console.log("First If Satisfy"+memberIndex);
//             if(memberIndex !== -1){
//                 const hashedPassword = await bcrypt.hash(this.groupMembers[memberIndex].password, 10);
//                 this.groupMembers[memberIndex].password = hashedPassword;
//             }
//             else{
//                 console.log('hashing condition not satisfy');
//             }
//             // for(const member of this.groupMembers){
//             //     if(!member.password) continue;

                
                
//             // }
//             // console.log('bcryptPasswor:'+password);
    
//             // this.password = await bcrypt.hash(this.password, 10);
//             // console.log(this.password);
//             // // this.cpassword = this.password;
//         }
//         else{
//             console.log('Error Is Here')
//         }
//         next();
//     } catch (error) {
//         next(error);
//     }
// });

// memberSchema.methods.generateAuthToken = async function(){
//     try {
//         const token = jwt.sign({_id:this._id}, process.env.Secret_Key);
//         console.log("token1"+token);
//     this.tokens = this.tokens.push({token:token});
//     console.log(token);
//     await this.save();
//     return token;
//     } catch (error) {
//         console.log(error);
//     }
// }

const flagSchema = new mongoosse.Schema({
    lastdate: Number,
});

const Flag = new mongoosse.model('dayTraking', flagSchema);

const Member = new mongoosse.model('GroupsAndMembers', memberSchema);
module.exports = { Member, Flag };