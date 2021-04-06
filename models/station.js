const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
	Title: String,
	AddressLine1: String,
	Town: String,
	StateOrProvince: String,
	Postcode: String,
	Location: {
		type: {
			type: String,
			enum: ['Point'],
		},
		coordinates: {
			type: [Number],
		},
	},
	Connections: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Connection',
		},
	],
});

module.exports = mongoose.model('Station', stationSchema);