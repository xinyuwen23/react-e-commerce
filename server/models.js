const mongoose = require('mongoose')

const DB_URL =
  process.env.MONGODB_URI ||
  'mongodb+srv://xinyuwen:G3lAjbeJr06ag1yh@cluster0.wvzvz.mongodb.net/e-commerce?retryWrites=true&w=majority'
// 'mongodb://localhost:27017/e-commerce'

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

const models = {
  user: {
    email: { type: String, require: true, unique: true },
    name: { type: String },
    password: { type: String, require: true },
    isSeller: { type: Boolean, default: false },
  },
}

for (let model in models) {
  mongoose.model(model, new mongoose.Schema(models[model], { timestamps: true }))
}

module.exports = {
  getModel: name => mongoose.model(name),
}
