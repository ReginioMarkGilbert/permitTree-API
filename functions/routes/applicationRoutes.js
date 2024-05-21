const express = require('express');
const Application = require('../models/application');

const router = express.Router();

const sendCORSHeaders = (res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
};

router.post('/createApplication', async (req, res) => {
    sendCORSHeaders(res);
    try {
        const { name, address, phone } = req.body; // Changed req.query to req.body
        const newApplication = new Application({ name, address, phone });
        const savedApplication = await newApplication.save();
        res.status(201).json(savedApplication);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/getApplications', async (req, res) => {
    sendCORSHeaders(res);
    try {
        const applications = await Application.find();
        res.status(200).json(applications);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put('/updateApplication/:id', async (req, res) => { // Changed req.query to req.params
    sendCORSHeaders(res);
    try {
        const { id } = req.params;
        const { name, address, phone } = req.body;
        const updatedApplication = await Application.findByIdAndUpdate(id, { name, address, phone }, { new: true });
        if (!updatedApplication) {
            return res.status(404).json({ error: 'Application not found' });
        }
        res.status(200).json(updatedApplication);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/deleteApplication/:id', async (req, res) => { // Changed req.query to req.params
    sendCORSHeaders(res);
    try {
        const { id } = req.params;
        const deletedApplication = await Application.findByIdAndDelete(id);
        if (!deletedApplication) {
            return res.status(404).json({ error: 'Application not found' });
        }
        res.status(200).json({ message: 'Application deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
