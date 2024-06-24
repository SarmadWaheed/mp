const User = require('../models/user-models');
const Contact = require('../models/contact-model');
const Service = require('../models/services-model');

const getusersdata = async (req, res) => {
  try {
    const user = await User.find({}, { password: 0 });

    if (!user || user.length === 0) {
      return res.status(404).json({ message: "users data not present" });
    }

    res.status(200).json( user );
  } catch (error) {
    next(error);
  }
};

const getcontactdata = async (req, res) => {
  try {
    const contact = await Contact.find();

    if (!contact || contact.length === 0) {
      return res.status(404).json({ message: "contact data not found" });
    }

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

const deleteuserdata = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteuser = await User.deleteOne({ _id: id });

    if (deleteuser) {
      return res.status(200).json({ msg: "user data successfully deleted" });
    }

    res.status(401).json({ msg: "user data not deleted" });
  } catch (error) {
    next(error);
  }
};

const deletecontactdata = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteuser = await Contact.deleteOne({ _id: id });

    if (deleteuser) {
      return res.status(200).json({ msg: "contact data successfully deleted" });
    }

    res.status(401).json({ msg: "contact data not deleted" });
  } catch (error) {
    next(error);
  }
};

const getsingleuserdata = async (req, res) => {
  try {
    const id = req.params.id;
    const singleuser = await User.findOne({ _id: id }, { password: 0 });

    if (singleuser) {
      return res.status(200).json(singleuser);
    }

    res.status(401).json({ msg: "user data not present" });
  } catch (error) {
    next(error);
  }
};


const updatesingleuserdata=async(req,res)=>{
  try {

    const id=req.params.id;
    const updateData=req.body;
     const updateUserData=await User.updateOne({ _id: id }, { $set:updateData});

    if(updateUserData){

      return res.status(200).json(updateUserData);
    }
    res.status(401).json({ msg: "user data not updated" });
    
    
  } catch (error) {
    next(error);
  }



};

module.exports = { getusersdata, getcontactdata, deleteuserdata,deletecontactdata, getsingleuserdata,updatesingleuserdata};
