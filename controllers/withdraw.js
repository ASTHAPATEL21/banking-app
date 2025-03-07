// controllers/withdraw.js
const { Account, Transaction, Customer } = require('../model/schema'); // Update this import based on your actual schema
const { v4: uuidv4 } = require('uuid');

exports.withdraw = async (req, res) => {
    const { customerId, amount } = req.body;
    try {
        const customer = await Customer.findOne({ customerId });
        const account = await Account.findOne({ customerId: customer._id });
        if (!account) {
            return res.status(404).send('Account not found');
        }
        // Convert balance from string to number for calculation
        const balance = parseFloat(account.balance);
        // Check if the account has sufficient balance for withdrawal
        if (balance < amount) {
            return res.status(400).send('Insufficient balance');
        }
        // Update the account balance (convert back to string after withdrawal)
        account.balance = (balance - amount).toString();
        // Add a transaction record
        const transactionId = uuidv4();
        const transaction = new Transaction({
            transactionId,
            accountId: account._id,
            amount,
            transactionType: 'Withdrawal'
        });
        await transaction.save();
        // Update the account transactions array
        account.transactions.push(transaction._id);
        await account.save();
        res.status(200).send('Withdrawal successful');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};
