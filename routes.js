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

router.post('/', async (req, res) => {
  const connections = await req.body.Connections;

  try {
    const connectionIds = await Promise.all(
      connections.map(async (con) => {
        const newConnection = new connection(con);
        await newConnection.save();
        return newConnection._id;
      })
    );

    const newStation = await new station({
      ...req.body.Station,
      Connections: connectionIds,
    });

    await station.create(newStation);
    await newStation.save();

    res.send(
      `Created station with id ${newStation._id}`
    );
  } catch (e) {
    res.send(`Error creating station ${e.message}`);
  }
});

router.put('/', async (req, res) => {
  try {
    const { Station, Connections } = req.body;

    const updatedStation = await station.findByIdAndUpdate(
      Station._id,
      Station,
      {
        new: true,
        upsert: true,
      }
    );

    const updatedConnections = await Promise.all(
      Connections.map(async (con) => {
        try {
          const updCon = await connection.findByIdAndUpdate(con._id, con, {
            new: true,
            upsert: true,
          });
          return updCon._id;
        } catch (e) {
          res.send(`Error updating connections ${e.message}`);
        }
      })
    );

    updatedStation.Connections = updatedConnections;

    await updatedStation.save();

    res.send(`Updated station ${updatedStation}`);
  } catch (e) {
    res.send(`Error updating station ${e.message}`);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const del = await station.deleteOne({ _id: req.params.id });
    res.send(`Deleted station`);
  } catch (e) {
    res.send(`Error deleting station ${e.message}`);
  }
});

module.exports = router;
