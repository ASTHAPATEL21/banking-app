// controllers/checkBalance.js
const { Account, Customer } = require('../model/schema');

exports.checkBalance = async (req, res) => {
    console.log("balance check")
    const { customerId } = req.body;
    try {
        const customer = await Customer.findOne({ customerId });
        if (!customer) {
            return res.status(404).send('Customer not found');
        }
        console.log(customer)

        const account = await Account.findOne({ customerId: customer._id });
        if (!account) {
            return res.status(404).send('Account not found');
        }
        res.status(200).json({ balance: account.balance });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};
