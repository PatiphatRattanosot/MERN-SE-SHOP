require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const FRONTEND_URL = process.env.FRONTEND_URL;

const cors = require("cors");
const corsOption = {
  origin: FRONTEND_URL,
};

app.use(cors(corsOption));
app.use(express.json());

const databaseURL = process.env.DB;
mongoose
  .connect(databaseURL)
  .then(() => console.log("Connected td mongodb"))
  .catch((err) => console.log("Database connection error : " + err));

// Routes
const ProductRoute = require("./routes/product.route");
app.use("/api/product", ProductRoute);

//PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger-output.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.send(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>API for Web Blog</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f4f7fc;
                margin: 0;
                padding: 0;
                color: #333;
              }
              header {
                background-color: #4CAF50;
                color: white;
                text-align: center;
                padding: 20px;
              }
              h1 {
                font-size: 2.5em;
                margin: 0;
              }
              main {
                padding: 20px;
                text-align: center;
              }
              p {
                font-size: 1.2em;
                margin: 10px 0;
              }
              footer {
                background-color: #333;
                color: white;
                text-align: center;
                padding: 10px;
                position: fixed;
                bottom: 0;
                width: 100%;
              }
              a {
                color: #4CAF50;
                text-decoration: none;
              }
              a:hover {
                text-decoration: underline;
              }
            </style>
          </head>
          <body>
            <header>
              <h1>Welcome to the API for SE Shop</h1>
            </header>
            <main>
              <p>This API provides the backend services for a simple Shop application.</p>
              </main>
            <footer>
              <p>&copy; 2025 Web Blog API. Create by Patiphat Rattanosot.</p>
            </footer>
          </body>
          </html>
        `);
});
