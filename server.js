const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get("/api/password", async (req, res) => {
  const {
    length = 12,
    special = "on",
    numbers = "on",
    lower = "on",
    upper = "on",
  } = req.query;

  const url = `https://passwordwolf.com/api/?length=${length}&special=${special}&numbers=${numbers}&upper=${upper}&lower=${lower}&repeat=1`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: err });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
