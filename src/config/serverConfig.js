const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT : process.env.PORT,
    CONNECTION: process.env.CONNECTION,
    JWT_KEY: process.env.JWT_KEY,
}