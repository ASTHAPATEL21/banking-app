// controllers/findBranch.js
const { Branch } = require('../model/schema'); // Update this import based on your actual schema

exports.findBranch = async (req, res) => {
    const { city } = req.body;
    try {
        const branches = await Branch.find({ city });
        console.log("....")
        console.log(branches)
        res.status(200).json(branches);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};
