const ProductsModel = require("../model/productsModel");

async function getStatistics(req, res) {
  try {
    const selectedMonth = parseInt(req.query.month);

    const totalSaleAmount = await ProductsModel.aggregate([
      {
        $match: {
          // Without $expr, you wouldn't be able to directly compare the result of the $month operation with selectedMonth within the $match stage.
          $expr: {
            // $eq is comparing the result of { $month: "$dateOfSale" } which extracts the month from the "dateOfSale" field) with selectedMonth.
            $eq: [{ $month: "$dateOfSale" }, selectedMonth],
          },
          sold: true,
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$price" },
        },
      },
    ]);

    const totalSoldItems = await ProductsModel.countDocuments({
      $expr: { $eq: [{ $month: "$dateOfSale" }, selectedMonth] },
      sold: true,
    });

    const totalNotSoldItems = await ProductsModel.countDocuments({
      $expr: { $eq: [{ $month: "$dateOfSale" }, selectedMonth] },
      sold: false,
    });

    res.json({
      totalSaleAmount: totalSaleAmount[0] ? totalSaleAmount[0].totalAmount : 0,
      totalSoldItems,
      totalNotSoldItems,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching statistics" });
  }
}

module.exports = getStatistics;
