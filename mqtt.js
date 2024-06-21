const mqtt = require('mqtt');
const DeviceData = require('./models/DeviceData');
const Alerts = require('./models/Alert');
require('dotenv').config();



const client = mqtt.connect("mqtt://broker.hivemq.com");

client.on('connect', () => {
    console.log('MQTT client connected to HiveMQ Serverless');
    client.subscribe('devices/data');
    client.subscribe('devices/alerts');
});

client.on('message', async (topic, message) => {
    const payload = JSON.parse(message.toString());

    if (topic === 'devices/data') {
        const newData = new DeviceData(payload);
        await newData.save();
    } else if (topic === 'devices/alerts') {
        const newAlert = new Alerts(payload);
        await newAlert.save();
    }
});

client.on('error', (err) => {
    console.error('MQTT Error:', err);
});

module.exports = client;
