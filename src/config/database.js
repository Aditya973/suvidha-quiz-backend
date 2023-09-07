const mongoose = require('mongoose');
const {CONNECTION} = require('./serverConfig');

const connect = async () => {
    await mongoose.connect(CONNECTION);
}

module.exports = connect;