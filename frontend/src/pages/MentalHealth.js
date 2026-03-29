import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid
} from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";

function MentalHealth() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/mental-health")
      .then((res) => {

        const formatted = res.data.map(item => ({
          country: item["country"],
          score: Number(item["score"])
        }));

        const top10 = formatted
          .sort((a, b) => b.score - a.score)
          .slice(0, 10);

        setData(top10);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Mental Health Dashboard</h2>

      {/* ✅ Explanation */}
      <p style={{ maxWidth: "700px" }}>
        This chart shows the <b>Top 10 happiest countries</b> based on their happiness score.
        A higher score indicates better overall well-being, including factors like income,
        social support, and life satisfaction.
      </p>

      <p style={{ color: "gray" }}>
        Insight: Countries with higher scores generally have better living conditions and support systems.
      </p>

      <BarChart width={700} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="country" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="score" fill="#28a745" />
      </BarChart>
    </div>
  );
}

export default MentalHealth;