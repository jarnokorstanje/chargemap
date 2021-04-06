const router = require('express').Router();
const station = require('./models/station');
const connection = require('./models/connection');
const connectionType = require('./models/connectionType');
const currentType = require('./models/currentType');
const level = require('./models/level');
const boundHelper = require('./helpers/boundHelper');

router.route('/')
  .get(async (req, res) => {
    try {
      let limit = req.query.limit || 10;
      let northEast = req.query.northEast;
      let southWest = req.query.southWest;

      if (northEast && southWest) {
        const area = boundHelper.bounds(
          JSON.parse(northEast),
          JSON.parse(southWest)
        );

        res.send(
          await station
            .find()
            .where('Location')
            .within(area)
            .limit(parseInt(limit))
            .populate({
              path: 'Connections',
              populate: [
                {
                  path: 'ConnectionTypeID',
                },
                {
                  path: 'CurrentTypeID',
                },
                {
                  path: 'LevelID',
                },
              ],
            })
        );
      } else {
        res.send(
          await station
            .find()
            .limit(parseInt(limit))
            .populate({
              path: 'Connections',
              populate: [
                {
                  path: 'ConnectionTypeID',
                },
                {
                  path: 'CurrentTypeID',
                },
                {
                  path: 'LevelID',
                },
              ],
            })
        );
      }
    } catch (e) {
      res.send(`Error fetching stations ${e.message}`);
    }
  })
  .post(async (req, res) => {
    const post = await station.create({
      title: req.body.title,
      town: req.body.town,
      addressline1: req.body.addressline1,
      stateorprovince: req.body.stateorprovince,
      postcode: req.body.postcode
    });
    res.send(`stations post ${post.title} created with id: ${post._id}`);
  });

router.route('/:id').get(async (req, res) => {
  try {
    res.send(
      await station.findById(req.params.id).populate({
        path: 'Connections',
        populate: [
          {
            path: 'ConnectionTypeID',
          },
          {
            path: 'CurrentTypeID',
          },
          {
            path: 'LevelID',
          },
        ],
      })
    );
  } catch (e) {
    res.send(`Error fetching station ${e.message}`);
  }
});

module.exports = router;
