const Admin = require("../models/admin-model");
const Movie = require("../models/movie-model");

const getAdmins = async (req, res, next) => {
  let admins;
  try {
    admins = await Admin.find();
  } catch (err) {
    return next(new Error("Fetching admins failed!"));
  }

  if(!admins){
    return next(new Error("Could not find any admins!"));
  }

  res.json({admins: admins.map(admin => admin.toObject({getters:true}))});
};

const addAdmin = async (req,res,next) => {
    const {fullname, email, password} = req.body;

    const createdAdmin = new Admin({
        fullname,
        email,
        password
    });
    try {
        await createdAdmin.save();
    } catch (err) {
        return next(new Error('Creating admin failed!'))
    }

    res.status(201).json({admin:createdAdmin});
}

const updateAdmin = async (req,res,next) => {
    const {fullname, email, password} = req.body;
    const adminId = req.params.adminId;

    let admin;
    try {
        admin = await Admin.findById(adminId);
    } catch (err) {
        const error = new Error(
            "Something went wrong, could not find an admin!"
          );
          return next(error);
    }

    if(!admin){
        return next(new Error(
            "Something went wrong, could not find an admin!"));
    }

    admin.fullname=fullname;
    admin.email=email;
    admin.password=password;

    try {
        await admin.save();
    } catch (err) {
        const error = new Error(
            "Updating admin failed, please try again!"
          );
          return next(error);
    }

    res.status(200).json({admin:admin.toObject({getters:true})})
}

const deleteAdmin = async (req,res,next) => {
    const adminId = req.params.adminId;

    let admin;
    try {
        admin = await Admin.findById(adminId);
    } catch (err) {
        const error = new Error(
            "Something went wrong, could not find an admin!"
          );
          return next(error);
    }

    if(!admin){
        return next(new Error(
            "Something went wrong, could not find an admin!"));
    }

    try {
        await admin.remove();
    } catch (err) {
        const error = new Error(
            "Deleting admin failed, please try again!"
          );
          return next(error);
    }

    res.json({message :'The Admin has been deleted!'});
}


exports.getAdmins=getAdmins;
exports.addAdmin=addAdmin;
exports.updateAdmin=updateAdmin;
exports.deleteAdmin = deleteAdmin;