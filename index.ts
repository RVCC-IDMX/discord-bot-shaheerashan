import cowsay from './utils/cowsay';
import DiscordJS, { Intents } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const client = new DiscordJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('ready', () => {
  console.log('The bot is ready');
});

client.on('messageCreate', (message) => {
  if (message.content === 'ping') {
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

  const output = cowsay();

  if (message.content === 'cowsay') {
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
});

client.login(process.env.TOKEN);
