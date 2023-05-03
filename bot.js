
const { Telegraf } = require('telegraf');
const axios = require('axios');

const bot = new Telegraf('BOTFATHER_API');
const apikey = 'CRYPTOCOMPARE_API_IF_NEEDED';

// Store the chat ID and message ID in a global variable
let pricesMessageInfo = {};

bot.start((ctx) => {
  const chatId = ctx.chat.id;
  // Store the chat ID in the global variable
  pricesMessageInfo[chatId] = pricesMessageInfo[chatId] || {};
  // Start sending prices to this chat
  sendPrices(chatId);
});

bot.on('left_chat_member', async (ctx) => {
    const chatId = ctx.chat.id;
    const botId = bot.telegram.botInfo.id;
  
    // Check if the bot has been removed from the chat
    if (ctx.message.left_chat_member && ctx.message.left_chat_member.id === botId) {
      console.log(`Bot has been removed from chat ${chatId}`);
      // Take appropriate action, such as removing the chat ID from the pricesMessageInfo object
      delete pricesMessageInfo[chatId];
    }
  });

async function sendPrices(chatId) {
  try {
    let [btc, eth, ton, bolt] = await Promise.all([
      axios.get(`https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD`),
      axios.get(`https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD`),
      axios.get(`https://min-api.cryptocompare.com/data/price?fsym=TON&tsyms=USD`),
      axios.get(`https://min-api.cryptocompare.com/data/price?fsym=BOLT&tsyms=USD`)

    ]);
    let btcPrice = btc.data.USD.toFixed(1);
    let ethPrice = eth.data.USD.toFixed(1);
    let tonPrice = ton.data.USD.toFixed(2);
    let boltPrice = bolt.data.USD.toFixed(4);
    let message =
    `
    📊 BTC: $${btcPrice} ETH: $${ethPrice} TON: $${tonPrice} BOLT: $${boltPrice}
    `;

    let keyboard = {
      inline_keyboard: [
        [
          {
            text: 'Кнопка куда-то',
            url: 'https://www.cryptocompare.com/'
          }
        ]
      ]
    };

    let options = {
      parse_mode: 'Markdown',
      disable_web_page_preview: true,
      reply_markup: keyboard
    };

     // If the chat already has a message, update it instead of sending a new one
     if (pricesMessageInfo[chatId].messageId) {
        try {
          await bot.telegram.editMessageText(chatId, pricesMessageInfo[chatId].messageId, null, message, options);
        } catch (error) {
          // Handle the case where the bot's message has been deleted
          console.log(`Error editing message in chat ${chatId}: ${error.message}`);
          if (error.message.includes('403')) {
            // The bot has been kicked from the chat, so remove the chat ID from the pricesMessageInfo object
            delete pricesMessageInfo[chatId];
            return;
          } else {
            // Another error occurred, so send a new message instead
            let sentMessage = await bot.telegram.sendMessage(chatId, message, options);
            // Store the chat ID and message ID in the global variable
            pricesMessageInfo[chatId].messageId = sentMessage.message_id;
          }
        }
      } else {
        let sentMessage = await bot.telegram.sendMessage(chatId, message, options);
        // Store the chat ID and message ID in the global variable
        pricesMessageInfo[chatId].messageId = sentMessage.message_id;
      }
  
    } catch (err) {
      console.log(err);
      bot.telegram.sendMessage(chatId, "Error");
    }
  
    // Wait for 20 seconds before updating prices again
    await new Promise(resolve => setTimeout(resolve, 20000));
    sendPrices(chatId);
  }

bot.launch().then(() => {
  console.log('Bot started');
}).catch((err) => {
  console.log('Error starting bot', err);
});



