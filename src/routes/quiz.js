const express = require('express');
const { isAuthenticated, isAuthorized } = require('../middlewares/auth-request-validator');
const QuestionRepository = require('../repositories/question-repository');
const router = express.Router();

const questionRepository = new QuestionRepository();

router.post('/question',isAuthenticated,isAuthorized,async(req,res)=>{
    try {
        const question = await questionRepository.create(req.body);
        return res.status(201).json({
            success: true,
            data: question
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            err: error
        })
    }
    
})
router.get('/question',isAuthenticated, async(req,res)=>{
    try {
        const questions = await questionRepository.getAll();
        return res.status(200).json({
            success: true,
            data: questions
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            err: error
        })
    }
    
})
router.get('/question/:id',isAuthenticated,isAuthorized, async(req,res)=>{
    try {
        const questions = await questionRepository.get(req.params.id);
        return res.status(200).json({
            success: true,
            data: questions
        })
        
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            success: false,
            err: error
        })
    }
    
})

router.patch('/question/:id',isAuthenticated,isAuthorized,async(req,res)=>{
    try {
        const questions = await questionRepository.update(req.params.id,req.body);
        return res.status(200).json({
            success: true,
            data: questions
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            err: error
        })
    }
})

router.delete('/question/:id',isAuthenticated,isAuthorized,async(req,res)=>{
    try {
        const questions = await questionRepository.destroy(req.params.id);
        return res.status(200).json({
            success: true,
            data: questions
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            err: error
        })
    }
})


module.exports = router;