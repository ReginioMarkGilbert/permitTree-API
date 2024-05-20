const express = require('express');
const router = express.Router();
const { createApplication, getApplications, updateApplication, deleteApplication } = require('../controllers/applicationController');

router.post('/applications', createApplication);
router.get('/applications', getApplications);
router.put('/applications/:id', updateApplication);
router.delete('/applications/:id', deleteApplication); // Add this line

module.exports = router;

