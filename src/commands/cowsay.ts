/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import * as cowsay from 'cowsay';
import { IOptions } from 'cowsay';
import { Message } from 'discord.js';
import getRandomInt from '../utils/random';
import quotes from '../utils/quotes.json';

export default {
  callback: (message: Message, ...args: string[]) => {
    const cow = args[0];
    // create a random number, also can use the length og quotes
    const idx = getRandomInt(0, quotes.length);
    const quoteOBJ = quotes[idx];
    const text = `${quoteOBJ.quote} - ${quoteOBJ.author}`;

    // To insert a random quote, utilize template literals.
    const opts: IOptions = {
      text,
      e: '^^',
      r: true,
    };

    if (cow !== 'any') {
      opts.r = false;
      opts.f = cow;
    }
    let output;
    try {
      output = cowsay.say(opts);
    } catch {
      output = 'Sorry, could not find that cow :(';
    }

    if (output.length > 2000) {
      output = 'Darn cows sleeping';
    }
    console.log(output);
    const reply = output.replace(/```/g, "``'");
    message.reply(`\`\`\`${reply}\`\`\``);
  },
};
