const express = require("express");
const { handler } = require("./controller");
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.get("/", async (req, res) => {
  res.send("Hello World");
});

app.post("*", async (req, res) => {
  try {
    await handler(req, res);
  } catch (error) {
    console.error("Erro no webhook:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});
