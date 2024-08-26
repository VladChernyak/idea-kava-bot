const TelegramBot = require("node-telegram-bot-api");

const token = "7544191999:AAHFB7Zaxt3uJ_rCnsqsaj2aWdm4stiy9mg";
const webAppUrl = "https://main--warm-chebakia-f79754.netlify.app/";

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];

  bot.sendMessage(chatId, resp);
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;

  if (msg.text === "/start") {
    await bot.sendMessage(
      chatId,
      "Вітаємо 👋 \nЩоб дізнатися аклуальні ціні на пунктах прийому запустіть додаток.",
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Відкрити додаток",
                web_app: { url: webAppUrl },
              },
            ],
          ],
        },
      }
    );
  }
});

bot.on("web_app_data", (data) => {
  console.log(data);
});
