const express = require('express');
const cors = require('cors');
const db = require('./configs/config.db');
const app = express();
const dotenv = require('dotenv');
const http = require('http');

const userRouter = require('./routers/userRouter');
const roomRouter = require('./routers/roomRouter');
const lampRouter = require('./routers/lampRouter');
const windowRouter = require('./routers/windowRouter');

const connectMQTTAndSubcribe = require('./utils/mqtt');
const { bindHttpServer } = require('./utils/websocket');

dotenv.config();

app.use(
  cors({
    origin: '*',
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// kết nối DB
db.connectDb();

// mqtt connect
connectMQTTAndSubcribe('BINH.NB194231_ESP32');

// use middlewire

// router here

app.use(userRouter);
app.use(roomRouter);
app.use(lampRouter);
app.use(windowRouter);

app.use('/', function (req, res, next) {
  res.status(200).json({
    result: 'success',
    message: 'oke oke',
  });
});

// chạy trên local ở cổng 8000
const port = process.env.PORT || 8000;

let httpServer = http.createServer(app);

bindHttpServer(httpServer);

httpServer.listen(port, () => {
  console.log(`Your app listening at http://localhost:${port}`);
});
