const mongoose = require("mongoose");

// Branch Schema
const branchSchema = new mongoose.Schema({
  branchId: { type: String, required: true, unique: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
});

// Customer Schema
const customerSchema = new mongoose.Schema({
  customerId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

// Account Schema
const accountSchema = new mongoose.Schema({
  accountId: { type: String, required: true, unique: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  coOwners: [{ type: mongoose.Schema.Types.ObjectId, ref: "Customer" }],
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch" },
  balance: { type: Number, required: true },
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Transaction" }],
});

// Transaction Schema
const transactionSchema = new mongoose.Schema({
  transactionId: { type: String, required: true, unique: true },
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
  amount: { type: Number, required: true },
  transactionType: {
    type: String,
    enum: ["Deposit", "Withdrawal"],
    required: true,
  },
  date: { type: Date, default: Date.now },
});

// Models
const Branch = mongoose.model("Branch", branchSchema);
const Customer = mongoose.model("Customer", customerSchema);
const Account = mongoose.model("Account", accountSchema);
const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = { Customer, Branch, Account, Transaction };
