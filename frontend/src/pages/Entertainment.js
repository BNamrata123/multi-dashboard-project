import {
  PieChart, Pie, Tooltip,
  LineChart, Line, XAxis, YAxis, CartesianGrid
} from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";

function Entertainment() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/entertainment")
      .then((res) => {

        const formatted = res.data.map(item => ({
          genre: item["genre"],
          year: item["year"]
        }));

        setData(formatted);
      })
      .catch((err) => console.error(err));
  }, []);

  // 🎯 Genre count
  const genreCount = Object.values(
    data.reduce((acc, item) => {
      if (!item.genre) return acc;

      acc[item.genre] = acc[item.genre] || { genre: item.genre, count: 0 };
      acc[item.genre].count += 1;

      return acc;
    }, {})
  );

  // 🎯 Year count
  const yearCount = Object.values(
    data.reduce((acc, item) => {
      if (!item.year) return acc;

      acc[item.year] = acc[item.year] || { year: item.year, count: 0 };
      acc[item.year].count += 1;

      return acc;
    }, {})
  );

  const COLORS = ["#007bff", "#28a745", "#ffc107", "#dc3545", "#6f42c1"];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Entertainment Dashboard</h2>

      {/* ✅ Explanation */}
      <p style={{ maxWidth: "700px" }}>
        This dashboard shows insights into entertainment data, including how different genres
        are distributed and how content releases have changed over time.
      </p>

      <p style={{ color: "gray" }}>
        Insight: Some genres are more popular than others, and content production trends
        can be observed across years.
      </p>

      {/* 🎯 PIE CHART */}
      <h3>Genre Distribution</h3>
      <PieChart width={400} height={300}>
        <Pie data={genreCount} dataKey="count" nameKey="genre" outerRadius={100}>
          {genreCount.map((_, i) => (
            <cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>

      {/* 🎯 LINE CHART */}
      <h3>Releases by Year</h3>
      <LineChart width={600} height={300} data={yearCount}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="count" stroke="#007bff" />
      </LineChart>
    </div>
  );
}

export default Entertainment;