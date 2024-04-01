import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// @desc    Crete New Order
// @route   POST  /api/orders
// @access  Private

const addOrderItems = expressAsyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems: orderItems.map((orderItem) => ({
        ...orderItem,
        product: orderItem._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    });

    const createOrder = await order.save();

    res.status(201).json(createOrder);
  }
});

// @desc    Get Logged In User's Orders
// @route   GET  /api/orders/myorders
// @access  Private

const getMyOrders = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

// @desc    Get Order By Id
// @route   GET  /api/orders/:id
// @access  Private/Admin

const getOrderById = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate({'user', 'name', 'email'});
  
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
});

// @desc    Update Order to Paid
// @route   PUT  /api/orders/:id/pay
// @access  Private

const updateOrderToPaid = expressAsyncHandler(async (req, res) => {});

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
