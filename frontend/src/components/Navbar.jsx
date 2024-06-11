import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-neutral-focus text-white">
      <div className="w-[90%] max-w-5xl mx-auto">
        <div className="flex-1">
          <Link
            className=" text-xl hidden sm:inline-block font-bold hover:text-primary duration-300"
            to="/">
            Roxiler
          </Link>
          <Link className="btn btn-ghost normal-case text-xl sm:hidden" to="/">
            R
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal pe-5 sm:px-1 sm:text-base">
            <li>
              <Link to="/">Transactions</Link>
            </li>
            <li>
              <Link to="/statistics">Statistics</Link>
            </li>
            <li>
              <Link to="/bar-chart">Bar Chart</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
