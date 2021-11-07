import * as cowsay from 'cowsay';
import { IOptions } from 'cowsay';
import getRandomInt from './random';
import quotes from './quotes.json';

export default function () {
  // create a random number, also can use the length og quotes
  const random = getRandomInt(0, quotes.length);

  // To insert a random quote, utilize template literals.
  let opts: IOptions = {
    text: `${quotes[random].quote} - ${quotes[random].author}`,
    r: true,
  };

  let output: string = cowsay.say(opts);

  return output;
}
