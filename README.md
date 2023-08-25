# grammYUser

User management database middleware plugin for [grammY](https://github.com/grammyjs/grammy) framework!

### Features

Middleware for grammY which lets you implement management of users using a database.

Supports a global blacklist feature through column 'isBlacklisted' (0 or 1) in the database.

Supports 'lastSeen' feature for users interacting with bots, along with a 'firstSeen' column storing dates pertaining to the first time a user messaged the bot to the last or recent time.

Stores user records such as Telegram user ID, username, firstName and lastName for user management.

### Usage

1. grammYUser depends on the mysql2 package.
```node
npm i mysql2
```
In working directory of your bot project.

2. Copy the plugin code from ```user.js``` and paste it in your Telegram bot code.

3. Run ```npm start``` to create or initiliaze the databalse.


### License

MIT ©️ Zubin