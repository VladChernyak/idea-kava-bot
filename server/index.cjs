const TelegramBot = require("node-telegram-bot-api");

const token = "7205301334:AAGAEYiay3EuNh8E77XejyslF9dCLVHVW6w";
const webAppUrl = "https://aesthetic-moonbeam-59a5ad.netlify.app/";

const bot = new TelegramBot(token, { polling: true });

bot.on("web_app_data", (msg) => {
  const userData = msg.web_app_data.data;
  const parsedData = JSON.parse(userData);
  const list = parsedData.map((item) => `✖️ ${item}`);

  bot.sendMessage(
    -4209155045,
    `⚠️ На складі закінчуються:\n\n${list.join("\n")}`
  );
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;

  if (msg.text === "/start") {
    await bot.sendMessage(
      chatId,
      "Доброго дня 👋 \nЗапустіть додаток, щоб обрати пункти відсутні на складі",
      {
        reply_markup: {
          keyboard: [
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
