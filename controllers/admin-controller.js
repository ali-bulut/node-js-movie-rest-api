const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../models/admin-model");

const getAdmins = async (req, res, next) => {
  let admins;
  try {
    admins = await Admin.find();
  } catch (err) {
    return next(new Error("Fetching admins failed!"));
  }

  if (!admins) {
    return next(new Error("Could not find any admins!"));
  }

  res.json({
    admins: admins.map((admin) => admin.toObject({ getters: true })),
  });
};

const signUpAdmin = async (req, res, next) => {
  const { fullname, email, password, image } = req.body;

  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email: email });
  } catch (err) {
    const error = new Error("Creating admin failed, please try again later!");
    return next(error);
  }

  if (existingAdmin) {
    const error = new Error("Admin already exists, please login instead!");
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(new Error("Could not create admin, please try again later!"));
  }

  const createdAdmin = new Admin({
    fullname,
    email,
    password: hashedPassword,
    image
    // image: req.file.path
  });

  try {
    await createdAdmin.save();
  } catch (err) {
    return next(new Error("Creating admin failed!"));
  }

  let token;
  try {
    token = jwt.sign(
      { adminId: createdAdmin.id, email: createdAdmin.email },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new Error("Creating token failed, please try again!");
    return next(error);
  }

  res
    .status(201)
    .json({ adminId: createdAdmin.id, email: createdAdmin.email, token });
};

const loginAdmin = async (req, res, next) => {
  const { email, password } = req.body;

  let identifiedAdmin;
  try {
    identifiedAdmin = await Admin.findOne({ email: email });
  } catch (err) {
    const error = new Error("Logging in failed, please try again later!");
    return next(error);
  }

  if (!identifiedAdmin) {
    return next(
      new Error("Could not identify user, credentials seem to be wrong.")
    );
  }

  let isValidPassword;
  try {
    isValidPassword = await bcrypt.compare(password, identifiedAdmin.password);
  } catch (err) {
    return next(
      new Error(
        "Logging in failed, please check your credentials and try again!"
      )
    );
  }

  if (!isValidPassword) {
    return next(
      new Error("Could not identify user, credentials seem to be wrong.")
    );
  }

  let token;
  try {
    token = jwt.sign(
      { adminId: identifiedAdmin.id, email: identifiedAdmin.email },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new Error("Creating token failed, please try again!");
    return next(error);
  }

  res
    .status(201)
    .json({ adminId: identifiedAdmin.id, email: identifiedAdmin.email, token });
};

const updateAdmin = async (req, res, next) => {
  const { fullname, email, password } = req.body;
  const adminId = req.params.adminId;

  let admin;
  try {
    admin = await Admin.findById(adminId);
  } catch (err) {
    const error = new Error("Something went wrong, could not find an admin!");
    return next(error);
  }

  if (!admin) {
    return next(new Error("Something went wrong, could not find an admin!"));
  }

  if(admin._id.toString() !== req.adminData.adminId){
    return next(new Error('You are not allowed to update this admin!'));
  }

  admin.fullname = fullname;
  admin.email = email;
  admin.password = password;

  try {
    await admin.save();
  } catch (err) {
    const error = new Error("Updating admin failed, please try again!");
    return next(error);
  }

  res.status(200).json({ admin: admin.toObject({ getters: true }) });
};

const deleteAdmin = async (req, res, next) => {
  const adminId = req.params.adminId;

  let admin;
  try {
    admin = await Admin.findById(adminId);
  } catch (err) {
    const error = new Error("Something went wrong, could not find an admin!");
    return next(error);
  }

  if (!admin) {
    return next(new Error("Something went wrong, could not find an admin!"));
  }

  if(admin._id.toString() !== req.adminData.adminId){
    return next(new Error('You are not allowed to delete this admin!'));
  }

  try {
    await admin.remove();
  } catch (err) {
    const error = new Error("Deleting admin failed, please try again!");
    return next(error);
  }

  res.json({ message: "The Admin has been deleted!" });
};


exports.getAdmins = getAdmins;
exports.signUpAdmin = signUpAdmin;
exports.loginAdmin = loginAdmin;
exports.updateAdmin = updateAdmin;
exports.deleteAdmin = deleteAdmin;