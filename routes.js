const router = require('express').Router();
const station = require('./models/station');

router.route('/')
  .post(async (req, res) => {
    const post = await station.create({
      title: req.body.title,
      town: req.body.town,
      addressline1: req.body.addressline1,
      stateorprovince: req.body.stateorprovince,
      postcode: req.body.postcode
    });
    res.send(`stations post ${post.title} created with id: ${post._id}`);
  })
  .get(async (req, res) => {
    let limit = req.query.limit || 10;
    const stations = await station.find().limit(parseInt(limit));
	  res.send(stations);
  });

router.route('/:id')
  .get(async (req, res) => {
    const stations = await station.findById(req.params.id);
    res.send(stations);
  })

module.exports = router;
