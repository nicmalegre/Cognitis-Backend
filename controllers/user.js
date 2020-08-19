const user = require('../models/user') 

exports.getAllUsers = async (req, res) => {
    const users = await user.findAll()
    res.send(users)
}


