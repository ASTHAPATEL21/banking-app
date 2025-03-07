// controllers/deposit.js
const { Account, Transaction, Customer } = require('../model/schema');
const { v4: uuidv4 } = require('uuid');

exports.deposit = async (req, res) => {
    const { customerId, amount } = req.body;
    try {
        const customer = await Customer.findOne({ customerId });
        const account = await Account.findOne({ customerId: customer._id });
        if (!account) {
            return res.status(404).send('Account not found');
        }

        // Convert the current balance to a number
        let balanceNumber = parseFloat(account.balance);

        // Add the deposit amount to the balance
        balanceNumber += parseFloat(amount);

        // Convert the updated balance back to a string
        const updatedBalanceString = balanceNumber.toString();

        // Set the updated balance to the account's balance property
        account.balance = updatedBalanceString;

        // Create a new transaction
        const transactionId = uuidv4();
        const transaction = new Transaction({
            transactionId,
            accountId: account._id,
            amount,
            transactionType: 'Deposit'
        });

        // Save the transaction
        await transaction.save();

        // Update the account transactions array
        account.transactions.push(transaction._id);

        // Save the updated account
        await account.save();

        res.status(200).send('Deposit successful');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};
