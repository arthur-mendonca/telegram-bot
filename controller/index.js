const { handleMessages } = require("./lib/Telegram");

const handler = async (req, res) => {
  const { body } = req;

  if (!body || !body.message) {
    console.log(
      "Recebido evento não relacionado a mensagens:",
      Object.keys(body)
    );
    return res.status(200).send("Evento ignorado");
  }

  try {
    await handleMessages(body.message);
    return res.send("OK");
  } catch (error) {
    console.error("Erro ao processar mensagem:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { handler };
