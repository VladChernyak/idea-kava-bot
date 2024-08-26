const TelegramBot = require("node-telegram-bot-api");

const token = "7205301334:AAGAEYiay3EuNh8E77XejyslF9dCLVHVW6w";
const webAppUrl = "https://aesthetic-moonbeam-59a5ad.netlify.app/";

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
      "Доброго дня 👋 \nЗапустіть додаток, щоб обрати пункти відсутні на складі",
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
