import cowsay from './utils/cowsay';
import DiscordJS, { Intents } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

let prefix = process.env.PREFIX;

let client = new DiscordJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('ready', () => {
  console.log('The bot is ready');
});

client.on('messageCreate', (message) => {
  if (message.content.substring(0, 3) === prefix) {
    let input = message.content;
    let command = input.slice(3).trim();
    let args = command.split(' ');
    if (args[1] === 'ping') {
      message
        .react('🐿️')
        .then(() => console.log(`Reacted to message "${message.content}"`))
        .catch(console.error);
      message
        .reply({
          content: 'pong',
        })
        .then(() => console.log(`Replied to message "${message.content}"`))
        .catch(console.error);
    }

    let output = cowsay();

    if (args[1] === 'cowsay') {
      message
        .react('🐱')
        .then(() => console.log(`Reacted to message "${message.content}"`))
        .catch(console.error);
      message
        .reply({
          content: `
    \`\`\`
    ${output}
    \`\`\`
      `,
        })
        .then(() => console.log(`Replied to message "${message.content}"`))
        .catch((error) => {
          if (error.code == 50035) {
            message
              .reply(`I did a oopsie...`)
              .then(() => console.log('Picture too epic'))
              .catch(console.error);
          }
        });
    }
  }
});

client.login(process.env.TOKEN);
