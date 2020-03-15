import React from "react";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Legend
} from "recharts";

import dataRaw from "./data";

const data = dataRaw[0].data.results.map(s => {
  const name = s.url.match(/https:\/\/([a-zA-Z0-9]+).com/)[1];
  const max = s.time.reduce((a, d) => (d.delta > a ? d.delta : a), 0);
  const min = s.time.reduce((a, d) => (d.delta < a ? d.delta : a), 50000);
  const avgSumCount = s.time.reduce(
    (a, d) => ({ sum: a.sum + d.delta, count: a.count + 1 }),
    { sum: 0, count: 0 }
  );
  const avg = avgSumCount.sum / avgSumCount.count;
  return { name, min, max, avg };
});

function App() {
  return (
    <div>
      <h1>Bar Chart</h1>
      <BarChart width={730} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="max" fill="#8884d8" />
        <Bar dataKey="min" fill="#82ca9d" />
        <Bar dataKey="avg" fill="#12cafc" />
      </BarChart>
    </div>
  );
}

export default App;
