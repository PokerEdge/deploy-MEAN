const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;

const Issue = require('./models/Issue');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/issues', { useNewUrlParser: true });

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('\nMongoDB connection established');
});

router.route('/issues').get((req, res) => {
    Issue.find((err, issues) => {
        if(err) console.log(err);
        else res.json(issues);
    });
});

router.route('/issues/:id').get((req, res) => {
    Issue.findById(req.params.id, (err, issues) => {
        if(err) console.log(err);
        else res.json(issues);
    });
});

router.route('/issues/add').post((req,res) => {
    let issue = new Issue(req.body);
    issue.save()
        .then(issue => {
            res.status(200).json({ 'issue': 'Added successfully' })
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

router.route('/issues/update/:id').post((req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
        if(!issue) return next(new Error('Count not load document'));
        else {
            issue.title = req.body.title;
            issue.responsible = req.body.responsible;
            issue.description = req.body.description;
            issue.severity = req.body.severity;
            issue.status = req.body.status;

            issue.save()
                .then(issue => {
                    res.json('Update done.')
                }).catch(err => {
                    res.sendStatus(400).send('Update failed.')
                });
        }
    });
});

router.route('/issues/delete/:id').get((req, res) => {
    Issue.findByIdAndRemove({_id: req.params.id}, (err, issue) => {
        if(err) res.json(err);
        else res.json('Removed successfully');
    });
});

app.use('/', router);

app.listen(port, console.log(`Server running on port ${port}`));