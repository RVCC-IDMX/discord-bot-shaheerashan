/* eslint-disable import/no-unresolved */
/* eslint-disable global-require */
import DiscordJS, { Intents } from 'discord.js';
import dotenv from 'dotenv';
import cowsay from './commands/cowsay';

dotenv.config();

// creates client
const client = new DiscordJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('ready', () => {
  console.log('The bot is ready');
  let handler = require('./command-handler.ts');
  if (handler.default) handler = handler.default;
  handler(client);
  // console.log('The bot is ready');
});

// client.on('messageCreate', (message) => {
//  if (message.author.bot) return;
//  let parsedMessage = '';
//  let commands = [];
//  if (!channels.includes(message.channel.id)) return;
//  if (!message.content.startsWith(PREFIX)) return;
//  {
//    const args = message.content
//      .toLowerCase()
//      .substring(PREFIX.length)
//      .slice()
//     .trim()
//      .split(/ /);
//    const commands = args.shift();
//    console.log(commands);
//
//   if (commands === 'ping') {
//      message
//        .react('🐿️')
//        .then(() => console.log(`Reacted to message "${message.content}"`))
//        .catch(console.error);
//      message
//        .reply({
//          content: 'pong',
//        })
//        .then(() => console.log(`Replied to message "${message.content}"`))
//        .catch(console.error);
//    }
//
//   const output = cowsay(args[0]);
//
//    if (commands === 'cowsay') {
//      message
//        .react('🐱')
//        .then(() => console.log(`Reacted to message "${message.content}"`))
//        .catch(console.error);
//      message
//        .reply({
//          content: `
//    \`\`\`
//    ${output}
//    \`\`\`
//      `,
//        })
//        .then(() => console.log(`Replied to message "${message.content}"`))
//        .catch((error) => {
//          if (error.code == 50035) {
//            message
//              .reply(`I did a oopsie...`)
//              .then(() => console.log('Picture too epic'))
//              .catch(console.error);
//          }
//        });
//    }
//  }
// });
// */
client.login(process.env.TOKEN);
