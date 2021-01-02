const mongoose = require('mongoose');

const SaleSchema = mongoose.Schema({
  invoice: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  },
  expireDate: {
    type: Date,
    required: true,
  },
  client: {
    type: String,
    required: true
  },
  items: {
    type: [
      {
        code: {
          type: String,
          required: true
        },
        amount: {
          type: Number,
          required: true
        },
        price: {
          type: Number,
          required: true
        },
        total: {
          type: Number,
          required: true
        },
        profit: {
          type: Number,
          required: true
        },
        profitUSD: {
          type: Number,
          required: true
        }
      }
    ],
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  tax: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  warehouse: {
    type: String,
    required: true
  },
  vendor: {
    type: String,
    required: true
  },
  totalUSD: {
    type: Number,
    required: true
  },
  taxUSD: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('sales', SaleSchema);