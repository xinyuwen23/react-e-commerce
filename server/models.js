const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DB_URL =
  process.env.MONGODB_URI ||
  'mongodb+srv://xinyuwen:G3lAjbeJr06ag1yh@cluster0.wvzvz.mongodb.net/e-commerce?retryWrites=true&w=majority'
// 'mongodb://localhost:27017/e-commerce'

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String },
    password: { type: String, required: true },
    isSeller: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
)

const itemSchema = new Schema(
  {
    seller: { type: Schema.Types.ObjectId, ref: 'user' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    category: { type: String, required: true },
    sold: { type: Number, default: 0 },
    images: [{ type: String }],
  },
  { timestamps: true }
)

const cartSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    items: [
      {
        item: { type: Schema.Types.ObjectId, ref: 'item' },
        title: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
)

const addressSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    region: { type: String, required: true },
  },
  { timestamps: true }
)

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    items: [
      {
        item: { type: Schema.Types.ObjectId, ref: 'item' },
        title: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    address: { type: Schema.Types.ObjectId, ref: 'address' },
    subtotal: { type: Number, required: true },
    shippingCost: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  { timestamps: true }
)

const helpSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    order: { type: Schema.Types.ObjectId, ref: 'order' },
    action: { type: String },
    description: { type: String },
    images: [{ type: String }],
    isSolved: { type: Boolean, default: false },
  },
  { timestamps: true }
)

const User = mongoose.model('user', userSchema)
const Item = mongoose.model('item', itemSchema)
const Cart = mongoose.model('cart', cartSchema)
const Address = mongoose.model('address', addressSchema)
const Order = mongoose.model('order', orderSchema)
const Help = mongoose.model('help', helpSchema)

exports.User = User
exports.Item = Item
exports.Cart = Cart
exports.Address = Address
exports.Order = Order
exports.Help = Help
