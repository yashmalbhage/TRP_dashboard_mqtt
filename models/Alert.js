const mongoose = require('mongoose');


const alertsSchema =  new mongoose.Schema({
    ID: { type: Number }, // Event type
  Type: { type: Number }, // Event type
  TS: { type: Number }, // Timestamp of the alert
  Details: { type: mongoose.Schema.Types.Mixed }, 
});

module.exports = mongoose.model('Alerts', alertsSchema);