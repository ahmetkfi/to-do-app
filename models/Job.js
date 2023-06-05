const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const JobSchema=new Schema({
    job_title:{
        type:String,
        required: true,
    },
    job_description:{
        type:String,
        required: true,
    },
    job_priority:{
        type:Number,
        required: true,
    }
});

const Job=mongoose.model("Job",JobSchema);

module.exports=Job;