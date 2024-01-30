const mqtt = require('mqtt');

const { updateData } = require('../controllers/roomController');
const { connections } = require('./websocket');

const options = {};

// const broker = 'mqtt://broker.emqx.io:1883';
const broker = 'mqtt://broker.mqttdashboard.com:1883';

const connectMQTTAndSubcribe = (topic) => {
  try {
    const client = mqtt.connect(broker, options);

    console.log('MQTT connected!');
    client.on('connect', () => {
      client.subscribe(topic);
    });
    client.on('message', (tp, msg) => {
      console.log(msg); // type bytesbuffer

      const msgStr = new Buffer.from(msg).toString('utf8');

      var data = JSON.parse(msgStr);

      console.log('Received MQTT msg: ', data);

      updateData(data);

      connections.forEach((connect) => {
        connect.sendUTF(JSON.stringify(data));
      });
    });
  } catch (err) {
    console.log({
      result: 'fail',
      message: 'connect MQTT fail',
      err: err.message,
    });
  }
};

module.exports = connectMQTTAndSubcribe;
