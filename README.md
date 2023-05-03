# telegram crypto prices bot

EN
_________________________________
run npm i telegraf axios nodemon

then add api keys from telegram "botfather" and cryptocompare 
or service you fetch prices.

run bot with nodemon bot.js     
/start command initialises first message.
bot updates message every 20 sec.

To use bot in multiple groups you should update code
and make it run only one "instance" cause every time other groups will launch their instance with /start command 
it will increase API load. So you should have pre-paid API if you would like different groups make their own prices 
or refactor code so it will run one instance and others "copy" it. There are some multiple variants to reach functionality
you need. So it's just raw variant you may start with.

# бот для телеграм с ценами на крипто
RU
________________________________________
запустите npm i telegraf axios nodemon

затем добавьте ключи API из телеграмм «botfather» и например из cryptocompare (если нужно),
в примере можете закомментить const apikey - он не используется.

Запустите бота из консоли командой nodemon bot.js
Команда /start в тг инициализирует первое сообщение.
бот обновляет сообщение каждые 20 секунд.

Чтобы использовать бота в нескольких группах, вы должны обновить код
и заставить его запускать только один экземпляр, потому что каждый раз, когда другие группы будут запускать свой экземпляр с помощью команды /start
это увеличит нагрузку на API. Поэтому у вас должен быть предоплаченный API, если вы хотите, чтобы разные группы устанавливали свои собственные варианты цена-символ. Можно и без оплаченного API реализовать :) 
Есть несколько вариантов как развить функционал в зависимости от того, что нужно. 
Так что это просто образец с которого можно начать строить полноценного бота. 
