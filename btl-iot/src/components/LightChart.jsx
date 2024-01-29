import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import useWebSocket, { ReadyState } from "react-use-websocket";

function LightChart() {
  const [socketUrl, setSocketUrl] = useState(
    "wss://binht1-iot-smarthome-be.onrender.com"
  );
  const [dataChart, setDataChart] = useState([]);
  const [messageHistory, setMessageHistory] = useState([]);
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
      console.log(lastMessage.data);

      const tmpData = JSON.parse(lastMessage.data);
      let { test, ...tmpData1 } = tmpData;

      let now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      let seconds = now.getSeconds();
      let timeNow = `${hours}:${minutes}:${seconds}`;

      const tmp = { name: timeNow, ...tmpData1 };

      if (dataChart.length >= 10) {
        dataChart.shift();
      }
      setDataChart([...dataChart, tmp]);
    }
  }, [lastMessage, setMessageHistory]);

  useEffect(() => {
    if (readyState === -1) {
    }
    if (readyState === 0) {
    }
    if (readyState === 1) {
      sendMessage('{"test":"hello"}');
    }
    if (readyState === 2) {
    }
    if (readyState === 3) {
    }
  }, [readyState]);

  return (
    <LineChart width={900} height={400} data={dataChart} margin={{ top: 60 }}>
      <Line
        type="monotone"
        dataKey="lightIntensity"
        stroke="#FF0000"
        strokeWidth={2}
        legendType="line"
        dot={false}
        isAnimationActive={false}
      />

      <CartesianGrid stroke="#ccc" strokeDasharray="2 5" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend
        width={200}
        wrapperStyle={{
          top: 0,
          right: 0,
          backgroundColor: "#f5f5f5",
          border: "1px solid #d5d5d5",
          borderRadius: 3,
          lineHeight: "40px",
        }}
      />
    </LineChart>
  );
}

export default LightChart;
