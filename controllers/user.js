const user = require('../models/user') 

exports.getAllUsers = (req, res) => {
    user.findAll()
    .then(res => {
        res.send(res)   
    })
    .catch(error => {
        res.send({
            error: error
        })
    })
}

