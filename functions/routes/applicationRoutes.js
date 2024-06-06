const express = require('express');
const Application = require('../models/application');

const router = express.Router();

// Function to send CORS headers
const sendCORSHeaders = (res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
};

router.post('/createApplication', async (req, res) => {
    sendCORSHeaders(res);
    try {
        const { name, address, phone, brand, model, serialNumber, dateOfAcquisition, powerOutput} = req.body; // Changed req.query to req.body
        const newApplication = new Application({ name, address, phone, brand, model, serialNumber, dateOfAcquisition, powerOutput});
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
        const { name, address, phone, brand, model, serialNumber, dateOfAcquisition, powerOutput } = req.body;
        const updatedApplication = await Application.findByIdAndUpdate(id, { name, address, phone, brand, model, serialNumber, dateOfAcquisition, powerOutput }, { new: true });
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

router.get('/getNotificaions/', async (req, res) => {
    sendCORSHeaders(res);
    try {
        const notifications = await Notification.find();
        res.status(200).json(notifications);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})

router.put('/markNotificationAsRead/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findByIdAndUpdate(id, { read: true }, { new: true });

        if (!notification) {
            return res.status(404).json({ error: 'Notification not found' });
        }

        res.status(200).json(notification);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/getTreeData', async (req, res) => {
    try {
        const { timeFrame } = req.query;
        let match = {};

        if (timeFrame === 'day') {
            match = { date: { $gte: new Date(new Date().setDate(new Date().getDate() - 1)) } };
        } else if (timeFrame === 'week') {
            match = { date: { $gte: new Date(new Date().setDate(new Date().getDate() - 7)) } };
        } else if (timeFrame === 'month') {
            match = { date: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)) } };
        } else if (timeFrame === 'year') {
            match = { date: { $gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)) } };
        }

        const treeData = await TreeData.find(match).sort({ date: 1 });
        res.status(200).json(treeData);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put('/updateTreeData', async (req, res) => {
    try {
        const { date, count } = req.body;
        const updatedTreeData = await TreeData.findOneAndUpdate(
            { date: new Date(date) },
            { count },
            { new: true, upsert: true }
        );
        res.status(200).json(updatedTreeData);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


router.post('/addTreeData', async(req,res) => {
    try {
        const { date, count } = req.body;
        const newTreeData = new TreeData({ date, count });
        await newTreeData.save();
        res.status(201).json(newTreeData);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})

module.exports = router;
