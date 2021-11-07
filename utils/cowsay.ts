import * as cowsay from 'cowsay';
import { IOptions } from 'cowsay';
import getRandomInt from './random';

export default function () {
  let opts: IOptions = {
    text: 'Good Luck People!',
    r: true,
  };

  let output: string = cowsay.say(opts);

  return output;
}
