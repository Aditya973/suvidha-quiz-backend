const User = require('../models/user');
const CrudRepository = require('./crud-repository');
const bcrypt = require('bcrypt')

class UserRepository extends CrudRepository{
    constructor(){
        super(User);
    }
    async create(data) {
        try {
            const encryptedPassword = bcrypt.hashSync(data.password,10);
            const userData = {...data,password:encryptedPassword};
            const user = await User.create(userData);
            return user;
        } catch (error) {
            console.log(error);
            console.log('something went wrong in repo layer')
            throw error;
        }
    }

    async findBy(data){
        try {
            const user = await User.findOne(data);
            console.log(user);
            return user;
        } catch (error) {
            console.log('something went wrong in the repository layer');
            console.log(error);
        }
    }

    async isAdmin(userId){
        try {
            const user = await User.findById(userId);
            const response = user.isAdmin;
            return response;
        } catch (error) {
            console.log('something went wrong in the repository layer');
            console.log(error);
        }
    }

}

module.exports = UserRepository;
