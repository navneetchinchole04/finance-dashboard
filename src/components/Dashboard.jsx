import { useState } from "react";
import SummaryCards from "./SummaryCards";
import ChartSection from "./ChartSection";
import TransactionTable from "./TransactionTable";
import RoleToggle from "./RoleToggle";
import Insights from "./Insights";

function Dashboard() {
  const [role, setRole] = useState("viewer");

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Finance Dashboard</h1>

      <RoleToggle role={role} setRole={setRole} />

      <SummaryCards />
      <ChartSection />
      <TransactionTable role={role} />
      <Insights />
    </div>
  );
}

export default Dashboard;