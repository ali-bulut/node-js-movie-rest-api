const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movieSchema = new Schema({
    name:{type:String, required:true},
    downloadUrl:{type:String, required:true},
    imageUrl:{type:String, required:true},
    // creator:{type:mongoose.Types.ObjectId, required:true, ref:'Admin'}
    creator:{type:String, required:true}
})

module.exports=mongoose.model('Movie', movieSchema);