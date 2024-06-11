import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import TransactionsPage from "./pages/TransactionsPage";
import StatisticsPage from "./pages/StatisticsPage";
import BarChartsPage from "./pages/BarChartsPage";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<TransactionsPage />} />
        <Route path="/p/:pageNumber" element={<TransactionsPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/bar-chart" element={<BarChartsPage />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
