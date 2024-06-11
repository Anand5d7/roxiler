const ProductModel = require("../model/productsModel");

// @desc    Get  all transactions
// @route   GET /api/transactions
// @access  Public
const listTransactions = async (req, res) => {
  try {
    const page = req.query.p || 0;
    const transactionsPerPage = 10;

    let query = {};

    // Handle month-based search
    if (req.query.month) {
      const numericMonth = parseInt(req.query.month, 10);

      // check if it is a valid number and is b/w 1 & 12.
      if (!isNaN(numericMonth) && numericMonth >= 1 && numericMonth <= 12) {
        // $expr allows you to use $month to extract the month for comparison within the $eq operator.
        query.$expr = {
          // $eq is comparing the result of { $month: "$dateOfSale" } which extracts the month from the "dateOfSale" field) with selectedMonth.
          $eq: [{ $month: "$dateOfSale" }, numericMonth],
        };
      }
    }

    // Handle search based on price/title/description
    if (req.query.q) {
      //  parse the query parameter as a number
      const priceQuery = parseFloat(req.query.q);

      if (!isNaN(priceQuery)) {
        // if valid number
        query.price = priceQuery;
      } else {
        // If it's not a valid number, only perform text-based searches on other fields
        query = {
          // $or will return documents that meet at least one of the conditions. The query returns true if a document matches any of the conditions and false if it doesn't.
          $or: [
            { title: { $regex: req.query.q, $options: "i" } },
            { description: { $regex: req.query.q, $options: "i" } },
          ],
        };
      }
    }

    const totalTransactions = await ProductModel.countDocuments(query);
    const totalPages = Math.ceil(totalTransactions / transactionsPerPage);

    const transactions = await ProductModel.find(query)
      .skip(page * transactionsPerPage)
      .limit(transactionsPerPage);

    res.json({ transactions, page, totalPages });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching transactions" });
  }
};
module.exports = {
  listTransactions,
};
