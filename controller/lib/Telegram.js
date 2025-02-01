const { axiosInstance } = require("./axios");

const sendMessage = (messageObj, messageText) => {
  return axiosInstance.get("sendMessage", {
    chat_id: messageObj.chat.id,
    text: messageText,
  });
};

const handleMessages = (messageObj) => {
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
