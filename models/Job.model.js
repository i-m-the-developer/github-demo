const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const JobSchema = new Schema({
    username:{
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    title:{
        type:String
    },
    company:{
        type:String
    },
    location:{
        type:String
    },
    description:{
        type:String
    },
    job_type:{
        type:String
    },
    created_date:{
        type:Date,
        default:Date.now()
    }
});

module.exports = Item = mongoose.model("Job", JobSchema);