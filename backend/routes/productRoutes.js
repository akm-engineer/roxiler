const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// API endpoints
router.get("/transactions", productController.listTransactions);
router.get("/statistics", productController.statistics);
router.get("/bar-chart", productController.barChart);
router.get("/pie-chart", productController.pieChart);
router.get("/combined", productController.combinedAPI);

module.exports = router;
