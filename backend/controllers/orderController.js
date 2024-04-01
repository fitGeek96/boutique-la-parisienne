import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// @desc    Crete New Order
// @route   POST  /api/orders
// @access  Private

const addOrderItems = expressAsyncHandler(async (req, res) => {
  res.send("Add Order Items");
});

// @desc    Get Logged In User's Orders
// @route   GET  /api/orders/myorders
// @access  Private

const getMyOrders = expressAsyncHandler(async (req, res) => {
  res.send("Get My Orders");
});

// @desc    Get Order By Id
// @route   GET  /api/orders/:id
// @access  Private/Admin

const getOrderById = expressAsyncHandler(async (req, res) => {
  res.send("Get Order By Id");
});

// @desc    Update Order to Paid
// @route   PUT  /api/orders/:id/pay
// @access  Private

const updateOrderToPaid = expressAsyncHandler(async (req, res) => {
  res.send("update order to paid");
});

// @desc    Update Order to Delivered
// @route   PUT  /api/orders/:id/deliver
// @access  Private/Admin

const updateOrderToDelivered = expressAsyncHandler(async (req, res) => {
  res.send("Update Order to Delivered");
});

// @desc    Get All Orders
// @route   GET  /api/orders
// @access  Private/Admin

const getOrders = expressAsyncHandler(async (req, res) => {
  res.send("Gel All Orders");
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
