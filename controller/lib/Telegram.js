const { axiosInstance } = require("./axios");

const sendMessage = (messageObj, messageText) => {
  try {
    if (!messageObj.chat || !messageObj.chat.id) {
      console.error("Invalid message object:", messageObj);
      return Promise.reject(new Error("Invalid message object"));
    }
    return axiosInstance.get("sendMessage", {
      chat_id: messageObj.chat.id,
      text: messageText,
    });
  } catch (error) {
    console.error(
      "Erro ao enviar mensagem:",
      error.response?.data || error.message
    );

    if (error.response?.status === 403) {
      console.log("Usuário bloqueou o bot, ignorando...");
      return;
    }
  }
};

const handleMessages = (messageObj) => {
  if (!messageObj || typeof messageObj !== "object" || !messageObj.chat) {
    console.error("Invalid message object:", messageObj);
    return Promise.reject(new Error("Invalid message object"));
  }

  const messageText = messageObj.text || "";

  if (messageText.charAt(0) === "/") {
    const command = messageText.substr(1);
    switch (command) {
      case "start":
        return sendMessage(
          messageObj,
          "Hello, welcome to my bot. How can I help you?"
        );
      case "help":
        return sendMessage(messageObj, "Type /start to start the bot");
      default:
        return sendMessage(messageObj, "I don't understand");
    }
  } else {
    return sendMessage(messageObj, "I don't understand");
  }
};

module.exports = { handleMessages };
