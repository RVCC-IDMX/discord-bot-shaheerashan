import { Message, MessageEmbed } from 'discord.js';
import cowsay from 'cowsay';
import { IOptions } from 'cowsay';
import getRandomInt from '../utils/random';
import quotes from '../utils/quotes.json';

export default {
  callback: (message: Message, ...args: string[]) => {
    const cow = args[0];
    const idx = getRandomInt(0, quotes.length);
    const quoteOBJ = quotes[idx];
    const text = `${quoteOBJ.quote} - ${quoteOBJ.author}`;

    let opts: IOptions = {
      text,
      e: '^^',
      r: true,
      // f: 'radio',
    };

    if (cow !== 'random') {
      opts.r = false;
      opts.f = cow;
    }
    let output;
    try {
      output = cowsay.say(opts);
    } catch (error) {
      message.reply('Sorry that cow does not exist.');
      return;
    }
    output = output.replace(/\`/g, "'");
    output = `
    \`\`\`
    ${output}
    \`\`\`
    `;
    // Meat of command

    const cowbarnEmbed = new MessageEmbed()
      .setColor('#009EFF')
      .setTitle('Welcome to My Cowbarn!')
      .setURL('https://discord.js.org/')
      .setAuthor('Shaheer Ashan')
      .setDescription(output)
      .addFields(
        { name: 'Moo!', value: 'Hope you are enjoying your day' },
        { name: '\u200B', value: '\u200B' },
        { name: 'Mooooo!', value: 'Check out some cows!!', inline: true }
      )
      .setFooter('Hope you enjoyed your stay here!');

    message.reply({ embeds: [cowbarnEmbed] });
  },
};
