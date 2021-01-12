const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'b6ecdb14de0c4794a4a935d2579f4786'
})

const handleApiCall = (req, res) => {
  app.models.initModel({id: Clarifai.FACE_DETECT_MODEL})
    .then(faceDetectModel => faceDetectModel.predict(req.body.input))
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with api'))
}

const handleImage = (db) => (req, res) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0])
  })
  .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
  handleImage,
  handleApiCall
};