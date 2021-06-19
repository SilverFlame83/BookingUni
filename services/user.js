const User = require('../models/User');

async function createUser(username, hashedPassword) {
    //TODO adapt properties to project requirments
    const user = new User({
        username,
        hashedPassword
    });

    user.save();
    return user;
}

async function getUserByUsername(username) {
    const pattern = new RegExp(`^${username}$`, 'i');
    const user = await User.findOne({ username: { $regex: pattern } });
    return user;
}


//TODO add function for finding user by other properties, as specified in the requirments

module.exports = {
    createUser,
    getUserByUsername
}