const hotel = require('../services/hotel');

module.exports = () => (req,res,next)=>{
    //TODO import and decorate services

    req.storage = {
        ...hotel
    }
    next()
}