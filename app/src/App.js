import "./App.css";
import { Routes, Route } from "react-router-dom";

import Transaction from "./pages/Transaction";
// import TransactionStatistics from "./pages/TransactionStatistics";
// import TransactionsBarChart from "./pages/TransactionsBarChart";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Transaction />} />
        {/* <Route path="/" element={<TransactionStatistics />} /> */}
        {/* <Route path="/" element={<TransactionsBarChart />} /> */}
      </Routes>
    </>
  );
}

export default App;
