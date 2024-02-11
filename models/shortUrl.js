const mongoose = require('mongoose')


function generateRandomId() {
    let id = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
  
    for (let i = 0; i < 8; i++) {
      id += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  
    return id;
  }



const shortUrlSchema = new mongoose.Schema({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        unique: true ,
        default : generateRandomId()
    },
    totalClicks :{
        type : Number, 
        default : 0,
        required : true
    }


},
{timestamp :true}
);


const URL = mongoose.model('url', shortUrlSchema)

module.exports = URL