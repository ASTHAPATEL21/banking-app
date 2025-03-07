// controllers/viewTransactions.js
const { Transaction, Customer, Account } = require('../model/schema'); // Update this import based on your actual schema

exports.viewTransactions = async (req, res) => {
    const { customerId } = req.body;
    try {
        console.log("transcations")
        const customer = await Customer.findOne({ customerId });
        const account = await Account.findOne({ customerId: customer._id });
        console.log(account)
        // Find transactions associated with the customer's account
        const transactions = await Transaction.find({ accountId: account._id }).sort({ date: -1 });
        console.log(transactions)
        res.status(200).json(transactions);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};
