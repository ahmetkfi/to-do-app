const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();
//connect 
exports.conn=function (){
    mongoose.connect(process.env.MONGO_URL,{
        dbName:'to_do_app',
    }).then(()=>{
        console.log(`DB CONNECTION SUCCESSED`);
    }).catch((err)=>{
        console.log(`DB CONNECTION ERROR : ${err}`);
    })
}
