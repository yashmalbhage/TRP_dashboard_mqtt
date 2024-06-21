// dataGenerator.js

const { publishMessage } = require('./mqttClient');
const { faker } = require('@faker-js/faker');

const dominicanRepublicLocations = [
    { lat: 18.4861, lon: -69.9312 },
    { lat: 19.7808, lon: -70.6871 },
    { lat: 18.4274, lon: -68.9728 },
    { lat: 19.0502, lon: -70.1496 },
    { lat: 18.809, lon: -69.811 },
    { lat: 18.7357, lon: -70.1627 },
    { lat: 19.5513, lon: -71.0758 },
    { lat: 19.217, lon: -69.336 },
    { lat: 19.6122, lon: -71.2186 },
    { lat: 18.5885, lon: -68.4053 },
];

let lastDeviceId = 0;
let lastAlertId = 0;

function generateRandomData() {
    lastDeviceId++;

    const randomDominicanRepublicLocation =
        dominicanRepublicLocations[
            Math.floor(Math.random() * dominicanRepublicLocations.length)
        ];

    const dummyData = {
        DEVICE_ID: lastDeviceId,
        LOCATION: {
            ID: lastDeviceId,
            TS: Date.now(),
            Type: 1,
            Cell_Info: {
                lat: randomDominicanRepublicLocation.lat,
                lon: randomDominicanRepublicLocation.lon,
            },
            Installing: faker.datatype.boolean(),
        },
        // Add other data fields as per your structure
    };

    return dummyData;
}

function generateRandomAlertData() {
    lastAlertId++;

    const alertData = {
        ID: lastAlertId,
        TS: Date.now(),
        Type: faker.number.int({ min: 1, max: 5 }), // Example type generation
        Details: {
            alert_message: faker.lorem.sentence(),
            severity: faker.helpers.arrayElement(['low', 'medium', 'high']), // Use helpers.arrayElement
        },
    };

    return alertData;
}

function sendDataToMQTT(topic, dataGenerator) {
    setInterval(() => {
        const data = dataGenerator();
        publishMessage(topic, data);
    }, 5000); // 5 seconds interval
}

// Call functions to send data to MQTT topics
sendDataToMQTT('devices/data', generateRandomData);
sendDataToMQTT('devices/alerts', generateRandomAlertData);
