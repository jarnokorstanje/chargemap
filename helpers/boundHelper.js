const bounds = (northEast, southWest) => ({
  type: 'Polygon',
  coordinates: [
    [
      [southWest.lng, southWest.lat],
      [southWest.lng, northEast.lat],
      [northEast.lng, northEast.lat],
      [northEast.lng, southWest.lat],
      [southWest.lng, southWest.lat],
    ],
  ],
});

module.exports = { bounds }