import { transactions } from "../data/data";

function SummaryCards() {
  const income = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expenses;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      
      <div className="bg-white p-4 rounded-xl shadow">
        <p>Total Balance</p>
        <h2 className="text-xl font-bold">₹{balance}</h2>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <p>Income</p>
        <h2 className="text-green-500 font-bold">₹{income}</h2>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <p>Expenses</p>
        <h2 className="text-red-500 font-bold">₹{expenses}</h2>
      </div>

    </div>
  );
}

export default SummaryCards;