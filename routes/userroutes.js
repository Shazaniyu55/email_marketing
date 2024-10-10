const express = require('express');
const router = express.Router();
const 
{
    applyJob

} = require('../controller/send');


// post
router.post('/sendmail', applyJob);

router.get('/sendmail', applyJob);
module.exports = router