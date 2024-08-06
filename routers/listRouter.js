const express = require('express');
const { createContent, 
    getOneContent,
     getAllContent, 
    updateContent, 
    deleteContent 

} = require('../controllers/listController');
const { authenticate } = require('../middleware/authorization');
const router = express.Router();

router.post('/createcontent', authenticate, createContent);

router.get('/onecontent/:listId', authenticate, getOneContent);

router.get('/allcontent/', authenticate, getAllContent);

router.patch('/updatecontent/:listId', authenticate, updateContent);

router.delete('/deletecontent/:listId', authenticate, deleteContent);

module.exports = router