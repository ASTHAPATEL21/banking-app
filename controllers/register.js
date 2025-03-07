// controllers/register.js
const {Customer} = require('../model/schema');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    const { name, address, phoneNumber, email, customerId, password } = req.body;
    console.log("Hello")

    try {
        // Check if the user already exists
        let customer = await Customer.findOne({ customerId, email });
        if (customer) {
            return res.status(400).send('User already exists');
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        console.log("here")

        customer = new Customer({
            name,
            address,
            phoneNumber,
            email,
            customerId,
            password: hashedPassword
        });

        await customer.save();
        res.status(201).send('User registered successfully');
    } catch (err) {
        console.log(err)
        res.status(500).send('Server error');
    }
};
