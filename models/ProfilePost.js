const mongoose = require("mongoose");


const postschema = new mongoose.Schema({
    uid:{
        type:String,
        require:true
       
    },
    title:{
        type:String,
        require:true
    },
    price:{
        type:String,
        require:true
    },
    rating:{
        type:String,
        require:true
    },
    location:{
        type:String,
        require:true
    },
    isproduct:{
        type:Boolean,
        require:true
    },
    score:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    }

})

module.exports=mongoose.model("ProfilePost",postschema);