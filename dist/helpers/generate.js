"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomNumber = exports.generateRandomString = void 0;
const generateRandomString = (length) => {
    const char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += char.charAt(Math.floor(Math.random() * char.length));
    }
    return result;
};
exports.generateRandomString = generateRandomString;
const generateRandomNumber = (length) => {
    const char = "0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += char.charAt(Math.floor(Math.random() * char.length));
    }
    return result;
};
exports.generateRandomNumber = generateRandomNumber;
