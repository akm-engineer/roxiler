const Product = require("../models/Product");

// API to list all transactions
// API to list all transactions
// API to list all transactions
exports.listTransactions = async (req, res) => {
  try {
    let { page = 1, perPage = 10, search } = req.query;
    page = parseInt(page);
    perPage = parseInt(perPage);
    const query = {};
    if (search && search !== "NaN") {
      query.$or = [
        { title: { $regex: new RegExp(search, "i") } },
        { description: { $regex: new RegExp(search, "i") } },
      ];
      if (!isNaN(parseFloat(search))) {
        // Check if search is a valid number
        query.price = parseFloat(search); // Include price filter only if search is a valid number
      }
    }
    const totalCount = await Product.countDocuments(query); // Get total count of transactions
    const transactions = await Product.find(query)
      .skip((page - 1) * perPage)
      .limit(perPage);
    res.json({ transactions, totalTransactions: totalCount }); // Return transactions and total count
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// API for statistics
exports.statistics = async (req, res) => {
  try {
    const { month } = req.query;
    const totalSaleAmount = await Product.aggregate([
      { $match: { dateOfSale: { $regex: new RegExp(month, "i") } } },
      { $group: { _id: null, total: { $sum: "$price" } } },
    ]);
    const totalSoldItems = await Product.countDocuments({
      sold: true,
      dateOfSale: { $regex: new RegExp(month, "i") },
    });
    const totalNotSoldItems = await Product.countDocuments({
      sold: false,
      dateOfSale: { $regex: new RegExp(month, "i") },
    });
    res.json({
      totalSaleAmount:
        totalSaleAmount.length > 0 ? totalSaleAmount[0].total : 0,
      totalSoldItems,
      totalNotSoldItems,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// API for bar chart

// exports.barChart = async (req, res) => {
//   try {
//     const { month } = req.query;

//     // Parse the month parameter to get the start and end dates
//     const startDate = new Date(month);
//     startDate.setDate(1); // Set to the first day of the month
//     const endDate = new Date(startDate);
//     endDate.setMonth(startDate.getMonth() + 1); // Set to the first day of the next month

//     const priceRanges = [
//       {
//         range: "0 - 100",
//         count: await Product.countDocuments({
//           price: { $lte: 100 },
//           dateOfSale: { $gte: startDate, $lt: endDate },
//         }),
//       },
//       {
//         range: "101 - 200",
//         count: await Product.countDocuments({
//           price: { $gte: 101, $lte: 200 },
//           dateOfSale: { $gte: startDate, $lt: endDate },
//         }),
//       },
//       {
//         range: "201 - 300",
//         count: await Product.countDocuments({
//           price: { $gte: 201, $lte: 300 },
//           dateOfSale: { $gte: startDate, $lt: endDate },
//         }),
//       },
//       {
//         range: "301 - 400",
//         count: await Product.countDocuments({
//           price: { $gte: 301, $lte: 400 },
//           dateOfSale: { $gte: startDate, $lt: endDate },
//         }),
//       },
//       {
//         range: "401 - 500",
//         count: await Product.countDocuments({
//           price: { $gte: 401, $lte: 500 },
//           dateOfSale: { $gte: startDate, $lt: endDate },
//         }),
//       },
//       {
//         range: "501 - 600",
//         count: await Product.countDocuments({
//           price: { $gte: 501, $lte: 600 },
//           dateOfSale: { $gte: startDate, $lt: endDate },
//         }),
//       },
//       {
//         range: "601 - 700",
//         count: await Product.countDocuments({
//           price: { $gte: 601, $lte: 700 },
//           dateOfSale: { $gte: startDate, $lt: endDate },
//         }),
//       },
//       {
//         range: "701 - 800",
//         count: await Product.countDocuments({
//           price: { $gte: 701, $lte: 800 },
//           dateOfSale: { $gte: startDate, $lt: endDate },
//         }),
//       },
//       {
//         range: "801 - 900",
//         count: await Product.countDocuments({
//           price: { $gte: 801, $lte: 900 },
//           dateOfSale: { $gte: startDate, $lt: endDate },
//         }),
//       },
//       // Add more price ranges as needed
//     ];

//     res.json(priceRanges);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// controllers/productController.js

exports.barChart = async (req, res) => {
  try {
    let { month } = req.query;

    // Check if the month parameter is a valid date string
    const date = new Date(month);
    if (isNaN(date.getTime())) {
      // If not a valid date string, set it to the current month
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1; // Month is zero-indexed
      const currentYear = currentDate.getFullYear();
      month = `${currentYear}-${currentMonth}`;
    }

    // Parse the month parameter to get the start and end dates
    const startDate = new Date(month);
    startDate.setDate(1); // Set to the first day of the month
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1); // Set to the first day of the next month

    const priceRanges = [
      {
        range: "0 - 100",
        count: await Product.countDocuments({
          price: { $lte: 100 },
          dateOfSale: { $gte: startDate, $lt: endDate },
        }),
      },
      {
        range: "101 - 200",
        count: await Product.countDocuments({
          price: { $gte: 101, $lte: 200 },
          dateOfSale: { $gte: startDate, $lt: endDate },
        }),
      },
      // Add other price ranges here
    ];

    res.json(priceRanges);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// API for pie chart
exports.pieChart = async (req, res) => {
  try {
    const { month } = req.query;
    const categories = await Product.aggregate([
      { $match: { dateOfSale: { $regex: new RegExp(month, "i") } } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);
    const formattedCategories = categories.map((category) => ({
      [category._id]: category.count,
    }));
    res.json(formattedCategories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Combined API
exports.combinedAPI = async (req, res) => {
  try {
    const transactions = await exports.listTransactions(req, res);
    const stats = await exports.statistics(req, res);
    const barChartData = await exports.barChart(req, res);
    const pieChartData = await exports.pieChart(req, res);
    res.json({ transactions, stats, barChartData, pieChartData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
