import { useState } from "react";
import { transactions } from "../data/data";

function TransactionTable({ role }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [data, setData] = useState(transactions);

  const [newTransaction, setNewTransaction] = useState({
    date: "",
    category: "",
    type: "expense",
    amount: ""
  });

  const filteredData = data.filter((t) => {
    const matchesSearch =
      t.category.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ? true : t.type === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-white p-4 rounded-xl shadow mb-6">
      <h2 className="font-bold mb-3">Transactions</h2>

      {/* Search + Filter */}
      <div className="flex gap-3 mb-3">
        <input
          type="text"
          placeholder="Search category..."
          className="border p-2 rounded w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      {/* Admin Form */}
      {role === "admin" && (
        <div className="mb-4 flex gap-3 flex-wrap items-center">
          <input
            type="date"
            className="border p-2 rounded w-36"
            value={newTransaction.date}
            onChange={(e) =>
              setNewTransaction({ ...newTransaction, date: e.target.value })
            }
          />

          <input
            placeholder="Category"
            className="border p-2 rounded w-36"
            value={newTransaction.category}
            onChange={(e) =>
              setNewTransaction({ ...newTransaction, category: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Amount"
            className="border p-2 rounded w-36"
            value={newTransaction.amount}
            onChange={(e) =>
              setNewTransaction({
                ...newTransaction,
                amount: Number(e.target.value)
              })
            }
          />

          <select
            className="border p-2 rounded w-36"
            value={newTransaction.type}
            onChange={(e) =>
              setNewTransaction({ ...newTransaction, type: e.target.value })
            }
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <button
            className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
            onClick={() => {
              if (!newTransaction.date || !newTransaction.category || !newTransaction.amount) {
                alert("Please fill all fields");
                return;
              }

              setData([...data, { ...newTransaction, id: Date.now() }]);

              setNewTransaction({
                date: "",
                category: "",
                type: "expense",
                amount: ""
              });
            }}
          >
            Add
          </button>
        </div>
      )}

      {/* Table */}
      <table className="w-full text-left border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Date</th>
            <th className="p-2">Category</th>
            <th className="p-2">Type</th>
            <th className="p-2">Amount</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.map((t) => (
            <tr key={t.id} className="border-t">
              <td className="p-2">{t.date}</td>
              <td className="p-2">{t.category}</td>
              <td className="p-2">{t.type}</td>
              <td className="p-2">₹{t.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionTable;