import { LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";
import { transactions } from "../data/data";

function ChartSection() {
  // Line chart data (by date)
  const lineData = transactions.map(t => ({
    date: t.date,
    amount: t.amount
  }));

  // Pie chart data (category)
  const categoryData = Object.values(
    transactions.reduce((acc, curr) => {
      if (!acc[curr.category]) {
        acc[curr.category] = { name: curr.category, value: 0 };
      }
      acc[curr.category].value += curr.amount;
      return acc;
    }, {})
  );

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

      {/* Line Chart */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-bold mb-2">Balance Trend</h2>
        <LineChart width={300} height={200} data={lineData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="amount" stroke="#8884d8" />
        </LineChart>
      </div>

      {/* Pie Chart */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-bold mb-2">Spending Breakdown</h2>
        <PieChart width={300} height={200}>
          <Pie
            data={categoryData}
            cx="50%"
            cy="50%"
            outerRadius={70}
            dataKey="value"
          >
            {categoryData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

    </div>
  );
}

export default ChartSection;