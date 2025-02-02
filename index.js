const express = require("express");
const { handler } = require("./controller");
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.get("*", async (req, res) => {
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

app.get("btc-price", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price/?ids=bitcoin&vs_currencies=brl,usd,sats"
    );

    return res.json(response.data);
  } catch (error) {
    console.error("Erro ao consultar o preço do Bitcoin:", error);
    return res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});
