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
  },
  { timestamps: true }
)

const itemSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    category: { type: String, required: true },
    seller: { type: Schema.Types.ObjectId, ref: 'user' },
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
      },
    ],
  },
  { timestamps: true }
)

const User = mongoose.model('user', userSchema)
const Item = mongoose.model('item', itemSchema)
const Cart = mongoose.model('cart', cartSchema)

exports.User = User
exports.Item = Item
exports.Cart = Cart
