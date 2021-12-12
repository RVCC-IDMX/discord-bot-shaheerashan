"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cowsay = (0, tslib_1.__importStar)(require("cowsay"));
const random_1 = (0, tslib_1.__importDefault)(require("./random"));
const quotes_json_1 = (0, tslib_1.__importDefault)(require("./quotes.json"));
function default_1(cow = 'any') {
    const random = (0, random_1.default)(0, quotes_json_1.default.length);
    let opts = {
        text: `${quotes_json_1.default[random].quote} - ${quotes_json_1.default[random].author}`,
        r: true,
    };
    if (cow !== 'any') {
        opts.r = false;
        opts.f = cow;
    }
    let output;
    try {
        output = cowsay.say(opts);
    }
    catch {
        output = 'Sorry, could not find that cow :(';
    }
    console.log(output);
    return output;
}
exports.default = default_1;
