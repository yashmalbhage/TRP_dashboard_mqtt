// mqttClient.js

const mqtt = require('mqtt');
const dotenv = require('dotenv');
dotenv.config();

const MQTT_BROKER_URL = process.env.MQTT_BROKER_URL  // Ensure you have the correct URL here

const client = mqtt.connect(MQTT_BROKER_URL, {
    protocolVersion: 5 // Optional: specify MQTT protocol version if needed
});

client.on('connect', () => {
    console.log('Connected to MQTT broker');
});

client.on('error', (err) => {
    console.error('MQTT Error:', err);
});

function publishMessage(topic, message) {
    client.publish(topic, JSON.stringify(message), { qos: 1 }, (err) => {
        if (err) {
            console.error('Failed to publish message:', err);
        } else {
            console.log(`Message published to topic ${topic}`);
        }
    });
}

module.exports = {
    client,
    publishMessage
};
