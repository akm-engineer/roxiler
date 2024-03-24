const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");

const app = express();

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://ashishgk1999:2FIqqIK2X0tSjmTh@roxilercluster.a1ck0so.mongodb.net/Roxiler?retryWrites=true&w=majority&appName=RoxilerCluster"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Middleware
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
