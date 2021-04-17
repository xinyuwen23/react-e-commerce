const mongoose = require('mongoose')

const DB_URL =
  process.env.MONGODB_URI ||
  'mongodb+srv://xinyuwen:G3lAjbeJr06ag1yh@cluster0.wvzvz.mongodb.net/e-commerce?retryWrites=true&w=majority'
// 'mongodb://localhost:27017/e-commerce'

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

const models = {
  user: {
    email: { type: String, required: true, unique: true },
    name: { type: String },
    password: { type: String, required: true },
    isSeller: { type: Boolean, default: false },
  },
  item: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: [0, 'Price must be larger or equal to 0'] },
    quantity: { type: Number, required: true, min: [0, 'Quantity must be larger or equal to 0'] },
    category: { type: String, required: true },
  },
  cart: {
    user: { type: Schema.Types.ObjectId, ref: 'user' },
  },
}

for (let model in models) {
  mongoose.model(model, new mongoose.Schema(models[model], { timestamps: true }))
}

module.exports = {
  getModel: name => mongoose.model(name),
}
