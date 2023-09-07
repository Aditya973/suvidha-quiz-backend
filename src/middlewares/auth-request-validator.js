const UserService = require('../services/user-service');
const userService = new UserService();

const validateSignupAuth = (req,res,next) => {
    if(!req.body.email || !req.body.password || !req.body.name){
        return res.status(400).json({
            data : {},
            success : false,
            message : 'something went wrong',
            err : 'missing email, password or name'
        })
    }
    next();
}

const validateUserAuth = (req,res,next) => {
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            data : {},
            success : false,
            message : 'something went wrong',
            err : 'missing email or password'
        })
    }
    next();
}

const validateIsAdminRequest = (req,res,next) => {
    if(!req.body.id){
        return res.status(400).json({
            data:{},
            success: false,
            err : 'User Id not given',
            message: 'something went wrong'
        })
    }
    next();
}

const isAuthorized = async (req,res,next) => {
    try {
        const token = req.headers['x-access-token'];    
        const response = await userService.isAuthenticated(token);
        const isUserAdmin = await userService.isAdmin(response);
        if(response != req.body.userId && !isUserAdmin){
            throw {message: 'not authorized'}
        }
        next();
    } catch (error) {
        return res.status(403).json({
            data : {},
            success : false,
            message: 'something went wrong, you are not authorized',
            err : error
        });
    }
}

const isAuthenticated = async (req,res,next) => {
    try {
        const token = req.headers['x-access-token'];    
        const response = await userService.isAuthenticated(token);
        // console.log(response);
        if(!response){
            throw {
                message: 'you are not authenticated'
            }
        }
        next();
    } catch (error) {
        return res.status(401).json({
            data : {},
            success : false,
            message: 'something went wrong, you are not authenticated',
            err : error
        });
    }
}
const isAdmin = async (req,res,next) => {
    try {
        const token = req.headers['x-access-token']; 
        const userId = await userService.isAuthenticated(token);
        const isUserAdmin = await userService.isAdmin(userId);
        if(!isUserAdmin){
            throw {
                message: 'you are not authorized'
            }
        }
        next();
    } catch (error) {
        return res.status(500).json({
            data : {},
            success : false,
            message: 'something went wrong, you are not authorized',
            err : error
        });
    }
}

const validCustomerAuth = (req,res,next) => {
    if(req.body.name === ""){
        throw {message: 'name cannot be empty'}
    }
    if(req.body.industry === ""){
        throw {message: 'industry cannot be empty'}
    }
    next();
} 

module.exports = {
    validateUserAuth,
    validateIsAdminRequest,
    validateSignupAuth,
    isAuthenticated,
    isAdmin,
    isAuthorized,
    validCustomerAuth
}