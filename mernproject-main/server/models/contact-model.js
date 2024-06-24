const mongoose= require("mongoose");


const contactSchema=new mongoose.Schema({
    username:{
        type:String,
        require: true,
    },
    email:{

        type:String,
        require:true,
        },
    

    message:{

        type:String,
        required:true,
        },

      
});


const contactform=new mongoose.model("Contact",contactSchema);

module.exports=contactform;