const { coinGeckoAxiosInstance, telegramAxiosInstance } = require("./axios");

const formatCurrency = (value, locale, currency) =>
  value.toLocaleString(locale, {
    style: "currency",
    currency,
  });

const sendMessage = (messageObj, messageText) => {
  try {
    if (!messageObj.chat || !messageObj.chat.id) {
      console.error("Invalid message object:", messageObj);
      return Promise.reject(new Error("Invalid message object"));
    }
    return telegramAxiosInstance.get("sendMessage", {
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

const handleMessages = async (messageObj) => {
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
          "Olá, bem-vindo ao Cripto-bot, digite /btc para saber o preço do Bitcoin"
        );
      case "help":
        return sendMessage(messageObj, "Digite /start para iniciar");
      case "btc":
        try {
          const response = await coinGeckoAxiosInstance.get("simple/price", {
            ids: "bitcoin",
            vs_currencies:
              "brl,usd,eur,gbp,cad,aud,cny,jpy,ars,mxn,rub,inr,sats",
          });

          const {
            brl,
            usd,
            eur,
            gbp,
            cad,
            aud,
            cny,
            jpy,
            ars,
            mxn,
            rub,
            inr,
            sats,
          } = response.data.bitcoin;

          const priceMessage = `💰 Preço Atual do Bitcoin:\n\n
          🇧🇷 BRL: ${formatCurrency(brl, "pt-BR", "BRL")}
          🇺🇸 USD: ${formatCurrency(usd, "en-US", "USD")}
          🇪🇺 EUR: ${formatCurrency(eur, "de-DE", "EUR")}
          🇬🇧 GBP: ${formatCurrency(gbp, "en-GB", "GBP")}
          🇨🇦 CAD: ${formatCurrency(cad, "en-CA", "CAD")}
          🇦🇺 AUD: ${formatCurrency(aud, "en-AU", "AUD")}
          🇨🇳 CNY: ${formatCurrency(cny, "zh-CN", "CNY")}
          🇯🇵 JPY: ${formatCurrency(jpy, "ja-JP", "JPY")}
          🇦🇷 ARS: ${formatCurrency(ars, "es-AR", "ARS")}
          🇲🇽 MXN: ${formatCurrency(mxn, "es-MX", "MXN")}
          🇷🇺 RUB: ${formatCurrency(rub, "ru-RU", "RUB")}
          🇮🇳 INR: ${formatCurrency(inr, "hi-IN", "INR")}
          🟠 Satoshis: ${sats.toLocaleString()} sats`;

          return sendMessage(messageObj, priceMessage);
        } catch (error) {
          console.error("Erro ao buscar preço do BTC:", error);
          return sendMessage(
            messageObj,
            "⚠️ Erro ao obter o preço do Bitcoin. Tente novamente mais tarde."
          );
        }

      default:
        return sendMessage(messageObj, "Desculpa, não entendo este comando.");
    }
  } else {
    return sendMessage(messageObj, "Desculpa, não entendo este comando.");
  }
};

module.exports = { handleMessages };
