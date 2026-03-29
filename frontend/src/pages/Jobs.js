import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell
} from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";

function Jobs() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/jobs")
      .then((res) => {

        const formatted = res.data.map(item => ({
          title: item["title"],
          salary: Number(item["salary"]),
          experience: item["experience"],
          location: item["location"]
        }));

        setData(formatted);
      })
      .catch((err) => console.error(err));
  }, []);

  const salaryByExp = Object.values(
    data.reduce((acc, item) => {
      if (!acc[item.experience]) {
        acc[item.experience] = { experience: item.experience, salary: 0, count: 0 };
      }
      acc[item.experience].salary += item.salary;
      acc[item.experience].count += 1;
      return acc;
    }, {})
  ).map(item => ({
    experience: item.experience,
    salary: Math.round(item.salary / item.count)
  }));

  const jobsByLocation = Object.values(
    data.reduce((acc, item) => {
      acc[item.location] = acc[item.location] || { location: item.location, count: 0 };
      acc[item.location].count += 1;
      return acc;
    }, {})
  );

  const COLORS = ["#007bff", "#28a745", "#ffc107", "#dc3545"];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Job Market Dashboard</h2>

      {/* ✅ Explanation */}
      <p style={{ maxWidth: "700px" }}>
        This dashboard shows insights about job data, including how salaries vary with experience
        and how jobs are distributed across different locations.
      </p>

      <p style={{ color: "gray" }}>
        Insight: Salary generally increases with experience, and some locations have higher job demand.
      </p>

      <h3>Average Salary by Experience</h3>
      <BarChart width={600} height={300} data={salaryByExp}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="experience" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="salary" fill="#007bff" />
      </BarChart>

      <h3>Jobs by Location</h3>
      <PieChart width={400} height={300}>
        <Pie data={jobsByLocation} dataKey="count" nameKey="location" outerRadius={100}>
          {jobsByLocation.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}

export default Jobs;