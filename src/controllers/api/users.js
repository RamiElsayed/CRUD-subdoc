const { User, Application } = require("../../models");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).populate("applications");
    return res.json({ success: true, data: users});
    
  } catch (error) {
    console.log(`[ERROR]: Failed to get all users | ${error.message}`);
  }
};

const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ success: false});
    }
    return res.json({ success: true, data: user});
  } catch (error) {
    console.log(`[ERROR]: Failed to get user | ${error.message}`);
  }
};

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    
    return res.json({ success: true, data: user});
  } catch (error) {
    console.log(`[ERROR]: Failed to create user | ${error.message}`);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete(req.params.userId);
    if (!user) {
      return res.status(404).json({ success: false});
    }
    return res.json({ success: true, data: user});
  } catch (error) {
    console.log(`[ERROR]: Failed to delete user | ${error.message}`);
  }
};

module.exports = {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
};
