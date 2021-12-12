"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    callback: (message, ...args) => {
        let sum = 1;
        for (const arg of args) {
            sum *= parseInt(arg);
        }
        message.reply(`The product is ${sum}`);
    },
};
