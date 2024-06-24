
const mongoose= require("mongoose");
const Messageschema = new mongoose.Schema({
    user: String,
    text: String,
    picture: String,
    createdAt: { type: Date, default: Date.now } 
  });

  const message=new mongoose.model("Message",Messageschema);

module.exports=message;
