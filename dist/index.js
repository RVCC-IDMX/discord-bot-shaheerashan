"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cowsay_1 = (0, tslib_1.__importDefault)(require("./utils/cowsay"));
const discord_js_1 = (0, tslib_1.__importStar)(require("discord.js"));
const dotenv_1 = (0, tslib_1.__importDefault)(require("dotenv"));
dotenv_1.default.config();
const PREFIX = process.env.PREFIX || 'sa#';
const CHANNELS = process.env.CHANNELS || null;
if (!CHANNELS) {
    console.error('CHANNELS is not defined');
    process.exit(1);
}
const channels = CHANNELS.split(',');
console.table(channels);
const client = new discord_js_1.default.Client({
    intents: [discord_js_1.Intents.FLAGS.GUILDS, discord_js_1.Intents.FLAGS.GUILD_MESSAGES],
});
client.on('ready', () => {
    console.log('The bot is ready');
});
client.on('messageCreate', (message) => {
    if (message.author.bot)
        return;
    let parsedMessage = '';
    let commands = [];
    if (!channels.includes(message.channel.id))
        return;
    if (!message.content.startsWith(PREFIX))
        return;
    {
        const args = message.content
            .toLowerCase()
            .substring(PREFIX.length)
            .slice()
            .trim()
            .split(/ /);
        const commands = args.shift();
        console.log(commands);
        if (commands === 'ping') {
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
        const output = (0, cowsay_1.default)(args[0]);
        if (commands === 'cowsay') {
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
