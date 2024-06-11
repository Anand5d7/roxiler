import { useEffect, useState } from "react";
import axios from "axios";
import TransactionsList from "../components/TransactionsList";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Error from "../components/Error";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);
  const [totalPages, setTotalPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("3");
  const { pageNumber } = useParams();

  // array of month options
  const monthOptions = [
    { value: "", label: "All" },
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const fetchTransactions = async () => {
    try {
      let url = "/api/transactions";
      if (pageNumber) {
        url += `?p=${pageNumber}`;
      }
      if (searchInput) {
        url += `${pageNumber ? "&" : "?"}q=${searchInput}`;
      }
      if (selectedMonth) {
        url += `${pageNumber || searchInput ? "&" : "?"}month=${selectedMonth}`;
      }
      setError(null);
      setLoading(true);

      const response = await axios.get(url);
      const data = response.data;

      setTransactions(data.transactions);
      setCurrentPage(data.page);
      setTotalPage(data.totalPages);
      setSearchInput("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [pageNumber, selectedMonth]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }

  // if transactions array is empty
  if (transactions.length === 0) {
    return (
      <section className="max-w-5xl mx-auto min-h-screen grid place-items-center">
        <h2 className="text-4xl">No results found.</h2>
      </section>
    );
  }

  return (
    <section>
      <div className="w-[90%]  max-w-5xl mx-auto my-20">
        <div className="flex flex-wrap justify-between pe-20 sm:pe-0 sm:justify-between ">
          {/* search products */}
          <div className="flex flex-wrap gap-4 items-center mb-8 sm:mb-0 sm:w-[40%]">
            <input
              type="text"
              placeholder="Enter Title, Description, or Price"
              className="input input-bordered input-primary w-[65%]"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button
              className="btn btn-primary btn-sm"
              onClick={fetchTransactions}>
              Search
            </button>
          </div>
          {/* select month */}
          <div className="flex gap-2 justify-between sm:w-1/4 items-center flex-wrap">
            <label className=" ">Select a month:</label>
            <select
              value={selectedMonth}
              onChange={handleMonthChange}
              className="select select-primary ">
              {monthOptions.map((option) => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className=" my-20">
          <TransactionsList transactions={transactions} />
        </div>
        {/* pagination */}
        <div className="join">
          {[...Array(totalPages).keys()].map((pages) => (
            <Link key={pages} to={`/p/${pages}`}>
              <button
                className={`join-item btn ${
                  pages == currentPage ? "bg-neutral font-semibold" : ""
                }`}>
                {pages + 1}
              </button>
            </Link>
          ))}
        </div>
        {/* end of pagination */}
      </div>
    </section>
  );
};
export default TransactionsPage;
