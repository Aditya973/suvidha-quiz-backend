const UserService = require('../services/user-service');

const userService = new UserService();

const signUp = async (req,res) => {
    try {
        const user = await userService.signUp(req.body);
        return res.status(201).json({
            data:user,
            success:true,
            message: 'successfully created the user',
            err:{}
        })
    } catch (error) {
        return res.status(500).json({
            data:{},
            success:false,
            message: 'failed to create user',
            err:error
        })
    }
}

const get = async (req,res) => {
    try {
        const user = await userService.get(req.params.id);
        return res.status(200).json({
            data:user,
            success:true,
            message:'succesfully fetched',
            err : {}
        });
    } 
    catch (error) {
        return res.status(500).json({
            data : {},
            success : false,
            message: 'something went wrong',
            err : error
        });
    }
}
const destroy = async (req,res) => {
    try {
        const response = await userService.destroy(req.params.id);
        return res.status(200).json({
            data:response,
            success:true,
            message: 'succefully deleted the user',
            err:{}
        })
    } catch (error) {
        return res.status(500).json({
            data : {},
            success : false,
            message: 'something went wrong',
            err : error
        });
    }
}
const update = async(req,res) => {
    try {
        const response = await userService.update(req.params.id,req.body);
        return res.status(200).json({
            data:response,
            success:true,
            message: 'succefully deleted the user',
            err:{}
        })
    } catch (error) {
        return res.status(500).json({
            data : {},
            success : false,
            message: 'something went wrong',
            err : error
        });
    }
}
const signIn = async (req,res) => {
    try {
        const response = await userService.signIn(req.body);
        return res.status(200).json({
            data:response,
            success:true,
            message: 'succefully logged in',
            err:{}
        })
    } catch (error) {
        return res.status(500).json({
            data:{},
            success:false,
            message: 'failed to login',
            err:error
        })
    }
}

const isAuthenticated = async (req,res) => {
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            data:response,
            success:true,
            message: 'user is authenticated and token is valid',
            err:{}
        });
    } catch (error) {
        return res.status(401).json({
            data : {},
            success : false,
            message: 'something went wrong',
            err : error
        });
    }
}

const isAdmin = async (req,res) => {
    try {
        const response = await userService.isAdmin(req.body.id);
        return res.status(200).json({
            data:response,
            success : true,
            message : 'successfully fetched whether user is admin or not',
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            data : {},
            success : false,
            message: 'something went wrong',
            err : error
        });
    }
    
}

module.exports = {
    signUp,
    get,
    signIn,
    isAuthenticated,
    isAdmin,
    update,
    destroy,
}