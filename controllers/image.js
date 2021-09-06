const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'ba04a06ec8544483b6d436ca99a3beb6'
});

const handleAPICall = (req, res) => {
    app.models
        .predict("f76196b43bbd45c99b4f3cd8e8b40a8a", req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with API'));
};

const handleImage = (db) => (req, res) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .returning('entries')
    .increment('entries', 1)
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'));
};

module.exports = {
    handleImage: handleImage,
    handleAPICall: handleAPICall
}