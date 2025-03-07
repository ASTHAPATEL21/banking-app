// controllers/login.js
const {Customer} = require('../model/schema'); // Assuming you have a customer schema
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
    const { customerId, password } = req.body;
    try {
        const customer = await Customer.findOne({ customerId });
        if (!customer) {
            return res.status(401).send('Login failed: User not found');
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, customer.password);
        if (!isMatch) {
            return res.status(401).send('Login failed: Password incorrect');
        }

        res.status(200).send('Login successful');
    } catch (err) {
        console.log(err)
        res.status(500).send('Server error');
    }
};
