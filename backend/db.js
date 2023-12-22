const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const mongoURI = "mongodb+srv://notebook:Nehankit%4012345@ayush.oof0uoz.mongodb.net/mybooks?retryWrites=true&w=majority";
//mongodb://localhost:27017/?readPreference=primary&appName=notebook&directConnection=true&tls=false
// "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
const connectToMongo = ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log('db connected');
    })
    
}
module.exports = connectToMongo;