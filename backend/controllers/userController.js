import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// @desc    Auth User & get token
// @route   POST /api/users/login
// @access  Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      // token: user.getSignedJwtToken(),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password!");
  }
});
// @desc    Auth User & get token
// @route   POST /api/users
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
  res.send("Register User");
});

// @desc    Logout User / Clear Cookie
// @route   GET /api/users/logout
// @access  Private

const logoutUser = asyncHandler(async (req, res) => {
  res.send("Logout User");
});

// @desc    Get User Profile
// @route   GET /api/users/profile
// @access  Private

const getUserProfile = asyncHandler(async (req, res) => {
  res.send("Get User Profile");
});

// @desc    Update User Profile
// @route   GET /api/users/profile
// @access  Private

const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("Update User Profile");
});

// @desc    Get Users
// @route   GET /api/users
// @access  Private / Admin

const getUsers = asyncHandler(async (req, res) => {
  res.send("Get Users");
});

// @desc    Get User By Id
// @route   GET /api/users/:id
// @access  Private / Admin

const getUserById = asyncHandler(async (req, res) => {
  res.send("Get User By Id");
});

// @desc    Delete users
// @route   DELETE /api/users/:id
// @access  Private/admin

const deleteUser = asyncHandler(async (req, res) => {
  res.send("Delete User");
});

// @desc    Update user
// @route   DELETE /api/users/:id
// @access  Private/admin

const updateUser = asyncHandler(async (req, res) => {
  res.send("Update User");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
};
