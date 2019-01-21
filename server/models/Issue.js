// MongoDB data model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IssueSchema = new Schema({
    title: {
        type: String
    },
    responsible: {
        type: String
    },
    description: {
        type: String
    },
    severity: {
        type: String
    },
    status: {
        type: String,
        default: 'Open'
    }
});

const Issue = module.exports = mongoose.model('Issue', IssueSchema);