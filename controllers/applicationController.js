// controllers/applicationController.js

const Application = require('../models/Application');

const createApplication = async (req, res) => {
    try {
        const { name, address, phone } = req.body;
        const newApplication = new Application({ name, address, phone });
        const savedApplication = await newApplication.save();
        res.status(201).json(savedApplication);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getApplications = async (req, res) => {
    try {
        const applications = await Application.find();
        res.status(200).json(applications);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const updateApplication = async (req, res) => {
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
};

const deleteApplication = async (req, res) => {
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
};

module.exports = {
    createApplication,
    getApplications,
    updateApplication,
    deleteApplication
};

