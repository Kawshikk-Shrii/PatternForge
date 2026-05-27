import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const colors = ["#38bdf8", "#a78bfa", "#34d399", "#fbbf24", "#fb7185", "#60a5fa"];

export const DifficultyPie = ({ data }) => {
  const rows = Object.entries(data || {}).map(([name, value]) => ({ name, value }));
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie data={rows} dataKey="value" innerRadius={55} outerRadius={85} paddingAngle={4}>
          {rows.map((row, index) => <Cell key={row.name} fill={colors[index % colors.length]} />)}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

const PatternChart = ({ data }) => {
  const rows = Object.entries(data || {}).map(([name, value]) => ({ name, value })).slice(0, 8);
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={rows}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
        <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 11 }} interval={0} angle={-18} textAnchor="end" height={70} />
        <YAxis tick={{ fill: "#94a3b8" }} />
        <Tooltip />
        <Bar dataKey="value" fill="#38bdf8" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PatternChart;

