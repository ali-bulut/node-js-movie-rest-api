const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movieSchema = new Schema({
    name:{type:String, required:true},
    // director:{type:String, required:true},
    // imdbPoint:{type:String, required:true},
    // duration:{type:String, required:true},
    // publishedDate:{type:String, required:true},
    // description:{type:String, required:true},
    downloadUrl:{type:String, required:true},
    imageUrl:{type:String, required:true},
    creator:{type:mongoose.Types.ObjectId, required:true, ref:'Admin'}
})

module.exports=mongoose.model('Movie', movieSchema);